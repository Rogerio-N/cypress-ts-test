# Cypress Template

![example workflow](https://github.com/Rogerio-N/cypress-ts-test/actions/workflows/main.yaml/badge.svg)  

![Cypress](https://img.shields.io/badge/Cypress-black?style=for-the-badge&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-red?style=for-the-badge&logo=npm&logoColor=white)

This is a template repository. Its purpose is to be used in new projects that uses Cypress with TypeScript.  

### Pre-requisites

- [Node 16](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started/)

### Setup

1 - Start the docker container (this is an unofficial [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) docker image):
```
docker run -d -p 3000:3000 -p 3001:3001 -p 3002:3002 rogerionk/cypress-real-world-app:latest
```

2 - Install project dependencies: 
```
npm install
```

3 - To run tests locally: 
```
npm run start:local
```

3.1 - To open the application, access [http://localhost:3000/signin](http://localhost:3000/signin)


### Setup browserstack (optional)

1 - Create a browserstack account (a free plan is already ok) and go to [profile details](https://www.browserstack.com/accounts/profile/details)

2 - Create the enviroment variable BROWSERSTACK_USERNAME with the username on profile details

3 - Create the environment vairable BROWSERSTACK_ACCESS_KEY with the access key on profile details

4 - To run the test locally and publish the results on browserstack run `npm run start`

