# AppCandidatos/views.py
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import PerfilCandidatoSerializer
from rest_framework.response import Response
from .models import PerfilCandidato  # 👈 Import necesario para verificar existencia

class CrearPerfilCandidatoAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['usuario'] = request.user.id
        serializer = PerfilCandidatoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Perfil de candidato creado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Nueva vista para verificar si el candidato ya tiene perfil
class MiPerfilCandidatoAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            perfil = PerfilCandidato.objects.get(usuario=request.user)
            return Response({'mensaje': 'Perfil de candidato encontrado'}, status=200)
        except PerfilCandidato.DoesNotExist:
            return Response({'error': 'Perfil no encontrado'}, status=404)
