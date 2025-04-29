from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate  # Agregado para LoginSerializer

class CandidatoRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = ['email', 'nombre_completo', 'ubicacion', 'password']

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            email=validated_data['email'],
            nombre_completo=validated_data['nombre_completo'],
            ubicacion=validated_data['ubicacion'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        usuario = authenticate(email=email, password=password)

        if usuario is None:
            raise serializers.ValidationError("Credenciales incorrectas.")

        data["usuario"] = usuario
        return data
