# Instruction on Build

In this project,

-   back-end is written in express.js and lives in `back-end` directory.
-   front-end is written in react.js and lives in `front-end` directory.

clone this repository

    git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git

cd to cloned directory

    cd project-setup-team-ikedacho-visionary

## Production mode

When env.NODE_ENV is equal to PRODUCTION:

-   server will server static files in `front-end/build`

cd to back-end direcroty

    cd back-end

add an `.env` file in back-end directory

    touch .env

add `NODE_ENV=PRODUCTION` in .env file

save the file

cd to `front-end` directory

    cd ../front-end

install all the dependency in front-end

    npm install

build react app

    npm run build

cd to `back-end'

    cd ../back-end

install all the dependency in order to launch and run the server.

    npm install

start server

    npm start server

Then open a browser and go to [http://localhost:3000](http://localhost:3000) to see our project locally.

If you are not login, it will redirect to [http://localhost:3000/prelogin](http://localhost:3000/prelogin) page.

You must login first to use all functionality of our app.

## When app is in development mode

When `env.NODE_ENV` is not equal to `PRODUCTION` or if `env.NODE_ENV` does not exist:

-   Server(express app) runs in port 3000.
-   Client(react app) runs in port 4000.

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

## Instruction on Test

For unit test, the test script is located in back-end/test firectory

so you need to go to `back-end` directory

then run `npm test`.
