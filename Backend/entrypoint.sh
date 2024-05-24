#!/bin/bash

# wait for DB
while ! nc -z ${MYSQL_HOST} ${MYSQL_PORT}; do sleep 1; done
# Run Django database migrations
python manage.py migrate

# Start Gunicorn server
exec gunicorn -w 2 -b 0.0.0.0:8000 project.wsgi:application
