from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from AppUsuarios.models import Usuario
from AppEmpresas.models import Empresa, PerfilEmpresa

class EmpresaViewsTest(APITestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create_user(
            email='empresa@correo.com',
            password='empresapass123',
            nombre_completo='Empresa XYZ',
            ubicacion='Bogotá'
        )
        self.empresa = Empresa.objects.create(
            usuario=self.usuario,
            razon_social='Empresa XYZ',
            sector='Tecnología',
            ubicacion='Bogotá'
        )

    def test_registro_empresa_exitoso(self):
        url = reverse('registro-empresa')
        data = {
            "email": "nuevaempresa@correo.com",
            "password": "Clave123456",
            "razon_social": "Nueva Empresa",
            "sector": "Salud",
            "ubicacion": "Medellín"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["mensaje"], "Empresa registrada exitosamente")

    def test_registro_empresa_invalido(self):
        url = reverse('registro-empresa')
        data = {
            "email": "",  # inválido
            "password": "123",
            "razon_social": "",
            "sector": "",
            "ubicacion": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_creacion_perfil_empresa_exitoso(self):
        url = reverse('crear-perfil-empresa')
        data = {
            # 👇 Se omite el campo logo, ya que es null=True y blank=True
            "descripcion": "Empresa dedicada al desarrollo de software",
            "correo_contacto": "contacto@empresa.com",
            "telefono": "123456789",
            "direccion": "Calle Falsa 123",
            "sector": "Tecnología",
            "tamano": "Mediana",
            "sitio_web": "https://empresa.com"
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["mensaje"], "Perfil creado exitosamente")

    def test_creacion_perfil_empresa_invalido(self):
        url = reverse('crear-perfil-empresa')
        data = {
            "descripcion": "",  # inválido
            "correo_contacto": "no-es-un-email",
            "telefono": "",
            "direccion": "",
            "sector": "",
            "tamano": "",
            "sitio_web": "no-es-url"
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
