from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import DonorSerializer
from .models import Donor

# Create your views here.
@api_view(['GET'])
def index(request):
    if request.method == "GET":
        return Response("OK", 200)
    
@api_view(['GET'])
def donors(request):
    # get all donors object from db
    donors = Donor.objects.all()
    # serialized all donors using serializer
    serializer = DonorSerializer(donors, many=True)
    if serializer:
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_donor(request):
    if request.method == "POST":
        serializer = DonorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("ok",status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

