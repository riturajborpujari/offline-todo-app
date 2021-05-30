# Offline Todo App (In Progress)

![Image](https://raw.githubusercontent.com/riturajborpujari/offline-todo-app/master/docs/screenshot.png)

## Can currently handle

1. Offline query caching (persisted across app restarts)
2. Offline mutations (persisted across app restarts)

    Updates performed while the app is offline are cached separately. They are re-run automatically when the app is restarted.

    If network connection has resumed when the app restarts, it syncs the cached mutations with the server.

    Otherwise only the UI is kept consistent.

## Todo

1. Show offline status
1. Allow manual Sync of the updates with a `Sync Now` link
2. Allow updates to sync automatically

## Setup

1. Setup Hasura (`hasura-setup` directory)

    1. Run `docker-compose up`
        
        This will start Hasura with Postgres on local machine
    2. Run `hasura migrate apply`
        
        This will setup Postgres schema.
    3. Run `hasura metadata apply`
        
        This will setup Hasura metadata.

2. Run the React app (`app` directory)

    1. Run `yarn install`
    2. Run `yarn start`
    3. If you want the app to load offline, the build the app using `yarn build`.

        The _service worker_ runs only for built production app. After building you can start a static server in `app/build` directory