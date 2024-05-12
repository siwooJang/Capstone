FROM python:3.12-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# install packages and libs
RUN apt update && apt upgrade -y &&\
   apt install -y default-libmysqlclient-dev build-essential pkg-config netcat-traditional &&\
   rm -rf /var/lib/apt/lists/*
   
COPY requirement.txt /app/requirement.txt
WORKDIR /app
RUN pip install -r requirement.txt --no-cache-dir

COPY . /app
RUN chmod +x entrypoint.sh

# use unpriviledged container
RUN groupadd appuser && useradd -g appuser -m appuser
USER appuser

EXPOSE 8000
ENTRYPOINT /app/entrypoint.sh