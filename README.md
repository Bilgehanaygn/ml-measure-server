# ml-measure-server

# Installation and Setup


## For local setup node version 18 or higher is recommended.

### 1. git clone https://github.com/Bilgehanaygn/ml-measure-server.git


In the project directory run the following commands, specify the port in the index.js file port 5000 is recommended, as it is the base URL in the front-end application. If you run the application in a different port make sure to update the base url in the front-end application as well.
### 2. 

npm install
npm run dev



## Alternative way to setup the application - Build with docker 
### Run the following command

docker build -t <image_name> .
docker run <image_name> -p 5000:5000
