from django.shortcuts import render
from rest_framework import generics
from .models import Work
from .serializers import WorkSerializer


class WorkListAPIView(generics.ListAPIView):
    queryset = Work.objects.all().order_by('order', 'id')
    serializer_class = WorkSerializer