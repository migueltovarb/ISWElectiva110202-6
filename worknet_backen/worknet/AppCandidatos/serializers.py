# AppCandidatos/serializers.py
from rest_framework import serializers
from .models import PerfilCandidato

class PerfilCandidatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilCandidato
        fields = '__all__'
