# Redux Store

The redux store.

## Contents
- [Overview](#Overview)
- [keycloak](#keycloak)
- [router](#router)
- [session](#session)
- [vertx](#vertx)
- [_persist](#_persist)

## Overview

The top levels of the redux store.

```
keycloak: {…},
router: {…},
session: {…},
vertx: {…},
_persist: {…}
```

## keycloak

This section of the store is where the information related to keycloak is located.

accessToken. the current token
data. the keycloak config. Contains all the different urls and endpoints send by the backend
error, fetched, fetching. current state

```
accessToken: "abcdefg..."
data: {…}
error: null
fetched: true
fetching: false
```

## router
xxx

location:


```
location: {…}
```

## session
xxx

## vertx
xxx

## _persist
xxx