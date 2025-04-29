from rest_framework.test import APITestCase
from AppCandidatos.serializers import PerfilCandidatoSerializer
from AppUsuarios.models import Usuario
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

class PerfilCandidatoSerializerTest(APITestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create_user(
            email=fake.email(),
            password="Password123",
            nombre_completo=fake.name(),
            ubicacion=fake.city()
        )

    def test_serializer_creacion_valida(self):
        foto = generar_imagen_mock()
        curriculum = SimpleUploadedFile("cv.pdf", b"archivo_falso", content_type="application/pdf")
        data = {
            "usuario": self.usuario.id,
            "foto": foto,
            "descripcion": fake.text(),
            "educacion": fake.text(),
            "experiencia": fake.text(),
            "habilidades": fake.text(),
            "curriculum": curriculum
        }
        serializer = PerfilCandidatoSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        perfil = serializer.save()
        self.assertEqual(perfil.usuario, self.usuario)
        self.assertEqual(perfil.descripcion, data["descripcion"])
