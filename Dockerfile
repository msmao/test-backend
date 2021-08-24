FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:5.15.0-alpine

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["npm", "start"]