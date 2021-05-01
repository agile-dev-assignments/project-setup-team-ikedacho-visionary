# Getting Started with running server

## The back-end of the project will live in `back-end` directory.

## In the `back-end` directory, you can run:

## When app in development mode

When `env.NODE_ENV` is not equal to `PRODUCTION` or if `env.NODE_ENV` does not exist: Server(express app) runs in port 3000. Client(react app) runs in port 4000.

### start server written in express.js in back-end folder

cd to `back-end` directory

    cd back-end

install all the dependency in order to launch and run the server.

    npm install

start the server.

    node server or npx nodemon sever or npm start

### Then start front-end react app in front-end folder:

    open another terminal

In the new terminal, cd to `front-end` directory

    cd ../front-end

install all the dependency in order to launch and run the react app.

    npm install

start the react app.

    npm start

It will open [http://localhost:4000](http://localhost:4000) in your browser.

If you are not login, it will redirect to [http://localhost:4000/prelogin](http://localhost:4000/prelogin) page.

You must login first to use all functionality of our app.

## When app in production mode

When env.NODE_ENV is equal to PRODUCTION: server.js will server static files in `front-end/build`

If you are not in `front-end` directory, cd to `front-end`

build react app

    npm run build

cd to `back-end'

    cd ../back-end

install all the dependency in order to launch and run the server.

    npm install

start server

    npm start server

Then you can open an browser and go to [http://localhost:3000](http://localhost:3000)

## For unit test, the test script is located in back-end/test firectory

so you need to `cd back-end`, then run `npm test`.
