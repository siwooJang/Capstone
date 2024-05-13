from django.db import models

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from django.contrib.auth.models import User
else:
    from django.contrib.auth import get_user_model
    User=get_user_model()

#일기 하나를 piece
#journal? (이건 한 권에 더 가까움)
class Diary(models.Model): #Daily의 뜻 중 가장 마지막에 있는게, 매일매일 쓴거 1개.
    writer=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    content=models.TextField()
    date=models.DateField(auto_now_add=True)
    #is_public=models.BooleanField()
    #emotion=models.JSONField()

    class Meta:
        indexes=[
            models.Index(fields=['writer'])
        ]

class DiaryEmotion(models.Model):
    diary=models.OneToOneField(
        Diary,on_delete=models.CASCADE,
        primary_key=True
    )
    anger=models.FloatField()
    sadness=models.FloatField()
    anxiety=models.FloatField()
    hurt=models.FloatField()
    panic=models.FloatField()
    happiness=models.FloatField()