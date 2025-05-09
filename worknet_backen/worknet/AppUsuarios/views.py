from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CandidatoRegistroSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from AppUsuarios.models import Usuario 
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

# Vista de Registro de Candidato
class RegistroCandidatoAPIView(APIView):
    def post(self, request):
        serializer = CandidatoRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Registro exitoso'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para Inicio de Sesión
class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.validated_data["usuario"]
            tipo = "empresa" if hasattr(usuario, "empresa") else "candidato"

            token, _ = Token.objects.get_or_create(user=usuario)

            # Manejo seguro de verificación de perfil
            perfil_creado = False
            try:
                if tipo == "empresa" and hasattr(usuario, "empresa"):
                    perfil_creado = bool(getattr(usuario.empresa, "descripcion", "").strip())
                elif tipo == "candidato" and hasattr(usuario, "candidato"):
                    perfil_creado = bool(getattr(usuario.candidato, "descripcion", "").strip())
            except Exception:
                perfil_creado = False

            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "usuario_id": usuario.id,
                "nombre": usuario.nombre_completo,
                "email": usuario.email,
                "tipo_usuario": tipo,
                "token": token.key,
                "perfil_creado": perfil_creado
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Solicitar recuperación
class SolicitarRecuperacionAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Debes proporcionar un correo electrónico.'}, status=400)

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'error': 'No existe ningún usuario con ese correo.'}, status=404)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(usuario)
        uidb64 = urlsafe_base64_encode(force_bytes(usuario.pk))
        url_reset = f"http://localhost:5173/recuperar/confirmar/{uidb64}/{token}"

        send_mail(
            subject="Recuperación de contraseña",
            message=f"Hola {usuario.email}, haz clic en el siguiente enlace para restablecer tu contraseña:\n\n{url_reset}",
            from_email=None,
            recipient_list=[usuario.email],
        )

        return Response({'mensaje': 'Se ha enviado un correo con las instrucciones para recuperar la contraseña.'}, status=200)

# Confirmación desde enlace
class RestablecerContrasenaAPIView(APIView):
    def post(self, request, uidb64, token):
        nueva_password = request.data.get("password")

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            usuario = Usuario.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            return Response({'error': 'Enlace inválido'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(usuario, token):
            return Response({'error': 'Token inválido o expirado'}, status=status.HTTP_400_BAD_REQUEST)

        usuario.set_password(nueva_password)
        usuario.save()
        return Response({'mensaje': 'Contraseña restablecida correctamente'}, status=status.HTTP_200_OK)

# Confirmar cambio
class ConfirmarRestablecerContrasenaAPIView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            usuario = Usuario.objects.get(pk=uid)
        except Exception:
            return Response({'error': 'Enlace inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(usuario, token):
            return Response({'error': 'Token inválido o expirado.'}, status=status.HTTP_400_BAD_REQUEST)

        nueva = request.data.get("nueva_password")
        usuario.set_password(nueva)
        usuario.save()
        return Response({'mensaje': 'Contraseña actualizada correctamente.'}, status=status.HTTP_200_OK)
