FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Vite globally (optional, useful for docker CMD)
RUN npm install -g vite

COPY . .

EXPOSE 3000

CMD ["vite", "--host", "0.0.0.0"]
