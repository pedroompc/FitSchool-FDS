from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('fitschool.urls')),     # sua home (app fitschool)
    path('admin/', admin.site.urls),         # admin
    path('user/menu/', include('usuario.urls')),  # todas as rotas do app usuario
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
