from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar, name='registrar'),
    path("login/", views.login_user, name="login"),
    path('menu/', views.menu_view, name='menu'),
    path('frequencia/', views.frequencia, name='frequencia'),
    path('perfilUsuario/', views.perfilUsuario, name='perfilUsuario'),
    path('meusTreinos/', views.meus_treinos, name='meusTreinos'),
    path('calendario/', views.calendario_view, name='calendario'),
    path('registrar-presenca/', views.registrar_presenca, name='registrar_presenca'),
]

