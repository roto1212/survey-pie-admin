# 개발 환경용 Dockerfile
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치 (npm ci 대신 npm install 사용)
RUN npm install

# 소스 코드 복사
COPY . .

# 개발 환경 변수 설정
ENV WDS_SOCKET_HOST=0.0.0.0
ENV WDS_SOCKET_PORT=4000
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV WDS_SOCKET_PATH=/ws
ENV REACT_APP_WS_URL=ws://localhost:4000/ws
ENV PORT=3000

# 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]