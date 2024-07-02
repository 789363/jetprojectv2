# 选择带有 Node.js 的基础映像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器中
COPY . .

# 指定运行时的端口，这里需要暴露两个端口
EXPOSE 3001 3002

# 使用 npm run start 启动应用
CMD ["npm", "run", "start"]
