# Use uma imagem oficial do Node.js como base
FROM node:21.6.1

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY server/package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o código da aplicação para o container
COPY server .

# Expõe a porta que a aplicação usará
EXPOSE 8000

# Comando para iniciar a aplicação
CMD [ "node", "index.js" ]
