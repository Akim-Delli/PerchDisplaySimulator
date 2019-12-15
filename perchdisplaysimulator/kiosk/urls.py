from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
                  path('', views.index, name='index'),
                  path('stats', views.stats, name='stats'),
                  path('display', views.display, name='display'),
                  path('log', views.log, name='log'),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
