# AppEmpresas/serializers.py
from rest_framework import serializers
from AppUsuarios.models import Usuario
from .models import Empresa, PerfilEmpresa
from django.contrib.auth.password_validation import validate_password

class EmpresaRegistroSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    razon_social = serializers.CharField()
    sector = serializers.CharField()
    ubicacion = serializers.CharField()

    class Meta:
        model = Empresa
        fields = ['email', 'password', 'razon_social', 'sector', 'ubicacion']

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con este correo.")
        return value

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        usuario = Usuario.objects.create_user(
            email=email,
            password=password,
            nombre_completo=validated_data['razon_social'],
            ubicacion=validated_data['ubicacion']
        )

        empresa = Empresa.objects.create(
            usuario=usuario,
            razon_social=validated_data['razon_social'],
            sector=validated_data['sector'],
            ubicacion=validated_data['ubicacion']
        )

        return empresa

# ✅ Serializer actualizado para manejar el usuario automáticamente
class PerfilEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilEmpresa
        exclude = ['usuario']  # 👈 Importante excluirlo para que no lo pida el frontend

    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)
