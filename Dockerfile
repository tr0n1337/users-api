FROM node:18.17.1

WORKDIR /app

COPY . ./

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3001
ENTRYPOINT [ "pnpm", "run" ]
CMD ["start:dev"]