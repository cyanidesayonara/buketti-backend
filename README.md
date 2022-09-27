# Buketti backend

## Getting started

To get the Node server running in http://localhost:3000/:

* Clone this repo `git clone git@gitlab.valtori.fi:vm-private/buketti-backend.git`
* `npm install` to install all required dependencies
* `npm run dev` to start the local server

Other useful commands:

* `npm run lint` to run eslint
* `npm run test` to run tests
* `docker build -t buketti-backend .` to build the docker image
* `docker run --name buketti-backend -p 3000:3000 -d buketti-backend` to run the docker image  

To use a port other than 3000, simply create a file named `.env` in the root directory with the following content:

```
PORT=<add-your-port-number-here>
```
