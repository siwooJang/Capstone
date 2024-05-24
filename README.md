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
```
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

#### Setup Github Actions
- Deploy
<br> Clone/pull repository and run docker compose

TODO add workflow file and add explanation

### Docker Compose
TODO add compose file and explanation

### Deal with secrets
실제 production에서는

`.env.mysql.secret` 에 새로운 root password를,

`.env.mysql.shared.secret`에 새로운 user password를.

`env.backend.secret`에는,
DEBUG=False와,
적절한 secret_key 값과,
실제 서버의 이름을 allowed_hosts에 추가해야 한다.
