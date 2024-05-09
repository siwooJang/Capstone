#from django.contrib.auth.models import User

from . import serializers

from .models import Diary,DiaryEmotion

from rest_framework import viewsets,mixins

from rest_framework.permissions import IsAuthenticated

class DiaryViewset(mixins.CreateModelMixin,mixins.DestroyModelMixin,viewsets.ReadOnlyModelViewSet):
    queryset=Diary
    permission_classes=[IsAuthenticated]
    serializer_class=serializers.DiarySerializer
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user) 

    def perform_create(self, serializer:serializer_class):
        serializer.save(writer=self.request.user)

class DiaryDetailViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class=serializers.DiaryDetailSerializer
    queryset=Diary
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user)

import rest_framework.permissions

class DiaryEmotionPermission(rest_framework.permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        else:
            return request.user==obj.diary.writer

class DiaryEmotionViewset(mixins.CreateModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    permission_classes=[IsAuthenticated,DiaryEmotionPermission]
    serializer_class=serializers.DiaryEmotionSerializer
    queryset=DiaryEmotion