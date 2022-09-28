# Buketti backend

## Getting started

To get the Node server running in http://localhost:8000/:

* Clone this repo `git clone git@gitlab.valtori.fi:vm-private/buketti-backend.git`
* `npm install` to install all required dependencies
* `npm run dev` to start the local server

Other useful commands:

* `npm run lint` to run eslint
* `npm run test` to run tests
* `docker build -t buketti-backend .` to build the docker image
* `docker run --name buketti-backend -p 8000:8000 -d buketti-backend` to run 
  the docker image  

## Docker-compose

Create the directories that are mounted outside containers:

```
mkdir postgresql_data
mkdir pgadmin_data
```

Allow access for all users to the pgadmin_data directory:

```
chmod go+w pgadmin_data
```

To start the backend service with PostgreSQL and PGAdmin

```
docker-compose up
```

If no errors appear, you can make the script run in the background by adding 
the -d flag for detached mode

```
docker-compose -d up
```

## Environment variables

To use environment variables, simply create a file named `.env` in the root 
directory, then add the following content:

To use a port other than 8000 for the backend service

```
PORT=<your-port-number-here>
```

To use your own email for PGAdmin login

```
PGADMIN_DEFAULT_EMAIL=<your-email-here>
```
