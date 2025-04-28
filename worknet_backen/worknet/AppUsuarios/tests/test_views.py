from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from AppUsuarios.models import Usuario

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

class UsuarioViewsTest(APITestCase):

    def setUp(self):
        self.email = 'test@correo.com'
        self.password = 'test12345'
        self.usuario = Usuario.objects.create_user(
            email=self.email, 
            password=self.password, 
            nombre_completo='Test User',
            ubicacion='Bogotá'  # ✅ importante para que no haya errores en login después
        )

    def test_login_exitoso(self):
        url = reverse('login')
        data = {'email': self.email, 'password': self.password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_error_credenciales_invalidas(self):
        url = reverse('login')
        data = {'email': self.email, 'password': 'malapass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_registro_candidato_exitoso(self):
        url = reverse('registro-candidato')
        data = {
            "email": "nuevo@correo.com",
            "password": "Test12345@",
            "nombre_completo": "Nuevo Usuario",
            "ubicacion": "Medellín"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["mensaje"], "Registro exitoso")

    def test_registro_candidato_invalido(self):
        url = reverse('registro-candidato')
        data = {
            "email": "",
            "password": "123",
            "nombre_completo": "",
            "ubicacion": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_solicitar_recuperacion_exitoso(self):
        url = reverse('solicitar-recuperacion')
        data = {'email': self.email}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('mensaje', response.data)

    def test_solicitar_recuperacion_email_invalido(self):
        url = reverse('solicitar-recuperacion')
        data = {'email': 'noexiste@correo.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)

    def test_solicitar_recuperacion_sin_email(self):
        url = reverse('solicitar-recuperacion')
        data = {}  # sin email
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_restablecer_contrasena_token_valido(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.usuario.pk))
        token = default_token_generator.make_token(self.usuario)
        url = reverse('restablecer-contrasena', args=[uidb64, token])
        data = {'password': 'nuevaPassword123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('mensaje', response.data)

    def test_restablecer_contrasena_token_invalido(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.usuario.pk))
        url = reverse('restablecer-contrasena', args=[uidb64, 'token-invalido'])
        data = {'password': 'otraPassword123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_restablecer_contrasena_uid_invalido(self):
        uidb64 = urlsafe_base64_encode(b'invalido')
        token = default_token_generator.make_token(self.usuario)
        url = reverse('restablecer-contrasena', args=[uidb64, token])
        data = {'password': 'claveNueva123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_confirmar_restablecer_contrasena_valido(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.usuario.pk))
        token = default_token_generator.make_token(self.usuario)
        url = reverse('confirmar-restablecer', args=[uidb64, token])
        data = {'nueva_password': 'otraClave123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('mensaje', response.data)

    def test_confirmar_restablecer_contrasena_token_invalido(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.usuario.pk))
        url = reverse('confirmar-restablecer', args=[uidb64, 'token-malo'])
        data = {'nueva_password': 'claveFail123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_confirmar_restablecer_contrasena_uid_invalido(self):
        uidb64 = urlsafe_base64_encode(b'invalido')
        token = default_token_generator.make_token(self.usuario)
        url = reverse('confirmar-restablecer', args=[uidb64, token])
        data = {'nueva_password': 'Clave123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
