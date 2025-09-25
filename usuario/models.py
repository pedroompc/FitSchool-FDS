from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    idade = models.PositiveIntegerField(null=True, blank=True)
    peso = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    altura = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    meta = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"Perfil de {self.user.username}"
