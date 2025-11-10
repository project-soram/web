# === STAGE 1: Build ===
# 'builder'라는 별명으로 첫 번째 스테이지 시작
FROM node:20 AS builder

# 앱 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치 (npm ci 사용 권장)
RUN npm ci

# 소스코드 복사
COPY . .

# 빌드 타임 환경 변수 선언
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL

# ENV로 설정하여 'npm run build'가 인식하도록 함
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Next.js 앱 빌드
RUN npm run build

# === STAGE 2: Production ===
# 완전히 새로운 경량 이미지에서 시작
FROM node:20

WORKDIR /usr/src/app

# 'builder' 스테이지에서 package*.json 파일만 복사
COPY --from=builder /usr/src/app/package*.json ./

# ⭐️ 중요: 개발 의존성을 제외한 '프로덕션' 의존성만 설치
RUN npm ci --omit=dev

# 'builder' 스테이지에서 빌드 결과물(.next)과 public 폴더 복사
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Next.js 실행에 필요한 설정 파일 복사
COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts

# 포트 노출
EXPOSE 3000

# Next.js 앱 실행
CMD [ "npm", "start", "--", "-H", "0.0.0.0" ]