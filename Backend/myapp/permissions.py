from django.conf import settings
import rest_framework.permissions

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from rest_framework.request import Request

import socket

class DiaryEmotionPermission(rest_framework.permissions.BasePermission):
    def has_object_permission(self, request:'Request', view, obj):
        if request.method in rest_framework.permissions.SAFE_METHODS:
            if request.user.is_authenticated and request.user==obj.diary.writer:
                return True
        if request._request.META['REMOTE_HOST']==settings.AI_HOST:
            return True
        if request._request.META['REMOTE_ADDR']==socket.gethostbyname(settings.AI_HOST):
            return True
        return False