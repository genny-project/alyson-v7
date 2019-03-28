# Creating a Layout: Step by Step

## Contents
- [Overview](#Overview)
- [React Element Tree Legend](#React-Element-Tree-Legend)
- [Walkthrough](#Walkthrough)
  - [Step 1 - Add the Root Frame](#step-1---add-the-root-frame)
  - [Step 2 - Add the Main Frame](#step-2---add-the-main-frame)
  - [Step 3 - Add a Link between the Root Frame and the Main Frame](#step-3---add-a-link-between-the-root-frame-and-the-main-frame)
  - [Step 4 - Add the Content Frame](#step-4---add-the-content-frame)
  - [Step 5 - Add a User Details Question Set](#step-5---add-a-user-details-question-set)
  - [Step 6 - Link the User Details Question Set to the Content Frame](#step-6---link-the-user-details-question-set-to-the-content-frame)
  - [Step 7 - Add a Background Color to the Page](#step-7---add-a-background-color-to-the-page)
  - [Step 8 - Add a Header Frame](#step-8---add-a-header-frame)
  - [Step 9 - Add a Question Set to Header Frame](#step-9---add-a-question-set-to-header-frame)
  - [Step 10 - Change Link Value Between Header Frame and Question Set](#step-10---change-link-value-between-header-frame-and-question-set)
  - [Step 11 - Add Footer With Powered By Question Set ](#step-11---add-footer-with-powered-by-question-set)
  - [Step 12 - Add a Background Color to the Content Area ](#step-12---add-a-background-color-to-the-content-area)
  - [Step 13 - Add Sidebar With Project Logo Question Set  ](#step-13---add-sidebar-with-project-logo-question-set)
- [Summary](#Summary)
  
## Overview
To help illustrate all of these concepts, we will go through the process of creating a Layout one step at a time, detailing at each step the following:
- The important fields of the message sent to the Frontend.
- The updated state of the Redux Store.
- The updated wireframe of the app.
- The updated page the of the app.

Before going through these steps, [click here to view the documentation for Layouts](../README.md)

## React Element Tree Legend

![React Element Tree Legend](https://i.imgur.com/JKNa2ab.png)

## Walkthrough

### Step 1 - Add the Root Frame
[back to top](#creating-a-layout-step-by-step)

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

### Step 2 - Add the Main Frame
[back to top](#creating-a-layout-step-by-step)

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

### Step 3 - Add a Link between the Root Frame and the Main Frame
[back to top](#creating-a-layout-step-by-step)

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

### Step 4 - Add the Content Frame
[back to top](#creating-a-layout-step-by-step)

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
      },
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
Again the React tree has updated, the Main Frame has a Centre Panel, and that Panel has another Frame.

![Add the Content Frame](https://i.imgur.com/u2jHB1Q.png)

***

### Step 5 - Add a User Details Question Set
[back to top](#creating-a-layout-step-by-step)

Now we want to display something in the Content Frame. Let's send a simple Question Set that can show the User's First Name.

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
    },
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

***

### Step 6 - Link the User Details Question Set to the Content Frame
[back to top](#creating-a-layout-step-by-step)

We need to send the Content Frame again with a Link to the User Details Question Set.

#### Base Entity Message
```
{
  "code": "FRM_CONTENT",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_ASK",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_CONTENT",
        "targetCode": "QUE_USER_DETAILS_GRP",
        "weight": 1
      }
    }
  ],
  "name": "Content Frame"
}
```
#### Redux Store
```
{
  vertx: {
    asks: {...},
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
        links: [
          {
            code: "QUE_USER_DETAILS_GRP",
            panel: "CENTRE",
            type: "ask",
            weight: 1
          }
        ],
        name: "Content Frame"
      },
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
Now we can see that the Content Frame has a Centre Panel, and it has a Form as it's child. We can also see the actual page has updated, and is displaying the User's first name in the centre of the screen.

![Link the User Details Question Set to the Content Frame](https://i.imgur.com/RhGCxW3.png)

***

### Step 7 - Add a Background Color to the Page
[back to top](#creating-a-layout-step-by-step)

Let's create a Theme to add a red background to the page, and link it to the Root Frame so it's passed to all elements in the tree.

#### Base Entity Message
```
{
  "code": "FRM_ROOT",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_THEME",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_ROOT",
        "targetCode": "THM_BACKGROUND_RED",
        "weight": 1
      }
    }
  ],
  "name": "Root Frame"
},
{
  "code": "THM_BACKGROUND_RED",
  "name": "Theme Background Red",
  "baseEntityAttributes": [
    {
      "attributeCode": "PRI_CONTENT",
      "attributeName": "Content",
      "baseEntityCode": "THM_BACKGROUND_RED",
      "value": {
        "backgroundColor": "#b70e0e"
      }
    }
  ]
}
```
#### Redux Store
```
{
  vertx: {
    asks: {...},
    baseEntities: {
      FRM_CONTENT: {...},
      FRM_MAIN: {...},
      FRM_ROOT: {...},
      THM_BACKGROUND_RED: {...}
    }
  },
  layouts: {
    frames: {
      FRM_CONTENT: {...},
      FRM_MAIN: {...},
      FRM_ROOT: {
        code: "FRM_ROOT",
        links: [
          {
            code: "FRM_MAIN",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          },
          {
            code: "THM_BACKGROUND_RED",
            panel: "CENTRE",
            type: "theme",
            weight: 1
          }
        ],
        name: "Root Frame"
      }
    },
    themes: {
      THM_BACKGROUND_RED: {
        code: "THM_BACKGROUND_RED",
        data: {
          backgroundColor: "#b70e0e"
        },
        name: "Theme Background Red"
      }
    }
  }
}
```

#### Updated Displays
Since there are no new Frames or Question Sets, there is no change to the elements rendered in the React tree. The page of the app has been updated with the new background color.

![Add a Background Color to the Page](https://i.imgur.com/NMWwJ8a.png)

***

### Step 8 - Add a Header Frame
[back to top](#creating-a-layout-step-by-step)

Now we want to add a Header to the page. Let's send the Header Frame, and the Main Frame with a Link to the Header Frame. Since we want the Header to be at the top of the page, make sure the Link value is `North`.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_FRAME",
        "linkValue": "NORTH",
        "sourceCode": "FRM_MAIN",
        "targetCode": "FRM_HEADER",
        "weight": 1
      }
    }
  ],
  "name": "Main Frame"
},
{
  "code": "FRM_HEADER",
  "links": [],
  "name": "Header Frame"
}
```
#### Redux Store
```
{
  vertx: {
    asks: {...},
    baseEntities: {
      FRM_CONTENT: {...},
      FRM_HEADER: {...},
      FRM_MAIN: {...},
      FRM_ROOT: {...},
      THM_BACKGROUND_RED: {...}
    }
  },
  layouts: {
    frames: {
      FRM_CONTENT: {...},
      FRM_HEADER: {
        code: "FRM_HEADER",
        links: [],
        name: "Header Frame"
      },
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_CONTENT",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_HEADER",
            panel: "NORTH",
            type: "frame",
            weight: 1
          }
        ],
        name: "Main Frame"
      },
      FRM_ROOT: {...}
    },
    themes: {
      THM_BACKGROUND_RED: {
        code: "THM_BACKGROUND_RED",
        data: {
          backgroundColor: "#b70e0e"
        },
        name: "Theme Background Red"
      }
    }
  }
}
```

#### Updated Displays
There is no change to the page, but we can see the Main Frame now has both a Centre Panel and a North Panel. The North Panel also has the Header Frame.

![Add a Header Frame](https://i.imgur.com/yt7urqp.png)

***

### Step 9 - Add a Question Set to Header Frame
[back to top](#creating-a-layout-step-by-step)

Now we want to display something in the Header Frame. Let's send a simple Question Set that can show the Project Name. We will also send the Header Frame again with a Link to the Question Set.

#### Ask Message
```
{
  "sourceCode": "PER_USER1",
  "targetCode": "PRJ_PROJECT1",
  "questionCode": "QUE_PROJECT_HEADER_GRP",
  "name": "Project Header",
  "childAsks": [
    {
      "question": {
        "attribute": {
          "dataType": {
            "className": "Text",
            "typeName": "Text",
            {...}
          },
          "code": "PRI_NAME",
          "name": "Name"
        },
        "attributeCode": "PRI_NAME",
        "code": "QUE_NAME",
        "name": "Project Name"
      },
      "sourceCode": "PER_USER1",
      "targetCode": "PRJ_PROJECT1",
      "questionCode": "QUE_NAME",
      "attributeCode": "PRI_NAME",
      "readonly": true,
      "name": "Project Name"
    }
  ]
}
```
#### Base Entity Message
```
{
  "code": "FRM_HEADER",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_ASK",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_HEADER",
        "targetCode": "QUE_PROJECT_HEADER_GRP",
        "weight": 1
      }
    }
  ],
  "name": "Header Frame"
}
```
#### Redux Store
```
{
  vertx: {
    ask: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_PROJECT_HEADER_GRP: {
        "sourceCode": "PER_USER1",
        "targetCode": "PRJ_PROJECT1",
        "questionCode": "QUE_PROJECT_HEADER_GRP",
        "name": "Project Header",
        "childAsks": [
          {
            "question": {
              "attribute": {
                "dataType": {
                  "className": "Text",
                  "typeName": "Text",
                  {...}
                },
                "code": "PRI_NAME",
                "name": "Name"
              },
              "attributeCode": "PRI_NAME",
              "code": "QUE_NAME",
              "name": "Project Name"
            },
            "sourceCode": "PER_USER1",
            "targetCode": "PRJ_PROJECT1",
            "questionCode": "QUE_NAME",
            "attributeCode": "PRI_NAME",
            "readonly": true,
            "name": "Project Name"
          }
        ]
      }
    },
    baseEntities: {...}
  },
  layouts: {
    asks: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_FIRSTNAME: {...},
      QUE_PROJECT_HEADER_GRP: {
        code: "QUE_PROJECT_HEADER_GRP",
        name: "Project Header"
      },
      QUE_NAME: {
        code: "QUE_NAME",
        name: "Project Name"
      }
    },
    frames: {
      FRM_CONTENT: {...},
      FRM_HEADER: {
        code: "FRM_HEADER",
        links: [
          {
            code: "QUE_PROJECT_HEADER_GRP",
            panel: "CENTRE",
            type: "ask",
            weight: 1
          }
        ],
        name: "Header Frame"
      },
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
Both the React tree and page have updated. The Header Frame now has a Centre Panel, which contains a Form. The page has rendered the Project Name at the centre of the top of the page.

![Add a Question Set to Header Frame](https://i.imgur.com/qcMooYL.png)

***

### Step 10 - Change Link Value Between Header Frame and Question Set
[back to top](#creating-a-layout-step-by-step)

This is looking better, but we want to move the Project Name so it is positioned in the *top left* corner. So we need to send the Header Frame again with the value of the link to the Question Set changed to `WEST`.

#### Base Entity Message
```
{
  "code": "FRM_HEADER",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_ASK",
        "linkValue": "WEST",
        "sourceCode": "FRM_HEADER",
        "targetCode": "QUE_PROJECT_HEADER_GRP",
        "weight": 1
      }
    }
  ],
  "name": "Header Frame"
}
```
#### Redux Store
```
{
  vertx: {
    ask: {...},
    baseEntities: {...}
  },
  layouts: {
    asks: {...},
    frames: {
      FRM_CONTENT: {...},
      FRM_HEADER: {
        code: "FRM_HEADER",
        links: [
          {
            code: "QUE_PROJECT_HEADER_GRP",
            panel: "WEST",
            type: "ask",
            weight: 1
          }
        ],
        name: "Header Frame"
      },
      FRM_MAIN: {...},
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
We can see what affect changing the Link value has had on the display. In the React tree, the Header Frame is now rendering a West Panel instead of a Centre Panel. For the page, the Project Name has been pushed over to the left side of the screen.

![Change Link Value Between Header Frame and Question Set](https://i.imgur.com/Kicm4mY.png)

***

### Step 11 - Add Footer With Powered By Question Set 
[back to top](#creating-a-layout-step-by-step)

Now we want to do that same thing again, and show the Project's `Powered By` tagline. It should be displayed in the bottom right corner. So we need to do a few things. First, send the Main Frame with a Link to Footer Frame with value `SOUTH`. Next, send the Footer Frame with a Link to the Question Set with value `EAST`. Finally, send the Question Set.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_FRAME",
        "linkValue": "SOUTH",
        "sourceCode": "FRM_MAIN",
        "targetCode": "FRM_FOOTER",
        "weight": 1
      }
    }
  ],
  "name": "Main Frame"
},
{
  "code": "FRM_FOOTER",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_ASK",
        "linkValue": "EAST",
        "sourceCode": "FRM_FOOTER",
        "targetCode": "QUE_PROJECT_FOOTER_GRP",
        "weight": 1
      }
    }
  ],
  "name": "Footer Frame"
}
```

#### Ask Message
```
{
  "sourceCode": "PER_USER1",
  "targetCode": "PRJ_PROJECT1",
  "questionCode": "QUE_PROJECT_FOOTER_GRP",
  "name": "Project Footer",
  "childAsks": [
    {
      "question": {
        "attribute": {
          "dataType": {
            "className": "Text",
            "typeName": "Text",
            {...}
          },
          "code": "PRI_POWERED_BY",
          "name": "Powered By"
        },
        "attributeCode": "PRI_POWERED_BY",
        "code": "QUE_POWERED_BY",
        "name": "Project Powered By"
      },
      "sourceCode": "PER_USER1",
      "targetCode": "PRJ_PROJECT1",
      "questionCode": "QUE_POWERED_BY",
      "attributeCode": "PRI_POWERED_BY",
      "readonly": true,
      "name": "Project Powered By"
    }
  ]
}
```
#### Redux Store
```
{
  vertx: {
    asks: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_PROJECT_HEADER_GRP: {...},
      QUE_PROJECT_FOOTER_GRP: {
        "sourceCode": "PER_USER1",
        "targetCode": "PRJ_PROJECT1",
        "questionCode": "QUE_PROJECT_FOOTER_GRP",
        "name": "Project Footer",
        "childAsks": [
          {
            "question": {
              "attribute": {
                "dataType": {
                  "className": "Text",
                  "typeName": "Text",
                  {...}
                },
                "code": "PRI_POWERED_BY",
                "name": "Powered By"
              },
              "attributeCode": "PRI_POWERED_BY",
              "code": "QUE_POWERED_BY",
              "name": "Project Powered By"
            },
            "sourceCode": "PER_USER1",
            "targetCode": "PRJ_PROJECT1",
            "questionCode": "QUE_POWERED_BY",
            "attributeCode": "PRI_POWERED_BY",
            "readonly": true,
            "name": "Project Powered By"
          }
        ]
      }
    },
    baseEntities: {...}
  },
  layouts: {
    asks: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_FIRSTNAME: {...},
      QUE_PROJECT_HEADER_GRP: {...},
      QUE_NAME: {...},
      QUE_PROJECT_FOOTER_GRP: {
        code: "QUE_PROJECT_FOOTER_GRP",
        name: "Project Footer"
      },
      QUE_POWERED_BY: {
        code: "QUE_POWERED_BY",
        name: "Project Powered By"
      }
    },
    frames: {
      FRM_CONTENT: {...},
      FRM_FOOTER: {
        code: "FRM_FOOTER",
        links: [
          {
            code: "QUE_PROJECT_FOOTER_GRP",
            panel: "EAST",
            type: "ask",
            weight: 1
          }
        ],
        name: "Footer Frame"
      },
      FRM_HEADER: {...},
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_CONTENT",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_FOOTER",
            panel: "SOUTH",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_HEADER",
            panel: "NORTH",
            type: "frame",
            weight: 1
          }
        ],
        name: "Main Frame"
      },
      FRM_ROOT: {...}
    }
  }
}
```

#### Updated Displays
So we can see a change in both the React tree and the page this time. The Footer Frame has been added to a new South Panel, and it has the Form inside its own East Panel. For the page, the new text is now being displayed in the bottom right corner of the page.

![Add Footer With Powered By Question Set](https://i.imgur.com/b3CJgAb.png)

***

### Step 12 - Add a Background Color to the Content Area
[back to top](#creating-a-layout-step-by-step)

Now that we have some other elements, we need to break the visual elements of the page up so that the Header and Footer are more easily distinguiable from the main content of the page. To do this, we want to add a another Theme with a background color that can apply to just the content area.

We need to determine which Frame the Theme needs to be linked to. Remember, while Themes are linked to Frames, they aren't actually applied to Frames directy, but instead are applied to a specific Panel based on the value of the Link.

So since we want it to apply to the Content Frame, we need to look at which Panel the Content Frame itself is linked to. The Content Frame is rendered inside the Centre Panel of Frame Main, which means that Frame Main is where the Link needs to originate from.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_THEME",
        "linkValue": "CENTRE",
        "sourceCode": "FRM_MAIN",
        "targetCode": "THM_BACKGROUND_WHITE",
        "weight": 1
      }
    }
  ],
  "name": "Main Frame"
},
{
  "code": "THM_BACKGROUND_WHITE",
  "name": "Theme Background White",
  "baseEntityAttributes": [
    {
      "attributeCode": "PRI_CONTENT",
      "attributeName": "Content",
      "baseEntityCode": "THM_BACKGROUND_WHITE",
      "value": {
        "backgroundColor": "#fff"
      }
    }
  ]
}
```
#### Redux Store
```
{
  vertx: {
    asks: {...},
    baseEntities: {
      FRM_CONTENT: {...},
      FRM_FOOTER: {...},
      FRM_HEADER: {...},
      FRM_MAIN: {...},
      FRM_ROOT: {...},
      THM_BACKGROUND_RED: {...},
      THM_BACKGROUND_WHITE: {...}
    }
  },
  layouts: {
    asks: {...},
    frames: {
      FRM_CONTENT: {...},
      FRM_FOOTER: {...},
      FRM_HEADER: {...},
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_CONTENT",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_FOOTER",
            panel: "SOUTH",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_HEADER",
            panel: "NORTH",
            type: "frame",
            weight: 1
          },
          {
            code: "THM_BACKGROUND_WHITE",
            panel: "CENTRE",
            type: "theme",
            weight: 1
          }
        ],
        name: "Main Frame"
      }
      FRM_ROOT: {...}
    },
    themes: {
      THM_BACKGROUND_RED: {...},
      THM_BACKGROUND_WHITE: {
        code: "THM_BACKGROUND_WHITE",
        data: {
          backgroundColor: "#fff"
        },
        name: "Theme Background White"
      }
    }
  }
}
```

#### Updated Displays
Since there are no new Frames or Question Sets, there is no change to the elements rendered in the React tree. The page of the app has been updated, with the new background color being applied only to the Content area, not the Header or Footer.

![Add a Background Color to the Content Area](https://i.imgur.com/vYsPN5n.png)

***

### Step 13 - Add Sidebar With Project Logo Question Set 
[back to top](#creating-a-layout-step-by-step)

Now for the last step, we want to add a Sidebar which shows the Project's Logo. It should be displayed in the top left corner. Following the same steps as we did with the Footer: send the Main Frame with a Link to Sidebar Frame with value `WEST`, then send the Sidebar Frame with a Link to the Question Set with value `NORTH`, and lastly send the Question Set.

#### Base Entity Message
```
{
  "code": "FRM_MAIN",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_FRAME",
        "linkValue": "WEST",
        "sourceCode": "FRM_MAIN",
        "targetCode": "FRM_SIDEBAR",
        "weight": 1
      }
    }
  ],
  "name": "Main Frame"
},
{
  "code": "FRM_SIDEBAR",
  "links": [
    {
      "link": {
        "attributeCode": "LNK_ASK",
        "linkValue": "NORTH",
        "sourceCode": "FRM_FOOTER",
        "targetCode": "QUE_PROJECT_SIDEBAR_GRP",
        "weight": 1
      }
    }
  ],
  "name": "Sidebar Frame"
}
```

#### Ask Message
```
{
  "sourceCode": "PER_USER1",
  "targetCode": "PRJ_PROJECT1",
  "questionCode": "QUE_PROJECT_SIDEBAR_GRP",
  "name": "Project Sidebar",
  "childAsks": [
    {
      "question": {
        "attribute": {
          "dataType": {
            "className": "Image",
            "typeName": "Image",
            {...}
          },
          "code": "PRI_LOGO",
          "name": "Logo"
        },
        "attributeCode": "PRI_LOGO",
        "code": "QUE_LOGO",
        "name": "Project Logo"
      },
      "sourceCode": "PER_USER1",
      "targetCode": "PRJ_PROJECT1",
      "questionCode": "QUE_LOGO",
      "attributeCode": "PRI_LOGO",
      "readonly": true,
      "name": "Project Logo"
    }
  ]
}
```
#### Redux Store
```
{
  vertx: {
    asks: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_PROJECT_HEADER_GRP: {...},
      QUE_PROJECT_FOOTER_GRP: {...},
      QUE_PROJECT_SIDEBAR_GRP: {
        "sourceCode": "PER_USER1",
        "targetCode": "PRJ_PROJECT1",
        "questionCode": "QUE_PROJECT_SIDEBAR_GRP",
        "name": "Project Sidebar",
        "childAsks": [
          {
            "question": {
              "attribute": {
                "dataType": {
                  "className": "Image",
                  "typeName": "Image",
                  {...}
                },
                "code": "PRI_LOGO",
                "name": "Logo"
              },
              "attributeCode": "PRI_LOGO",
              "code": "QUE_LOGO",
              "name": "Project Logo"
            },
            "sourceCode": "PER_USER1",
            "targetCode": "PRJ_PROJECT1",
            "questionCode": "QUE_LOGO",
            "attributeCode": "PRI_LOGO",
            "readonly": true,
            "name": "Project Logo"
          }
        ]
      }
    },
    baseEntities: {...}
  },
  layouts: {
    asks: {
      QUE_USER_DETAILS_GRP: {...},
      QUE_FIRSTNAME: {...},
      QUE_PROJECT_HEADER_GRP: {...},
      QUE_NAME: {...},
      QUE_PROJECT_FOOTER_GRP: {...},
      QUE_POWERED_BY: {...},
      QUE_PROJECT_SIDEBAR_GRP: {
        code: "QUE_PROJECT_SIDEBAR_GRP",
        name: "Project Sidebar"
      },
      QUE_LOGO: {
        code: "QUE_LOGO",
        name: "Project Logo"
      }
    },
    frames: {
      FRM_CONTENT: {...},
      FRM_FOOTER: {...},
      FRM_HEADER: {...},
      FRM_MAIN: {
        code: "FRM_MAIN",
        links: [
          {
            code: "FRM_CONTENT",
            panel: "CENTRE",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_FOOTER",
            panel: "SOUTH",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_HEADER",
            panel: "NORTH",
            type: "frame",
            weight: 1
          },
          {
            code: "FRM_SIDEBAR",
            panel: "WEST",
            type: "frame",
            weight: 1
          },
          {
            code: "THM_BACKGROUND_WHITE",
            panel: "CENTRE",
            type: "theme",
            weight: 1
          }
        ],
        name: "Main Frame"
      },
      FRM_ROOT: {...},
      FRM_SIDEBAR: {
        code: "FRM_SIDEBAR",
        links: [
          {
            code: "QUE_PROJECT_SIDEBAR_GRP",
            panel: "NORTH",
            type: "ask",
            weight: 1
          }
        ],
        name: "Sidebar Frame"
      },
    }
  }
}
```

#### Updated Displays
Like with the Footer, we can see the changes in both the React tree and the page. The new Sidebar Frame has been added inside a the West Panel of the Main Frame, sitting next to the Content Frame, while the Form is contained inside the North Panel of the Sidebar Frame. This change is reflected in the page view, with the logo appearing in a new Sidebar, pushed to the top of the element where it meets the Header.

![Add Sidebar With Project Logo Question Set](https://i.imgur.com/wAYbmuk.png)

***

## Summary
This is what it takes to create the default wrapper for the application content view with the new Alyson frontend. I hope this has successful illustrated the basic concepts of the layouts system; how the different types of Base Entites are used and how they link together, how the Front End handles the rendering of different elements, and how to apply Themes to elements.
