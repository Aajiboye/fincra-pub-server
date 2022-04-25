# fincra-pub-server

This service handles subscriptions to topic and publishing to topic. It implements a queue in processing message publishing to subscribed server.


# Tech Stack

 - nestjs
 - mongodb
 - redis bull (queue)

# Architecture and design pattern

 Hexagonal architecture and repository pattern graciously used.


# Installation

-   Ensure nodejs is installed on your system or check out this blog to install:  [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- using npm install nestjs globally on your local machine. You can see [nest official docs here](https://docs.nestjs.com/first-steps)
- clone this repo
- run npm install to install all project dependencies.

## Environment Variables

The environment variable sample is found in **env.sample** file at the root directory of this project. 
Create a .env file in the project root directory where the project environment variables will be stored.

## Setting up redis

This repository contains code that implements a queueing system and nestjs supports redis bull under the hood, however, this requires that redis server is running on your machine or you connect to a remote instance of the redis server on a remote host. 
You can set up redis on your local machine via docker by [following the steps here](https://collabnix.com/how-to-setup-and-run-redis-in-a-docker-container/)

Once redis is set up you can go to your .env file. I used the default localhost settings for test. 

    // REDIS BULL
    REDIS_HOST=localhost
    REDIS_PORT=6379
    

## Setting up mongodb

You can start a docker image of mongodb as well or install mongodb on your local machine or connect to a remote instance of mongodb (eg mongodb atlass). Once you are set up you can use the connection string to connect the app to mongodb. Here is an example of my test db

    DATABASE_URL='mongodb://localhost/fincra'



## App Port

You can have the app listen to any available and non-restricted port on your local environment. I listened on 8000.

    HTTP_PORT=8000

## Run test

Without using postman, once all of the above is set, you can simply run test suite to see the behaviour of app. See script below

    npm run test

If everything is configured properly test should pass and if the [subscriber server](https://github.com/Aajiboye/fincra-sub-server) is ready to receive connections you should have the test payloads logged in the console of the subscriber server.

# Folder Structure

This repository has a folder structure that conforms to the hexagonal design pattern followed. 
## Common Module
Contains all general purpose utils for the app
## Publisher Module
Contains logic to publish to a topic.
## Subscriber Module
Contains logic to subscribe to a topic and manages the queue service as well.

Note that there are unit tests in all of the services to test the service bit.

## Thought Process

### Requirement
The project requires that urls and topics can be subscribed to to receive logs of published messages to the topic at the subscribed url.

### Assumptions

 - No duplicate subscriptions to the same topic for the same url.

### Implementation

 - Subscription entries are persisted in db
 - On publish to topic, db is queried to get data of all subscribers to the topic and schedule them to a queue to send an http request to the subscriber server.
 
 ### Result

 The subscriber server received the http request and logs the payload published to the topic.
 
 ### Improvements

Handle edge cases as follows

 - subscriber server is down
 - queue server is down

 ### Requirements uncovered

 Deployment to host

Thanks!