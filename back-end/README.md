# Getting Started with running server

Server(express) runs in port 3000. Client(react) runs in port 4000.

## The back-end of the project will live in `back-end` directory.

## In the `back-end` directory, you can run:

1. `npm install`

cd to `back-end` directory, run `npm install` to install all the dependency in order to launch and run the server.

2. `node server` or `npx nodemon sever` 

It start the server. 

You can also see how back-end server work with front-end react component if you open another terminal in which you can cd to `front-end` directory and run `npm install` and then run `npm start`. It will open [http://localhost:4000](http://localhost:4000) in your browser. If you are not login, it will redirect to [http://localhost:4000/prelogin](http://localhost:4000/prelogin) page. You must login first to use all functionality of our app.

## For unit test, the test script is located in back-end/test firectory

so you need to `cd back-end`, then run `npm test`.
