from django.db import models
from AppUsuarios.models import Usuario

class Empresa(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    razon_social = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    ubicacion = models.CharField(max_length=255)

    def __str__(self):
        return self.razon_social

# ✅ Modelo de Perfil de Empresa con relación al usuario
class PerfilEmpresa(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="perfil_empresa")
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    descripcion = models.TextField()
    correo_contacto = models.EmailField()
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    sector = models.CharField(max_length=100)
    tamano = models.CharField(max_length=50)
    sitio_web = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return f"Perfil de Empresa ({self.correo_contacto})"
