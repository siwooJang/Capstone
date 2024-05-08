#from django.contrib.auth.models import User

from . import serializers

from .models import Diary

from rest_framework import viewsets,mixins

from rest_framework.permissions import IsAuthenticated

class DiaryViewset(viewsets.ReadOnlyModelViewSet,mixins.CreateModelMixin,mixins.DestroyModelMixin):
    permission_classes=[IsAuthenticated]
    serializer_class=serializers.DiarySerializer
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user) 

    def perform_create(self, serializer:serializer_class):
        serializer.save(writer=self.request.user)

class DiaryDetailViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class=serializers.DiaryDetailSerializer
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user) 