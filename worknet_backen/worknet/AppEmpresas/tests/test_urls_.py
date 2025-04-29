from django.urls import reverse, resolve
from django.test import SimpleTestCase
from AppEmpresas.views import RegistroEmpresaAPIView, CrearPerfilEmpresaAPIView

class TestUrlsEmpresas(SimpleTestCase):

    def test_url_registro_empresa_resuelve(self):
        url = reverse('registro-empresa')
        self.assertEqual(resolve(url).func.view_class, RegistroEmpresaAPIView)

    def test_url_crear_perfil_empresa_resuelve(self):
        url = reverse('crear-perfil-empresa')
        self.assertEqual(resolve(url).func.view_class, CrearPerfilEmpresaAPIView)
