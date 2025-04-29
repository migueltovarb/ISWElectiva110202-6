from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from AppUsuarios.models import Usuario
from AppCandidatos.models import PerfilCandidato
from django.core.files.uploadedfile import SimpleUploadedFile
from faker import Faker
from io import BytesIO
from PIL import Image

fake = Faker()

def generar_imagen_mock(nombre="foto.jpg"):
    imagen = Image.new("RGB", (100, 100), color=(255, 0, 0))
    buffer = BytesIO()
    imagen.save(buffer, format="JPEG")
    buffer.seek(0)
    return SimpleUploadedFile(nombre, buffer.read(), content_type="image/jpeg")

class CrearPerfilCandidatoViewTest(APITestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create_user(
            email=fake.email(),
            password="Password123",
            nombre_completo=fake.name(),
            ubicacion=fake.city()
        )
        self.client.force_authenticate(user=self.usuario)

    def test_crear_perfil_candidato_exitoso(self):
        url = reverse('crear-perfil-candidato')
        foto = generar_imagen_mock()
        curriculum = SimpleUploadedFile("cv.pdf", b"archivo_falso", content_type="application/pdf")
        data = {
            "foto": foto,
            "descripcion": fake.text(),
            "educacion": fake.text(),
            "experiencia": fake.text(),
            "habilidades": fake.text(),
            "curriculum": curriculum
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["mensaje"], "Perfil de candidato creado exitosamente")

    def test_crear_perfil_candidato_invalido(self):
        url = reverse('crear-perfil-candidato')
        data = {
            "descripcion": "",
            "educacion": "",
            "experiencia": "",
            "habilidades": ""
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
