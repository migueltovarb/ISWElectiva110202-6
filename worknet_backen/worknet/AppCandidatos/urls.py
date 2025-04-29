# AppCandidatos/urls.py
from django.urls import path
from .views import CrearPerfilCandidatoAPIView

urlpatterns = [
    path('crear-perfil/', CrearPerfilCandidatoAPIView.as_view(), name='crear-perfil-candidato'),
]