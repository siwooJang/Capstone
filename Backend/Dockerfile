FROM python:3.12

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# install packages and libs
RUN apt update && apt upgrade -y &&\
   apt install -y default-libmysqlclient-dev build-essential pkg-config &&\
   rm -rf /var/lib/apt/lists/*

COPY . /app
WORKDIR /app
RUN chmod +x entrypoint.sh

RUN pip install -r requirement.txt --no-cache-dir

# use unpriviledged container
RUN groupadd appuser && useradd -g appuser -m appuser
USER appuser

EXPOSE 8000
ENTRYPOINT entrypoint.sh