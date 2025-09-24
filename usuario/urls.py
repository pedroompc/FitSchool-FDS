from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar, name='registrar'),
    path('menu/', views.menu_view, name='menu'),
    path('frequencia/', views.frequencia, name='frequencia'),
]
