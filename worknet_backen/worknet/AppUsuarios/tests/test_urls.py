from django.test import SimpleTestCase
from django.urls import reverse, resolve
from AppUsuarios.views import (
    RegistroCandidatoAPIView,
    LoginAPIView,
    SolicitarRecuperacionAPIView,
    RestablecerContrasenaAPIView,
    ConfirmarRestablecerContrasenaAPIView
)

class UsuarioUrlsTest(SimpleTestCase):

    def test_url_registro_candidato_resuelve(self):
        url = reverse('registro-candidato')
        self.assertEqual(resolve(url).func.view_class, RegistroCandidatoAPIView)

    def test_url_login_resuelve(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func.view_class, LoginAPIView)

    def test_url_recuperar_resuelve(self):
        url = reverse('solicitar-recuperacion')
        self.assertEqual(resolve(url).func.view_class, SolicitarRecuperacionAPIView)

    def test_url_restablecer_contrasena_resuelve(self):
        url = reverse('restablecer-contrasena', kwargs={"uidb64": "uid", "token": "token"})
        self.assertEqual(resolve(url).func.view_class, RestablecerContrasenaAPIView)

    def test_url_confirmar_restablecer_resuelve(self):
        url = reverse('confirmar-restablecer', kwargs={"uidb64": "uid", "token": "token"})
        self.assertEqual(resolve(url).func.view_class, ConfirmarRestablecerContrasenaAPIView)
