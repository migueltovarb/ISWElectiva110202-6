from rest_framework.test import APITestCase
from AppEmpresas.models import Empresa, PerfilEmpresa
from AppUsuarios.models import Usuario

class EmpresaModelTest(APITestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create_user(
            email="empresa@correo.com",
            password="clave12345",
            nombre_completo="Empresa Uno",
            ubicacion="Bogotá"
        )

    def test_creacion_empresa(self):
        empresa = Empresa.objects.create(
            usuario=self.usuario,
            razon_social="Tech S.A.S",
            sector="Tecnología",
            ubicacion="Medellín"
        )
        self.assertEqual(str(empresa), "Tech S.A.S")
        self.assertEqual(empresa.usuario.email, "empresa@correo.com")

    def test_creacion_perfil_empresa(self):
        perfil = PerfilEmpresa.objects.create(
            descripcion="Empresa líder en innovación",
            correo_contacto="contacto@empresa.com",
            telefono="123456789",
            direccion="Calle Falsa 123",
            sector="Tecnología",
            tamano="Grande",
            sitio_web="https://empresa.com"
        )
        self.assertEqual(str(perfil), "Perfil de Empresa (contacto@empresa.com)")
        self.assertEqual(perfil.tamano, "Grande")
        self.assertEqual(perfil.sitio_web, "https://empresa.com")
