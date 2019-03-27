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
  "name": "Root Frame"
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
  "name": "Main Frame"
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
  "name": "ROOT Frame"
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
        code: "FRM_ROOT",
        links: [
          {
            code: "FRM_MAIN",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          }
        ],
        name: "Root Frame"
      }
    }
  }
}
```

#### Updated Displays
Now we can see that even though the page hasn't changed, the React tree has. The top level Frame now has a **Centre Panel**, which has another Frame inside it.

![Add a Link between the Root Frame and the Main Frame](https://i.imgur.com/uD3vXb7.png)

***

### 4. Add the Content Frame.
Now we want to add the Frame where the main Content of each page of the app will be displayed. `FRM_CONTENT` is the default name that should be used for this Frame. We will also send `FRM_MAIN` with a Link to the Content Frame.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_FRAME",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_MAIN",
        "targetCode": "FRM_CONTENT",
        "weight": 1
      }
    }
  ],
  "name": "Main Frame"
},
{
  "code": "FRM_CONTENT",
  "links": [],
  "name": "Content Frame"
}
```
#### Redux Store
```
{
  vertx: {
    baseEntities: {
      FRM_CONTENT: {...},
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  },
  layouts: {
    frames: {
      FRM_CONTENT: {
        code: "FRM_CONTENT",
        links: [],
        name: "Content Frame"
      },
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_CONTENT",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          }
        ],
        name: "Main Frame"
      }
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
Again the React tree has updated, the Main Frame has a Centre Panel, and that Panel has another Frame.

![Add the Content Frame](https://i.imgur.com/u2jHB1Q.png)

***

### 4. Add a Question Set.
Now we want to display something in the Content Frame. Let's send a simple Question Set that can show the User's name.

#### Ask Message
```
{
  "sourceCode": "PER_USER1",
  "targetCode": "PER_USER1",
  "questionCode": "QUE_USER_DETAILS_GRP",
  "name": "User Details",
  "childAsks": [
    {
      "question": {
        "attribute": {
          "dataType": {
            "className": "Text",
            "typeName": "Text",
            {...}
          },
          "code": "PRI_FIRSTNAME",
          "name": "FirstName"
        },
        "attributeCode": "PRI_FIRSTNAME",
        "code": "QUE_FIRSTNAME",
        "name": "User First Name"
      },
      "sourceCode": "PER_USER1",
      "targetCode": "PER_USER1",
      "questionCode": "QUE_FIRSTNAME",
      "attributeCode": "PRI_FIRSTNAME",
      "readonly": true,
      "name": "User First Name"
    }
  ]
}
```
#### Redux Store
```
{
  vertx: {
    ask: {
      QUE_USER_DETAILS_GRP: {
        sourceCode: "PER_USER1",
        targetCode: "PER_USER1",
        questionCode: "QUE_USER_DETAILS_GRP",
        name: "User Details",
        childAsks: [
          {
            question: {
              attribute: {
                dataType: {
                  "className": "Text",
                  "typeName": "Text",
                  {...}
                },
                code: "PRI_FIRSTNAME",
                name: "FirstName"
              },
              attributeCode: "PRI_FIRSTNAME",
              code: "QUE_FIRSTNAME",
              name: "User First Name"
            },
            sourceCode: "PER_USER1",
            targetCode: "PER_USER1",
            questionCode: "QUE_FIRSTNAME",
            attributeCode: "PRI_FIRSTNAME",
            readonly: true,
            name: "User First Name"
          }
        ]
      }
    }
    baseEntities: {...}
  },
  layouts: {
    asks: {
      QUE_USER_DETAILS_GRP: {
        code: "QUE_USER_DETAILS_GRP",
        name: "User Details"
      },
      QUE_FIRSTNAME: {
        code: "QUE_FIRSTNAME",
        name: "User First Name"
      }
    },
    frames: {...}
  }
}
```

#### Updated Displays
No change to the React tree or the page this time. We need to add a Link between the Content Frame and the Question Set.

![Add a Question Set](https://i.imgur.com/u2jHB1Q.png)
