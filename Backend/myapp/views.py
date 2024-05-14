#from django.contrib.auth.models import User

import rest_framework.request
from . import serializers

from .models import Diary,DiaryEmotion
from .permissions import DiaryEmotionPermission
from . import aiapi

from rest_framework import viewsets,mixins

from rest_framework.permissions import IsAuthenticated

class DiaryViewset(mixins.CreateModelMixin,mixins.DestroyModelMixin,viewsets.ReadOnlyModelViewSet):
    queryset=Diary
    permission_classes=[IsAuthenticated]
    serializer_class=serializers.DiarySerializer
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user) 

    def perform_create(self, serializer:serializer_class):
        
        diary=serializer.save(writer=self.request.user)
        try:
            aiapi.send_diary(diary=diary.id,
                         content=diary.content)
        except:
            diary.delete()

class DiaryDetailViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class=serializers.DiaryDetailSerializer
    queryset=Diary
    def get_queryset(self):
        return Diary.objects.filter(writer=self.request.user)

class DiaryEmotionViewset(mixins.CreateModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    permission_classes=[DiaryEmotionPermission]
    serializer_class=serializers.DiaryEmotionSerializer
    queryset=DiaryEmotion