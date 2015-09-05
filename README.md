API
===

Nodejs based API server providing REST endpoints to our clients.

Modular architechture ensures maximum code maintainability.

All code is unit tested using Sinon, Mocha.

We try to have more than 97% code coverage for our service layer.

We use GULP for automation and code coverage reports

## Release History

* 0.1 Initial release, API skeleton.

1. Install following before running Gulp tasks

    > sudo npm install -g gulp
    >
    > sudo npm install -g mocha

2. Available Gulp tasks:

   >```gulp test```: Run unit tests with coverage report.
   >
   >
   >```gulp t```: Run unit tests without coverage report.
   >
   > 
   > ```Run tests in a single file ```: mocha schema/todo_test.js --reporter spec
   
