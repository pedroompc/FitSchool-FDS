from django.shortcuts import render, redirect
from .forms import RegistroForm
from django.contrib.auth import authenticate, login
from django.contrib import messages

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