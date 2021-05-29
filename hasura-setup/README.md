# Hasura setup
Basic Hasura setup with Docker

## Prerequisites
You will need the following software installed in your system in order to run this project

1. __Docker__ ([link](https://www.docker.com/get-started))
2. __Docker Compose__ ([link](https://docs.docker.com/compose/install/))

## Run this setup
To run this project, do the following

1. Open a terminal
2. `cd` into this project directory
3. Run `docker-compose up -d`

This command starts up __Docker__ containers for __Hasura__ and __Postgres__ in _detached_ mode. To start with attached terminal, just remove the `-d` flag, so the command becomes `docker-compose up`

## Hasura Console
__Hasura__ development console is exposed at `http://localhost:8080`. 

Make sure the port `8080` on your system _is not in use by other program_ before running this setup.

## Data persistence
All __Postgres__ data is persisted inside directory `data` (created automatically in _project directory_ by Docker Compose).

What this means is that you can stop and restart the containers without losing your data.

## Stopping the setup
To stop the running setup and clear the resources, do the following

1. Open a terminal
2. `cd` into this project directory
3. Run `docker-compose down`

__Note:__ This does __NOT__ `delete` the persistent data.

## View logs
If you run this setup in _detached_ mode, logs will not be printed to the console. To view logs you have to run the commands

1. Hasura logs

    Run `docker logs -f hasura-setup_hasura_1`
2. Postgres logs

    Run `docker logs -f hasura-setup_postgres_1`

The above commands will fail if the name of the project directory is changed from `hasura-setup` to something else.

For an absolute approach do the following

1. Run `docker container ls`

    This will show you the list of running containers with their `ids`. To view logs of any container just type the following `docker logs -f <container_id>`.

    __Note:__ You need not type in the full length of `<container_id>`. Just type in enough characters from the `<container_id>` to remove any ambiguity between other `ids`