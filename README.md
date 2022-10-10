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

Start the backend service with PostgreSQL and PGAdmin:

```
docker-compose up
```

If no errors appear, you can make the script run in the background by adding 
the -d flag for detached mode:

```
docker-compose -d up
```

## Environment variables

To use environment variables, simply rename the `.env.example` file to `.env`,
then change the following content:

Use a port other than 8000 for the backend service:

```
PORT=<your-port-number-here>
```

Use your own email for PGAdmin login:

```
PGADMIN_DEFAULT_EMAIL=<your-email-here>
```

Use your own password for PGAdmin login:

```
PGADMIN_DEFAULT_PASSWORD=yourpassword
```

## Database migrations

The database is used through an ORM (Object-Relational Mapping) library called 
Prisma. This will make it easier to create database queries, run migrations, 
and switch between different database types.

Create initial database tables and run further migrations:

```
npx prisma migrate dev
```

Populate database with dummy data:

```
npx prisma db seed
```

Reset your database, reapply all migrations, and repopulate it:

```
npx prisma migrate reset
```

If you have updated the schema.prisma file, create a new 
migration with:

```
npx prisma migrate dev
```

## PGAdmin

PGAdmin is a GUI tool for PostgreSQL databases.

Access it by going to:

```
http://localhost:8888
```

Then click "Add New Server" and fill in the following:

```
Name=postgres
Hostname=postgres
Username=testuser
Password=testpasswd
```

Or use your own values from the `.env` file, if applicable

## REST API

The REST API documentation can be found on Swagger UI in:

```
http://localhost:8000/api-docs 
```
