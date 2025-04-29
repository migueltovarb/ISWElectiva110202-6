# AppCandidatos/tests/test_models.py
from django.test import TestCase
from AppUsuarios.models import Usuario
from AppCandidatos.models import PerfilCandidato
from faker import Faker
from django.core.files.uploadedfile import SimpleUploadedFile

class PerfilCandidatoModelTest(TestCase):

    def setUp(self):
        self.faker = Faker()

        self.usuario = Usuario.objects.create_user(
            email=self.faker.email(),
            password="ClaveSegura123",
            nombre_completo=self.faker.name(),
            ubicacion=self.faker.city()
        )

        # ✅ Subir archivos válidos (extensión real aunque vacíos)
        self.foto = SimpleUploadedFile("foto.jpg", b"file_content", content_type="image/jpeg")
        self.curriculum = SimpleUploadedFile("cv.pdf", b"%PDF-1.4 fake pdf", content_type="application/pdf")

        self.perfil = PerfilCandidato.objects.create(
            usuario=self.usuario,
            foto=self.foto,
            descripcion=self.faker.text(),
            educacion=self.faker.text(),
            experiencia=self.faker.text(),
            habilidades=self.faker.text(),
            curriculum=self.curriculum,
        )

    def test_str_metodo(self):
        self.assertEqual(str(self.perfil), f"Perfil de {self.usuario.email}")

    def test_campos_perfil(self):
        self.assertEqual(self.perfil.usuario, self.usuario)
        self.assertIsNotNone(self.perfil.foto)
        self.assertIsNotNone(self.perfil.curriculum)
