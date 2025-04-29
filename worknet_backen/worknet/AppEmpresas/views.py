from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmpresaRegistroSerializer ,PerfilEmpresaSerializer

class RegistroEmpresaAPIView(APIView):
    def post(self, request):
        serializer = EmpresaRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Empresa registrada exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# vista perfilempresa
class CrearPerfilEmpresaAPIView(APIView):
    def post(self, request):
        serializer = PerfilEmpresaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Perfil creado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)