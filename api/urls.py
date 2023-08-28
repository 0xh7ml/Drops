from django.urls import path
from . import views


# url patterns 
urlpatterns = [
    path("", views.index, name="index"),
    path("v1/donors/", views.donors, name="donors"),
    path("v1/register/", views.create_donor, name="register"),
]