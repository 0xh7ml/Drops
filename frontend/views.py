from django.shortcuts import render

# Create your views here.

# index page
def index(request):
    return render(request, 'index.html')

# signup page
def signup(request):
    return render(request, 'signup.html')

# success page
def success(request):
    return render(request, 'success.html')

# all donors page
def donors(request):
    return render(request, 'donors.html')