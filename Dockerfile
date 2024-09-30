# build environment
FROM node:20.17.0-alpine as build
WORKDIR /app/my-cafe-ui/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/my-cafe-ui/dist /usr/share/nginx/html
COPY --from=build /app/my-cafe-ui/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
