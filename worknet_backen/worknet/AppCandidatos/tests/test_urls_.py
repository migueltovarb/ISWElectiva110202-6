from django.urls import reverse, resolve
from django.test import SimpleTestCase
from AppCandidatos.views import CrearPerfilCandidatoAPIView

class CandidatosURLTests(SimpleTestCase):

    def test_crear_perfil_url_resuelve(self):
        url = reverse('crear-perfil-candidato')
        self.assertEqual(resolve(url).func.view_class, CrearPerfilCandidatoAPIView)
