# Alyson v7

Alyson v7 is the updated Frontend for the Genny system.

## Contents
- [Overview](#Overview)
- [Getting Started](#Getting-Started)
- [Layouts](#Layouts)
- [Store](#Store)
- [Docker Images](#Docker-Images)
- [Development](#Development)

## Overview

The Backend sends **Base Entities**, **Question Sets**, and **Links** to the Frontend, then, starting from one root Base Entity, it recursively renders the entire component tree.

Instead of defining each page, and navigating between them to change the display, the Backend only needs to add, remove, or change **Base Entities** or the **Links** between **Base Entities**.

The styling for all Components is defined by the Backend, meaning that the Backend can control the styling and apply changes to as many instances of the system as desired.

## Getting Started

### Web

1. Install JS dependencies

```
npm install
```

2a. Create a `.env` file with the following contents, where `<url>` is the url of the server you are connecting to:

```
ENV_GENNY_BRIDGE_URL=<url>
ENV_GENNY_INIT_URL=<url>
```

2b. If you are changing the contents of an existing `.env` file, then you need to clear the cache.

```
npm run clear-cache:web
```

3. Run the web app

```
npm run start:web
```

## Layouts

The Alyson project uses a recursive layout framework to dynamically build pages with information supplied by the backend.

[Click here to see the documentation for Layouts.](./docs/LAYOUTS_OVERVIEW.md)

## Redux Store

Alyson v7 uses Redux to handle data storage.

[Click here to see the documentation for the Redux Store.](./src/redux/REDUX_STORE.md)

## Docker Images

1. Build the Docker Image. `<tag>` is optional.

```
./build-docker.sh <tag>
```

2. Push the image to Dockerhub. `<tag>` is optional.

```
./push.sh <tag>
```

## Development

### Debugging

There are a few options to help with debugging while the server is in production.

Entering the following line into the javascript console will show all logs after the page is refreshed.

```
localStorage.setItem(‘DISPLAY_LOGS’, true)
```

Adding the following to the url will display the debugging view.

```
/?debug=true
```