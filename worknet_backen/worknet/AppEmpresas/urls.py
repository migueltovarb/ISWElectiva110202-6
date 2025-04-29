from django.urls import path
from .views import RegistroEmpresaAPIView,CrearPerfilEmpresaAPIView

urlpatterns = [
    path('registro-empresa/', RegistroEmpresaAPIView.as_view(), name='registro-empresa'),
    path('crear-perfil/', CrearPerfilEmpresaAPIView.as_view(), name='crear-perfil-empresa'),
]
