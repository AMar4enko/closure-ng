Gulp, AngularJS, Closure Compiler, libsass, jade
================================

Frontend workflow automation tool for AngularJS developers  
Based on [this article](http://www.mircozeiss.com/a-radical-new-approach-to-developing-angularjs-apps)  

Features:  
- incremental building with livereload in development mode  
- CC-powered AngularJS workflow out-of-the-box  
- Closure Compiler minification with advanced optimizations, automatic angularjs annotating and optional source maps  
- multiple environments support (see build.json, src/env)  
- automated bower dependencies management and index.html updates
- blazing fast SCSS builds via libsass (and third-party sass frameworks support)  


Three simple steps for you to start:  
- clone it  
- ```npm install && bower install```  
- ```gulp```  
this will perform development build into _build/development_ dir and start web server on localhost:5000  

Now you can open http://localhost:5000/build/development/index.html in your browser and start playing with sources.

To create compiled version run   
```gulp build --type staging```  
or  
```gulp build --type production```  

Build types definitions can be found in build.json

TODO:  
- Tests runners
