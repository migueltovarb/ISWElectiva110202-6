from rest_framework.test import APITestCase
from AppUsuarios.models import Usuario
from AppUsuarios.serializers import CandidatoRegistroSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

class UsuarioSerializerTest(APITestCase):

    def test_candidato_registro_serializer_crea_usuario(self):
        data = {
            "email": "nuevo@correo.com",
            "nombre_completo": "Usuario Nuevo",
            "ubicacion": "Barranquilla",
            "password": "Test1234*"
        }
        serializer = CandidatoRegistroSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        usuario = serializer.save()

        self.assertEqual(usuario.email, data["email"])
        self.assertTrue(usuario.check_password(data["password"]))
        self.assertEqual(usuario.nombre_completo, data["nombre_completo"])
        self.assertEqual(usuario.ubicacion, data["ubicacion"])

    def test_login_serializer_valido(self):
        user = Usuario.objects.create_user(
            email="login@correo.com",
            password="LoginTest123",
            nombre_completo="Login Usuario",
            ubicacion="Pasto"
        )
        data = {"email": "login@correo.com", "password": "LoginTest123"}
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data["usuario"], user)

    def test_login_serializer_credenciales_invalidas(self):
        data = {"email": "invalido@correo.com", "password": "malapass"}
        serializer = LoginSerializer(data=data)
        with self.assertRaises(ValidationError):
            serializer.is_valid(raise_exception=True)
