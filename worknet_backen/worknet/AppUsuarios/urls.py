from django.urls import path
from .views import RegistroCandidatoAPIView, LoginAPIView  # 👈 Importamos LoginAPIView
from .views import SolicitarRecuperacionAPIView
from .views import RestablecerContrasenaAPIView
from .views import ConfirmarRestablecerContrasenaAPIView

urlpatterns = [
    path('registro-candidato/', RegistroCandidatoAPIView.as_view(), name='registro-candidato'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('recuperar/', SolicitarRecuperacionAPIView.as_view(), name='solicitar-recuperacion'),
    path('restablecer/<uidb64>/<token>/', RestablecerContrasenaAPIView.as_view(), name='restablecer-contrasena'),
    path('restablecer/confirmar/<uidb64>/<token>/', ConfirmarRestablecerContrasenaAPIView.as_view(), name='confirmar-restablecer'),
]