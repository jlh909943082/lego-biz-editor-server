# Dockerfile
FROM node:14
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# 安装
RUN npm i

# CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run dev
# npx pm2 log是为了不释放控制台，pm2运行node会释放控制台
CMD npm run prd-dev && npx pm2 log

# 环境变量
ENV SERVER_NAME="biz-editor-server"
ENV AUTHOR_NAME="ji"
