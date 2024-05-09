Backend Documentation
---

# 자동 생성 documentation

서버를 동작시켰을 때,
`/api/schema/swagger-ui/`에서 swagger ui를,
`/api/schema/redoc/`에서 redoc식 ui를 제공한다.

# 환경 변수 관련

시스템 환경 변수
`project/.env.secret`
`project/.env`

순으로 우선순위를 가진다.


# 환경 변수 목록
### DEBUG
django에서 사용하는 DEBUG와 동등하다.

### SECRET_KEY
django에서 사용하는 secret key이다.
세션,jwt 인증 등에 사용되어,

같은 서버 내에서는 동일한 값을 유지하여야 하고,

외부에는 노출되지 않아야 하는 값이다.

## MySQL 관련

### DB_NAME
DRF 앱에서 저장할 데이터베이스의 이름을 정한다.
### DB_USER
### DB_PASSWORD
MySQL 서버에 로그인할 때 사용할 username,password를 지정한다.

### DB_HOST
MySQL 서버의 주소를 지정한다.
### DB_PORT
MySQL 서버의 port를 지정한다.

### ALLOWED_HOSTS
`;`로 분리하여 허용하는 host들을 지정해주어야 한다.

Debug시에는 간단히 "*"로 해놓는 편이 편하지만,
실제 production에서는 실제 서버의 주소와 같게 해놓아야 할 것이다.


