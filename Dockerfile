# Minified node image based on alpine linux
FROM node:alpine

# Declare environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV JWT_SECRETY_KEY=oasnfspakgnsolgkhnalfgknhalg

# Declaring a work directory for our own contents to be inserted
# into the base image
WORKDIR /app

# Copy whatever is in the repo into the workdir
COPY . .

# RUN npm install
# npm ci is an alternative to npm install, better for terminal-only environments
RUN npm ci

# Run the app
CMD [ "npm", "run", "start"]

# Expose the server to the rest of the computer
EXPOSE 5000