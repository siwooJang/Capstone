# Capstone
2024_1 캡스톤 프로젝트

## Team
TODO

## Server
### Diagram
TODO: Frontend(next.js), Backend(Django), AI servers + Nginx, DB(MySQL)
### Server Setup
#### Install Docker
https://docs.docker.com/engine/install/ubuntu/
#### Set up non-root user
```sh
# set up user
sudo adduser <username>  # make user
sudo usermod -aG docker <username>  # add user to docker group
newgrp docker  # apply change

# make ssh key
su <username>
ssh-keygen -t ed25519 -C "<name>"
cat /home/<username>/.ssh/id_ed25519.pub /home/<username>/.ssh/authorized_keys  # add generated key to authorized keys

# copy private key to github actions secrets
cat /home/<username>/.ssh/id_ed25519  # copy output or use other method
```

#### Env Files
For production change .env files for deployment and remove .example

#### SSL setup
docker compose와 nginx를 이용하기 때문에 certbot을 이미지 이용하게 된다. 초기에는 인증서가 없지만 nginx.conf에는 ssl 인증서를 찾기 때문에 임시로 인증을 위한 nginx만 실행을 하게 될 것이다. (docker-compose-certbot.yml 이용)

이번 프로젝트에는 certbot 갱신을 추가하지 않았다.
```sh
# Make dirs for certs
mkdir -p certbot/conf
mkdir -p certbot/www

# FIRST TIME ONLY
# Get certs
docker compose -f docker-compose-certbot.yml up nginx -d
docker compose -f docker-compose-certbot.yml run certbot
```
Also need to make a .env file with EMAIL=<your-email> for certbot

#### Additional
May need to chmod +x entrypoint.sh manually from outside of docker

### Setup Github Actions
- Deploy
<br> Clone/pull repository and run docker compose

TODO add workflow file and add explanation

### Docker Compose
- Production docker compose
```sh
docker compose -f docker-compose-prd.yml up --build -d
```
TODO add compose file and explanation