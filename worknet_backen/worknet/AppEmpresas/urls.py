from django.urls import path
from .views import (
    RegistroEmpresaAPIView,
    CrearPerfilEmpresaAPIView,
    MiPerfilEmpresaAPIView  # 👈 importamos la nueva vista
)

urlpatterns = [
    path('registro-empresa/', RegistroEmpresaAPIView.as_view(), name='registro-empresa'),
    path('crear-perfil/', CrearPerfilEmpresaAPIView.as_view(), name='crear-perfil-empresa'),
    path('mi-perfil/', MiPerfilEmpresaAPIView.as_view(), name='mi-perfil-empresa'),  # ✅ nueva ruta
]
