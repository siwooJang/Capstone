from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from django.contrib.auth.models import User
else:
    from django.contrib.auth import get_user_model
    User=get_user_model()


from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=("username","password")
        extra_kwargs = {
                'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        #return super().create(validated_data)
        return self.Meta.model.objects.create_user(username=validated_data['username'],password=validated_data['password'])
    
    def update(self, instance, validated_data):
        raise Exception("cannot update Diary")