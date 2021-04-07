# Getting Started with running server

## The back-end of the project will live in `back-end` directory.

## In the `back-end` directory, you can run:

### `npm install`

In back-end directory, run `npm install` to install all the dependency in order to launch and run the server.

### `node server` or `npx nodemon sever`

It start the server.
You can see response from server if you Open [http://localhost:4000](http://localhost:4000) to view it in the browser.
You can also see how back-end server work with front-end react component if you open another terminal in which you can cd to `front-end` directory and run `npm start`. It will open [http://localhost:3000](http://localhost:3000) in your browser.

## For unit test, the test script is located in front-end/src/test firectory

so you need to `cd front-end/src/test`, then run `npx mocha app.spec.js`.
