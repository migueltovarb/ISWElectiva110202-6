from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import EmpresaRegistroSerializer, PerfilEmpresaSerializer
from .models import PerfilEmpresa

class RegistroEmpresaAPIView(APIView):
    def post(self, request):
        serializer = EmpresaRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Empresa registrada exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CrearPerfilEmpresaAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PerfilEmpresaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Perfil creado exitosamente"}, status=status.HTTP_201_CREATED)

        # ✅ Agregado para depurar
        print("\n\n❌ Errores del serializer al crear perfil empresa:", serializer.errors, "\n\n")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MiPerfilEmpresaAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            perfil = PerfilEmpresa.objects.get(usuario=request.user)
            return Response({"mensaje": "Perfil encontrado"}, status=status.HTTP_200_OK)
        except PerfilEmpresa.DoesNotExist:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)
