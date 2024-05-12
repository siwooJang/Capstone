from . import models
from rest_framework import serializers

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Diary
        fields=("title","content","id")
        read_only_fields=("id",)
        extra_kwargs = {
                'content': {'write_only': True}
        }
    
    def update(self, instance, validated_data):
        raise Exception("cannot update Diary")

class DiaryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Diary
        fields=['id','title','content','date']#emotion
        read_only_fields=fields

class DiaryEmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.DiaryEmotion
        fields=['diary','anger','sadness','anxiety','hurt','panic','happyness']
        extra_kwargs = {
                'diary': {'write_only': True}
        }