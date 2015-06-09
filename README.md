# pingpong 

[![Generated with](https://img.shields.io/badge/generated%20with-bangular-blue.svg?style=flat-square)](https://github.com/42Zavattas/generator-bangular)

A MEAN stack example that tracks ping pong players and games and incorporates the IoT.  Project and stubs generated by bangular.

## Setup

Requires Node, NPM, Bower.  After installing Node and NPM for your platform flavor, run:

```
    #install project dependencies
    npm install
    
    #install bower globally
    npm install -g bower
    
    #install bower dependencies
    bower install
```

Requires Mongo DB.  Either install Mongo locally or perhaps setup a free mongolabs.com account.

Optionally uses Particle and Tessel tools.  See below.

## Configuration and Startup

* Generate a password hash using a password and a salt derived from the ```player.rfid``` field.

```
    #setup node to be able to call this project's nodejs scripts from the command line.
    npm link
    
    #hash a password manually.  See hashit.js
    hashit abc123 abc123
```

* Start Mongo and insert one player using mongo CLI.  Mongo DB must be started before the Express server is started.

```
    #start mongo CLI
    mongo
```

  Player hash is the value generated by running the ```hashit``` command.
    
```    
    db.runCommand({
      insert: "players",
      documents: [
        { 
          rfid: "abc123", 
          name: "admin", 
          hash: "mvF7SXnDmhoCJMvXwWx4/tLLBLVI4D3HCnMZrGrMcxMVZw0c1+GAGhywYC7j/DURfNpjwVRwz+B2Ebho4kDOUE57BEC0ij1D87qt1ziVtXeZQYWzwwLkzA5s/ELEo9PL8m4hzXU14Dv7/P7kj+dTDEet0083optZ3yy0Olhkxdc=",
          firstName: "admin", 
          lastName: "admin", 
          avatar: "", 
          admin: true 
        }
      ]
    });
```

* Configure project to point to the mongo instance by editing the appropriate  ```server/config/environment/*.js``` configuration file.  By default it uses development.js.
* Run the Node Express server by invoking ```node server/server.js``` or for development you can call ```gulp serve```.

## Development

Gulp is used to drive the development tasks.  It should be installed locally by virtue of ```npm install```.  You could also install Gulp globally.

```
    npm install -g gulp
```

Run ```gulp help``` to see task list.

```
    Main Tasks
    ------------------------------
        build
        bump
        control
        cssmin
        default
        e2e
        help
        inject
        preview
        replace
        rev
        sass
        scripts
        serve
        test
        usemin
        version
        watch
    
    Sub Tasks
    ------------------------------
        clean:dist
        clean:finish
        copy:dist
        e2e:update
```

Run ```gulp serve``` or just ```gulp``` to run the server with a watch and livereload.  There are currently issues with livereload and https.


## Other Notes

### mongodb - manual install

NoSQL DB.  Used a free account on mongolab.com for development.

* http://www.mongodb.org/downloads
* http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x
* http://docs.mongodb.org/manual/administration/production-notes/
* http://docs.mongodb.org/manual/core/

### yo and yo generators

Used bangular to generate project and stubs.

```
    # Install Yeoman globally
    npm install -g yo
    
    #Install the Bangular generator globally
    npm install -g generator-bangular
    
    #To generate a project from scratch.
    yo bangular
```

bangular yo generator https://github.com/42Zavattas/generator-bangular

maybe try https://github.com/Swiip/generator-gulp-angular for Traceur.


### Particle (formerly Spark)

Libraries and hardware to control the Particle Core scoreboard.

* https://www.particle.io/resources
* http://docs.particle.io/core/javascript/
* http://docs.particle.io/core/connect/#connecting-your-device-using-osx
* http://docs.particle.io/core/cli/
* http://docs.particle.io/core/examples/


```
    # Install Node module
    npm install spark --save
    
    # Install CLI
    npm install particle-cli -g
    
    # (Optional) To install client javascript
    bower install spark
```

Setting up scoreboard

* Make sure your device is connected and in listening mode first (blinking blue). If not already in listening mode, hold mode button for 3 seconds to put the Core into listening mode.
* Claim the Particle Core
* Setup the WiFi Connection

```
    particle setup wifi
   
    # Alternatively over serial connection.
    particle serial wifi
```    
    
* Flash the Core by entering the code pingpongscorekeeper.ino into Particles web based IDE at https://build.particle.io and clicking the Flash button.

* Setup a token and update /server/config/environment/*.js with the token value.
 
```
    $ particle token
    NAME:
    particle token
    
    DOES: 
        tools to manage access tokens (require username/password)
    
        particle token list   - List all access tokens for your account
        particle token revoke - Revoke an access token
        particle token new    - Create a new access token
    
    
    $ particle token list
    
    ...
    
    $ particle token new
    ? Please re-enter your password: ************
    New access token expires on Sun June 06 2015 07:12:38 GMT-0500 (CDT)
        e69045b231eb84e230c24d18e68100296dcab03a
```


### Tessel

Coming soon...


### Other API docs

* http://expressjs.com/4x/api.html
* https://github.com/expressjs/session
* https://nodejs.org/api/crypto.html
* https://docs.angularjs.org/api/ng/type/form.FormController
