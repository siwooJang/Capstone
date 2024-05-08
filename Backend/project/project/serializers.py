from rest_framework import serializers

class SecretSerializer(serializers.Serializer):
    SECRET_KEY=serializers.CharField()
    DB_CONF_PATH=serializers.CharField()
    EXTRA_KEY=serializers.ListField(child=serializers.CharField(),allow_empty=True)
    DEBUG=serializers.BooleanField()