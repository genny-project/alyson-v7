# Creating a Layout: Step by Step

## Overview
To help illustrate all of these concepts, we will go through the process of creating a Layout one step at a time, detailing at each step the following:
- The important fields of the message sent to the Frontend.
- The updated state of the Redux Store.
- The updated wireframe of the app.
- The updated page the of the app.

Before going through these steps, [click here to view the documentation for Layouts](../README.md)

## Walkthrough

### 1. Add the Root Frame.
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

#### Updated Displays
We can see the React Tree has added a **Frame** component, but the page hasn't changed. This is because the `FRM_ROOT` doesn't have any links, so there is no visual change to the page.

![Add the Root Frame](https://i.imgur.com/4BoOiQU.png)

***

### 2. Add the Main Frame.
Now that we have the Root Frame, we need to begin adding the basic structure of the layout. We will add another Frame, Main Frame, which will be used to divide the layout into the Header, Footer, Sidebar, and Content sections.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [],
  "name": "Main Frame",
  ...
}
```
#### Redux Store
```
{
  vertx: {
    baseEntities: {
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  },
  layouts: {
    frames: {
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [],
        name: "Main Frame"
      },
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
There is no change to either the React tree or the page. Even though we have a new Frame in the store, there is no Link between `FRM_ROOT` and `FRM_MAIN`, so there is no visual change to the page.

![Add the Main Frame](https://i.imgur.com/4BoOiQU.png)

***

### 3. Add a Link between the Root Frame and the Main Frame.
To add Main Frame into the React tree, we need to resend the Root Frame Base Entity with a **Link**.

#### Base Entity Message
```
{
  "code": "FRM_ROOT",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_FRAME",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_ROOT",
        "targetCode": "FRM_MAIN",
        "weight": 1
      }
    }
  ],
  "name": "ROOT Frame",
  ...
}
```
#### Redux Store
```
{
  vertx: {
    baseEntities: {
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  },
  layouts: {
    frames: {
      FRM_MAIN: {...}
      FRM_ROOT: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_MAIN",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          }
        ],
        name: "Main Frame"
      }
    }
  }
}
```

#### Updated Displays
Now we can see that even though the page hasn't changed, the React tree has. The top level Frame now has a **Centre Panel**, which has another Frame inside it.

![Add a Link between the Root Frame and the Main Frame](https://i.imgur.com/uD3vXb7.png)
