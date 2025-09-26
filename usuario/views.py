from django.shortcuts import render, redirect
from .forms import RegistroForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import PerfilForm
from .models import Perfil
from .models import Frequencia
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from datetime import datetime

@login_required
def calendario_view(request):
    # Lógica para buscar os dados de frequência e calcular as estatísticas
    # Esta parte pode ser mais complexa para gerar o calendário completo,
    # mas aqui está o essencial.
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

def criar_Atleta(request):
    return render(request, "fitschool/pages/criarAtleta.html")