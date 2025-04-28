# AppCandidatos/models.py
from django.db import models
from AppUsuarios.models import Usuario

class PerfilCandidato(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    foto = models.ImageField(upload_to='fotos_candidato/', null=True, blank=True)
    descripcion = models.TextField()
    educacion = models.TextField()
    experiencia = models.TextField()
    habilidades = models.TextField()
    curriculum = models.FileField(upload_to='curriculums/', null=True, blank=True)

    def __str__(self):
        return f"Perfil de {self.usuario.email}"
