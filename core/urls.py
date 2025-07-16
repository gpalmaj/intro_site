from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about/', views.about, name='about'),
    path('blog/', views.blog, name='blog'),
    path('blog/<slug:slug>/', views.post_detail, name='post_detail'),
    path('fun_game/', views.fun_game, name='fun_game'),
]
