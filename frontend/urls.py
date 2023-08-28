from django.urls import path
from . import views


# url patterns 
urlpatterns = [
    path("", views.index, name="index"),
    path("signup/", views.signup, name="signup"),
    path("success/", views.success, name="success"),
    path("donors/", views.donors, name="donors"),
]