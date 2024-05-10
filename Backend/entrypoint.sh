#!/bin/bash

# Run Django database migrations
python manage.py migrate

# Start Gunicorn server
exec gunicorn -w 2 project.wsgi:application
