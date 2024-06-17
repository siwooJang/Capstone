# Capstone
2024_1 캡스톤 프로젝트

## Team

![image](https://github.com/siwooJang/Capstone/assets/88125431/00381857-b014-4290-bdf7-5dbcd68b251d)


### 시연 영상 ( 로그인 / 회원가입 / 일기 작성 )



https://github.com/siwooJang/Capstone/assets/88125431/8263e698-f9db-458a-9f0b-d80f38483241



### 시연 영상 ( 챗봇 )



https://github.com/siwooJang/Capstone/assets/88125431/076699c7-dd60-4370-a3bf-ffe8de0fe77a



## Server
### Diagram
![Picture1](https://github.com/ScobraCK/Capstone/assets/93692827/7cf86c49-6fc0-4030-8ff8-6c653dc98d94)

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

