from django.shortcuts import render, redirect
from .forms import RegistroForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import PerfilForm
from .models import Perfil


@login_required
def perfilUsuario(request):
    perfil, created = Perfil.objects.get_or_create(user=request.user)

    if request.method == "POST":
        form = PerfilForm(request.POST, instance=perfil)
        if form.is_valid():
            form.save()
    else:
        form = PerfilForm(instance=perfil)

    # cálculo do IMC
    imc = None
    if perfil.peso and perfil.altura:
        try:
            altura_m = float(perfil.altura) / 100
            imc = float(perfil.peso) / (altura_m ** 2)
        except ZeroDivisionError:
            imc = None

    return render(request, "fitschool/pages/perfilUsuario.html", {
        "user": request.user,
        "perfil": perfil,
        "form": form,
        "imc": imc,
    })

def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")  
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("menu")  
        else:
            messages.error(request, "Usuário ou senha inválidos")
            return redirect("home")  

    return redirect("home")

def registrar(request):
    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("menu")
    else:
        form = RegistroForm()
    return render(request, "fitschool/pages/registro.html", {"form": form})

def menu_view(request):
    return render(request, "fitschool/pages/menu.html")

def frequencia(request):
    return render(request, "fitschool/pages/frequencia.html")

@login_required
def editar_perfil(request):
    perfil, created = Perfil.objects.get_or_create(user=request.user)  # cria se não existir
    
    if request.method == "POST":
        form = PerfilForm(request.POST, instance=perfil)
        if form.is_valid():
            form.save()
            return redirect("editar_perfil")  # recarrega a página (ou redireciona)
    else:
        form = PerfilForm(instance=perfil)
    
    return render(request, "usuario/editar_perfil.html", {"form": form})

def meus_treinos(request):
    return render(request, "fitschool/pages/treino.html")