from rest_framework.test import APITestCase
from AppEmpresas.serializers import EmpresaRegistroSerializer, PerfilEmpresaSerializer
from AppUsuarios.models import Usuario
from AppEmpresas.models import Empresa, PerfilEmpresa

class EmpresaSerializerTests(APITestCase):

    def test_empresa_registro_serializer_creacion_exitosa(self):
        data = {
            "email": "empresa@test.com",
            "password": "Password123!",
            "razon_social": "Empresa Test",
            "sector": "Tecnología",
            "ubicacion": "Bogotá"
        }
        serializer = EmpresaRegistroSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        empresa = serializer.save()
        self.assertEqual(empresa.razon_social, "Empresa Test")
        self.assertEqual(empresa.sector, "Tecnología")
        self.assertEqual(empresa.usuario.email, "empresa@test.com")

    def test_empresa_registro_serializer_email_existente(self):
        Usuario.objects.create_user(
            email="empresa@test.com", password="Password123!",
            nombre_completo="Empresa Previa", ubicacion="Cali"
        )
        data = {
            "email": "empresa@test.com",
            "password": "Password123!",
            "razon_social": "Empresa Nueva",
            "sector": "Salud",
            "ubicacion": "Medellín"
        }
        serializer = EmpresaRegistroSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

class PerfilEmpresaSerializerTests(APITestCase):

    def test_perfil_empresa_serializer_fields(self):
        perfil = PerfilEmpresa.objects.create(
            descripcion="Empresa dedicada al desarrollo de software",
            correo_contacto="contacto@empresa.com",
            telefono="123456789",
            direccion="Carrera 10 #20-30",
            sector="Tecnología",
            tamano="Mediana",
            sitio_web="https://empresa.com"
        )
        serializer = PerfilEmpresaSerializer(perfil)
        data = serializer.data
        self.assertEqual(data['correo_contacto'], "contacto@empresa.com")
        self.assertEqual(data['telefono'], "123456789")
        self.assertEqual(data['tamano'], "Mediana")
