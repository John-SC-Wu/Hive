# Hive API
### What is it?
Requests >　RESTful API > Server > Controller > DB
Aiming at building a hub to manage different agents.

### Quick Start
```sh
# run the redis cache
docker-compose up redis -d # run in background
# run the app 
npm run start
```

### memo 
1. start to run dev env.
```sh 
$docker run -it -p 3008:3008 -v $(pwd):/app hive_test_1
```