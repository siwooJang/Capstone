from . import models
from rest_framework import serializers
from .stub import analyze_emotion

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Diary
        fields=("title","content","id")
        read_only_fields=("id",)
        write_only_fields=("content",)
    
    #def create(self, validated_data):
    #    validated_data['emotion']=analyze_emotion(
    #        content=validated_data['content'],
    #        title=validated_data['title']
    #    )
    #    return super().create(validated_data)
    
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
        write_only_fields=['diary']