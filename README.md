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
#### Add enviroment file for secrets
TODO add example
#### Setup Github Actions
- Build
<br>On push build docker image and upload to AWS ECR
- Deploy
<br>After build login to server and pull new image

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
