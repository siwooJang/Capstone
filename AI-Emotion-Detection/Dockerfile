FROM python:3.11-slim

COPY requirement.txt /app/requirement.txt
WORKDIR /app
RUN pip install -r requirement.txt --no-cache-dir

COPY ./src /app

EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD gunicorn -w 1 -b 0.0.0.0:5000 app:app