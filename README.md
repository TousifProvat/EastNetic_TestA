# Product inventory app -> Inventro

Inventro is a minimalistic product inventory system.

Inventro is built with:

- [Docker](https://www.docker.com/)
- [Postgres SQL database](https://www.postgresql.org/)
- [Hasura GraphQL server](https://hasura.io/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Apollo GraphQL client](https://www.apollographql.com/docs/react/)
- [Ant Design UI library](https://ant.design/)

## Run the application

1. First start the docker and run this command to start postgres & hasura:

```sh
docker compose up
```

2. After running the docker successfully, run the following command to install dependencies

```sh
 npm i

 or

 yarn
```

3. After successfully installing dependencies, run the following command to start frontend server:

```sh
npm start

or

yarn start
```

Then open http://localhost:3000/ in your browser.

Hasura serves a grapql endpoint with schema auto generated from Postgres schema. It is available at http://localhost:8080/v1/graphql. Frontend should interact with the database only through this endpoint.

Hasura console is available at http://localhost:8080/console.

To add migrations for new database tables, you would have to run Hasura console locally using [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/).
