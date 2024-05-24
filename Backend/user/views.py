
from rest_framework import viewsets,mixins
from .serializers import UserSerializer,User

class UserViewset(mixins.CreateModelMixin,viewsets.GenericViewSet):
    permission_classes=[]
    serializer_class=UserSerializer
    queryset=User
