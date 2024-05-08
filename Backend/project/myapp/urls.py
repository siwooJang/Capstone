from django.urls import path,include
from .views import DiaryViewset,DiaryDetailViewset

from rest_framework import routers

router = routers.DefaultRouter()
router.register('diary/detail',DiaryDetailViewset,basename='diary-detail')
router.register('diary',DiaryViewset,basename='diary')


from .schema.urls import urlpatterns as schema_urls
from .token.urls import urlpatterns as token_urls


urlpatterns=[
    path('token/',include(token_urls)),
    path('schema/',include(schema_urls)),
    path('',include(router.urls)),
]