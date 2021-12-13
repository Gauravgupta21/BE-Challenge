# Use TypeScrip to Create CRUD API using NodeJS and MongoDB


Installation steps

npm init -y

npm i express dotenv cors helmet mongoose

npm i -D typescript

npm i -D @types/node @types/express @types/dotenv @types/cors @types/helmet @types/mongoose

For Mongo Installation and start Replica 

run-rs -v 4.0.0 --shell

Starting replica set...
Started replica set on "mongodb://localhost:27017,localhost:27018,localhost:27019?replicaSet=rs"
Running mongo shell: /home/gaurav/.nvm/versions/node/v14.17.0/lib/node_modules/run-rs/4.0.0/mongo



Create ENV file 
touch .env

Added below mentioned line in .env file
PORT=8080
MONGO="mongodb://localhost:27017/arriveDb?replicaSet=rs"

Start the project 

npm run dev


