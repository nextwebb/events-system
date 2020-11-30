# Simple GO Lang REST API

> Simple RESTful API implementation for a pub / sub system using HTTP requests

## Quick Start


``` bash
# Install app dependencies
npm i --save
```

``` bash
npm start

```

## Endpoints

### Setting up a subscription
``` bash
 POST /subscribe/{TOPIC}
 BODY { "message": "hello"}
```
### Publishing an event
``` bash
POST /publish/{TOPIC}
BODY { "message": "hello"}
```

### Get all events
The /event endpoint is just used to print the data and verify everything is working.

``` bash
GET /event
```


# Request sample

[API Doc](https://documenter.getpostman.com/view/6711768/TVmJiK8c)
