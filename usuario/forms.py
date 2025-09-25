# usuario/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Perfil

class RegistroForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'placeholder': 'Seu e-mail'})
    )
    username = forms.CharField(
        label='Nome de usuário',
        widget=forms.TextInput(attrs={'placeholder': 'Seu usuário'})
    )
    password1 = forms.CharField(
        label='Senha',
        widget=forms.PasswordInput(attrs={'placeholder': 'Crie uma senha'})
    )
    password2 = forms.CharField(
        label='Confirmar senha',
        widget=forms.PasswordInput(attrs={'placeholder': 'Repita sua senha'})
    )

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

class PerfilForm(forms.ModelForm):
    class Meta:
        model = Perfil
        fields = ["idade", "peso", "altura", "meta"]
        widgets = {
            "idade": forms.NumberInput(attrs={"class": "form-control"}),
            "peso": forms.NumberInput(attrs={"class": "form-control"}),
            "altura": forms.NumberInput(attrs={"class": "form-control"}),
            "meta": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
        }