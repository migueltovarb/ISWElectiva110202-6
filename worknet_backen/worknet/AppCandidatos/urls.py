# AppCandidatos/urls.py
from django.urls import path
from .views import CrearPerfilCandidatoAPIView, MiPerfilCandidatoAPIView  # 👈 importamos la nueva vista

urlpatterns = [
    path('crear-perfil/', CrearPerfilCandidatoAPIView.as_view(), name='crear-perfil-candidato'),
    path('mi-perfil/', MiPerfilCandidatoAPIView.as_view(), name='mi-perfil-candidato'),  # 👈 nueva ruta
]
