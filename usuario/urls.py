from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar, name='registrar'),
    path("login/", views.login_user, name="login"),
    path('menu/', views.menu_view, name='menu'),
    path('frequencia/', views.frequencia, name='frequencia'),
    path("menu/perfil/", views.perfil_usuario, name="perfil_usuario"),
    path('meusTreinos/', views.meus_treinos, name='meusTreinos'),
    path('calendario/', views.calendario_view, name='calendario'),
    path('registrar-presenca/', views.registrar_presenca, name='registrar_presenca'),
    path("menu/criarAtleta/", views.criar_atleta, name="criar_atleta"),
    path("menu/excluirAtleta/", views.excluir_atleta, name="excluir_atleta"),
]

