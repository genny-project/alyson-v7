# Creating a Layout: Step by Step

## Overview
To help illustrate all of these concepts, we will go through the process of creating a Layout one step at a time, detailing at each step the following:
- The important fields of the message sent to the Frontend.
- The updated state of the Redux Store.
- The updated wireframe of the app.
- The updated page the of the app.

Before going through these steps, [click here to view the documentation for Layouts](../README.md)

## Walkthrough

### Add the Root Frame.
First, we need to add the first Frame, `FRM_ROOT`. This is the default **Frame** the Frontend is looking for to begin constructing the element tree.

#### Base Entity Message
```
{
  "code": "FRM_ROOT",
  "links": [],
  "name": "Root Frame",
  ...
}
```
#### Redux Store
```
{
  vertx: {
    baseEntities: {
      FRM_ROOT: {...}
    }
  },
  layouts: {
    frames: {
      FRM_ROOT: {
        code: "FRM_ROOT",
        links: [],
        name: "Root Frame"
      }
    }
  }
}
```

#### Result
![Add the Root Frame](https://i.imgur.com/4BoOiQU.png)
