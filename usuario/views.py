from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from datetime import datetime
import json
from .forms import RegistroForm, AtletaForm
from .models import Frequencia, Atleta

@login_required
def calendario_view(request):
    frequencias = Frequencia.objects.filter(usuario=request.user)
    
    dias_presentes = frequencias.filter(status='PRESENTE').count()
    dias_ausentes = frequencias.filter(status='AUSENTE').count()
    total_dias = dias_presentes + dias_ausentes
    taxa_frequencia = (dias_presentes / total_dias * 100) if total_dias > 0 else 0

    context = {
        'frequencias': frequencias, # Você usaria isso para popular o calendário
        'dias_presentes': dias_presentes,
        'dias_ausentes': dias_ausentes,
        'taxa_frequencia': round(taxa_frequencia),
    }
    return render(request, 'fitschool/pages/calendario.html', context)

# View para receber a requisição AJAX e registrar/atualizar a presença
@login_required
@require_POST # Garante que esta view só aceite requisições POST
def registrar_presenca(request):
    try:
        # Pega os dados enviados pelo JavaScript
        data = json.loads(request.body)
        data_selecionada = data.get('date')
        status_selecionado = data.get('status')

        # Converte a data string para um objeto date
        data_obj = datetime.strptime(data_selecionada, '%Y-%m-%d').date()

        frequencia, created = Frequencia.objects.update_or_create(
            usuario=request.user,
            data=data_obj,
            defaults={'status': status_selecionado}
        )
        
        frequencias = Frequencia.objects.filter(usuario=request.user)
        dias_presentes = frequencias.filter(status='PRESENTE').count()
        dias_ausentes = frequencias.filter(status='AUSENTE').count()
        total_dias = dias_presentes + dias_ausentes
        taxa_frequencia = (dias_presentes / total_dias * 100) if total_dias > 0 else 0

        return JsonResponse({
            'status': 'success',
            'message': 'Frequência registrada com sucesso!',
            'updated_stats': {
                'dias_presentes': dias_presentes,
                'dias_ausentes': dias_ausentes,
                'taxa_frequencia': round(taxa_frequencia)
            }
        })
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
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

def meus_treinos(request):
    return render(request, "fitschool/pages/treino.html")

def criar_Atleta(request):
    return render(request, "fitschool/pages/criarAtleta.html")

@login_required
def criar_atleta(request):
    if hasattr(request.user, "atleta"):
        # Já existe atleta → não deixa recriar
        return redirect("perfil_usuario")

    if request.method == "POST":
        form = AtletaForm(request.POST)
        if form.is_valid():
            atleta = form.save(commit=False)
            atleta.user = request.user
            atleta.save()
            return redirect("perfil_usuario")
    else:
        form = AtletaForm()

    return render(request, "fitschool/pages/criarAtleta.html", {"form": form})

@login_required
def perfil_usuario(request):
    atleta = getattr(request.user, "atleta", None)
    if not atleta:
        return redirect("criar_atleta")

    if request.method == "POST":
        form = AtletaForm(request.POST, instance=atleta)
        if form.is_valid():
            form.save()
            return redirect("perfil_usuario")
    else:
        form = AtletaForm(instance=atleta)

    return render(request, "fitschool/pages/perfilUsuario.html", {
        "atleta": atleta,
        "form": form
    })

@login_required
def editar_atleta(request):
    atleta = getattr(request.user, "atleta", None)
    if not atleta:
        return redirect("criar_atleta")

    if request.method == "POST":
        form = AtletaForm(request.POST, instance=atleta)
        if form.is_valid():
            form.save()
            return redirect("perfil_usuario")
    else:
        form = AtletaForm(instance=atleta)

    return render(request, "fitschool/pages/editarAtleta.html", {"form": form})

@login_required
def excluir_atleta(request):
    atleta = getattr(request.user, "atleta", None)
    if request.method == "POST" and atleta:
        atleta.delete()
        return redirect("menu")  # manda pro dashboard
    return render(request, "fitschool/pages/confirmar_delete.html", {"atleta": atleta})