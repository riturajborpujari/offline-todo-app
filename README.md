# Offline Todo App (In Progress)


## Can currently handle

1. Offline query caching
2. Mutations can run if Network connectivity goes down.

    __Note__: The app does not sync mutations if the app is closed. This is what I'm working on now

## Setup

1. Setup Hasura

    1. Run `docker-compose up` in `hasura-setup` directory. This will start Hasura with Postgres on local machine
    2. Run `hasura migrate apply` in `hasura-setup/migrate` directory. This will setup Postgres schema.
    3. RUn `hasura metadata apply` in `hasura-setup/migrate` directory. This will setup Hasura metadata.
2. Run the React app

    1. Go to `app` directory by running `cd app`
    2. Run `yarn install`
    3. Run `yarn start`
    4. If you want the app to load offline, the build the app using `yarn build`.

        The _service worker_ runs only for built production app. After building you can start a static server in `app/build` directory