from rest_framework import serializers
from .models import Work, WorkImage


class WorkImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkImage
        fields = ['id', 'image', 'order']


class WorkSerializer(serializers.ModelSerializer):
    images = WorkImageSerializer(many=True, read_only=True)

    class Meta:
        model = Work
        fields = ['id', 'title', 'dynasty', 'cover', 'builder', 
                  'renderer', 'description', 'note', 'images', 'order']