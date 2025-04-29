from rest_framework.test import APITestCase
from AppUsuarios.models import Usuario

class UsuarioModelTest(APITestCase):

    def test_creacion_usuario(self):
        usuario = Usuario.objects.create_user(
            email='usuario@correo.com',
            password='securepass123',
            nombre_completo='Usuario Prueba',
            ubicacion='Medellín'
        )
        self.assertEqual(usuario.email, 'usuario@correo.com')
        self.assertTrue(usuario.check_password('securepass123'))
        self.assertEqual(usuario.nombre_completo, 'Usuario Prueba')
        self.assertEqual(usuario.ubicacion, 'Medellín')
        self.assertTrue(usuario.is_active)
        self.assertFalse(usuario.is_staff)
        self.assertFalse(usuario.is_superuser)

    def test_creacion_superusuario(self):
        admin = Usuario.objects.create_superuser(
            email='admin@correo.com',
            password='adminpass123',
            nombre_completo='Admin Usuario',
            ubicacion='Bogotá'
        )
        self.assertEqual(admin.email, 'admin@correo.com')
        self.assertTrue(admin.check_password('adminpass123'))
        self.assertTrue(admin.is_active)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

    def test_str_usuario(self):
        usuario = Usuario.objects.create_user(
            email='str@correo.com',
            password='pass12345',
            nombre_completo='String Usuario',
            ubicacion='Cali'
        )
        self.assertEqual(str(usuario), 'str@correo.com')

    def test_usuario_manager_sin_email(self):
        with self.assertRaisesMessage(ValueError, "El email es obligatorio"):
            Usuario.objects.create_user(
                email='',
                password='pass123',
                nombre_completo='Sin Email',
                ubicacion='Pasto'
            )
