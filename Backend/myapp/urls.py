from django.urls import path,include
from .views import DiaryViewset,DiaryDetailViewset,DiaryEmotionViewset

from rest_framework import routers

router = routers.DefaultRouter()
router.register('diary/detail',DiaryDetailViewset,basename='diary-detail')
router.register('diary/emotion',DiaryEmotionViewset,basename='diary-emotion')
router.register('diary',DiaryViewset,basename='diary')

from .schema.urls import urlpatterns as schema_urls

urlpatterns=[
    path('schema/',include(schema_urls)),
    path('',include(router.urls)),
]