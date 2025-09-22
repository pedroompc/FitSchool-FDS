from django.shortcuts import render, redirect
from .forms import RegistroForm

def registrar(request):
    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")
    else:
        form = RegistroForm()
    return render(request, "fitschool/pages/registro.html", {"form": form})
