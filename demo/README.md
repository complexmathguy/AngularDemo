# realMethods

This Angular/MongoDB (not AngularJS) project was generated with realMethods version 1.1.

The Angular technology stack package it was generated from has been tested with Angular version 7.2.0.


The following instructions assume NPM is installed.  If not, you can download it by installing Node.js at
[Node.js Download Page](https://nodejs.org/en/download/)


The realMethods Angular technology stack was developed and tested for Angular 7.

If you have an older version of Angular, you should consider un-installing it in favor of Angular v7:

`npm uninstall -g @angular/cli`
`npm cache verify`

To install Angular, issue the following:

`npm install -g @angular/cli`

Verify the installation with `ng --version`


**Note: It is important to use this name because the next step expects this name.**

`ng new demo --defaults`

The default application files and packages will be installed.  The next steps will copy the generated files, overwrite some of the default files and install 
the remaining packages.


Either pull the generated files from your Git repository, 
or download the generated application archive file and unzip into the parent directory of the **demo** directory
in order to overlay the generated files into it. If asked to replace existing files, answer _Yes_.


Change to the **demo** directory and install the remaining required packages:

`npm run setup`



It is assumed MongoDB is running at:

`mongodb://localhost:27017/demo`

See file ./config/mongoDb.js to make changes to the database location.


The application leverages Mongoose to assist in persisting data to MongoDB.

From the demo directory, start mongoose:

`node server.js`

If it runs successfully, mongoose is listening on port 4000.


You now have a fully functional application to use, test, and build out.

To run the dev server:

`ng serve`

Using your browser, navigate to: 

`http://localhost:4200/`. 

The app will automatically reload if you change any of the source files.


Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Learn more at [Angular Build](https://angular.io/cli/build/)


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
