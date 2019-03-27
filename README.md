# Alyson v7

Alyson v7 is the updated Frontend for the Genny system.

## Contents
- Overview
- Store
- Layout Basics
- [Frames](#Frames)
- Themes
- Question Sets
- Legacy Layouts
- Links
- Creating a Layout

## Overview
### What Has Changed
The previous version used json files called 'layouts' to describe component structures, which were then converted to React Element trees. 

This version aims to removes the dependance on a predefined layout. The Backend sends **Base Entities**, **Question Sets**, and **Links** to the Frontend, then, starting from one root Base Entity, it recursively renders the entire component tree.

### What Does This Affect
Instead of defining each page, and navigating between them to change the display, the Backend only needs to add, remove, or change **Base Entities** or the **Links** between **Base Entities**.

The styling for all Components is defined by the Backend, meaning that the Backend can control the styling and apply changes to as many instances of the system as desired.

## Store

## Layout Basics
A layout is constructed of from the following objects:

- **Frames.** **Base Entities** that positions child elements according to certain criteria.
- **Themes.** **Base Entities** that contain styling or behavioural data for other elements.
- **Question Sets.** **Question Groups** and **Questions** that renders content or input elements.
- **Links.** Describes the nature of the relationship between entities.
- **Legacy Layout.** Renders elements from the previous versions json file.

## Frames[create an anchor](#anchors-in-markdown) ( prefix: FRM_ )
The **Frame** base entity is the basic building block of the layout. Any **Frames**, **Question Sets**, or **Legacy Layouts** that are **linked** to a **Frame** will be positioned based on the value of the **Link** between them.

**Panels** aren't created directly from **Base Entities**, instead they are rendered inside **Frames** based on the Frame's **Links**.

### Panels
The **Frame** base entity is the basic building block of the layout. Each **Frame** has up to five (5) **Panels**. The names of these **Panels** are derived from their corresponding compass directions, with north being at the top of the screen:

![Panel Layout](https://i.imgur.com/t4FxSph.png)

Each **Panel** has predefined default behaviour that allows content within it to be display in a way that is easily predictable and controllable by the backend. This behaviour can be overridden if desired.

- All Panels
  - Will only be rendered if it has content, ie: if there is a **Link** to an existing **Base Entity** in the Redux Store.
- North Panel
  - Will fit its content, *unless* there are no **East**, **West**, or **Centre Panels**, in which case it will expand to fill the space available.
  - Content will be positioned against the **top** of the panel. Override with `alignItems`.  
- South Panel
  - Will fit its content, *unless* there are no **East**, **West**, or **Centre Panels**, in which case it will expand to fill the space available.
  - Content will be positioned against the **bottom** of the panel. Override with `alignItems`.  
- Centre Panel
  - Will always expand to fill the space available.
  - Content positioned in the **middle** of the panel by default. Override with `alignItems` and `justifyContent`.     
- East Panel
  - Will fit its content, *unless* there is no **Centre Panel**, in which case it will expand to fill the space available.
  - Content will be positioned against the **right side** of the panel. Override with `justifyContent`.     
- West Panel
  - Will fit its content, *unless* there is no **Centre Panel**, in which case it will expand to fill the space available.
  - Content will be positioned against the **left side** of the panel. Override with `justifyContent`.     

## Themes ( prefix: THM_ )
The **Theme** base entity describes styling information and behavioural changes for other rendered elements (**Frames**, **Question Groups**, and **Questions**).

### Styling Attribute
Styling information is determined by the value of the attribute `PRI_CONTENT`. The value is an object that will be passed to the rendered components as props.

Most CSS fields are acceptable as parameters, but given that the information is passed as props to React Components, each component has it's own list of props that it accepts. All others are ignored. All keys must be denoted in camelCase

*Click here to see a list of components and accepted props.*

### Behavioural Attributes
Where most styling changes can simply be passed to components as props, some desired behaviour from components requires more complex changes to how the element tree is constructed. They might require a component to keep track of a state and then pass that to child elements, or change the order components are rendered, or use different components to the default ones.

### Heirachy, Inheritance, and Weight
By default, all **Theme** styling information is recursively passed to every child element in the component tree. This behaviour can be disabled by setting the value of `PRI_IS_INHERITABLE` to `false`.

It is possible, probably even, that a given component will end up with multiple instances of the same prop passed to it. This might happen because the same prop is being set from two different linked **Themes**, or because of a **Theme** linked to a parent component. Whenever this happens, the following rules are used to determine which prop is used:
1. Themes linked to children will override Themes linked to parents.
2. Themes linked with a `weight` value that have the highest priority, where `1` is the highest priority, will override Themes with a weight of a lower priority.

### Theme Attributes
| Option | Value Type | Example | Required | Description |
| ------ | ---------- | ------- | -------- | ----------- |
| PRI_CONTENT | Object | { "backgroundColor": "#ddd" } | true | An object composed of key-value pairings defining CSS values that will be passed to the rendered element in the frontend. |
| PRI_IS_INHERITABLE | Boolean | false | false | An optional prop to define whether a Theme's information should be passed to the children of the Theme. Defaults to true. |
| PRI_IS_EXPANDABLE | Boolean | true | false | Instructs linked component to de displayed with its children hidden inside in an expandable component. |
| PRI_HAS_QUESTION_GRP_INPUT | Boolean | true | false | If the connected entity is **Question Group**, then it will render the **Question** in addition to the child asks. See *Question Group Inputs* for more detail. |

## Question Sets  ( prefix: QUE_ )
The **Question Sets** are composed of **Question Groups** ( QUE_XXX_GRP ) and **Questions** ( QUE_XXX ). A **Question Sets** is rendered as a Form component with Inputs, and cover almost all of the display elements and interactable elements shown on the page.

### Question Groups
a

### Questions
a

### ContextList.contexts
a

### question.attribute
Both Questions and Question Groups have this field, but 

### Difference Between a Question Group and a Question?
A Question Group and a Question both have Codes that begin with `QUE_`, and there is actually no check being made in the front end to see if the suffix `_GRP` is present, so what is the actual distinction between the two? 

The answer is that if the object has `childAsks`, then it is rendered as a Question Group.  If not, then it is rendered as a Question.

### Question Group Input
a

### Question Groups
A **Question Group** defines a group of collection of **Questions**. **Question Groups** can have a **Theme** linked to it, and define behaviour such as Pagination, Dropdowns, and Selectable element.

### Questions
A **Question** defines an element that will display information to the user. The element might be editable, or read only. The `dataType` field defines the type of data, which is used by the front end to render a display component.

### Question Set Structure
```
{
  "items": [
    {
      "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
      "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
      "questionCode": "QUE_TREE_GRP",
      "attributeCode": "QQQ_QUESTION_GROUP",
      "mandatory": false,
      "disabled": false,
      "hidden": false,
      "readonly": false,
      "weight": 0.0,
      "parentId": 0,
      "childAsks": [
        {
          "question": {
            "attribute": {
              "dataType": {
                "className": "Event",
                "typeName": "Event",
                "validationList": []
              },
              "defaultPrivacyFlag": false,
              "code": "PRI_DASHBOARD",
              "index": 0,
              "created": "2019-02-10T10:41:00",
              "updated": "2019-02-10T10:41:00",
              "id": 159,
              "name": "Dashboard",
              "realm": "genny"
            },
            "attributeCode": "PRI_DASHBOARD",
            "mandatory": false,
            "readonly": false,
            "code": "QUE_DASHBOARD",
            "index": 0,
            "created": "2018-08-14T02:46:55",
            "updated": "2018-10-04T23:29:15",
            "id": 88,
            "name": "Dashboard",
            "realm": "genny"
          },
          "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
          "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
          "questionCode": "QUE_DASHBOARD",
          "attributeCode": "PRI_DASHBOARD",
          "mandatory": true,
          "disabled": false,
          "hidden": false,
          "readonly": false,
          "weight": 0.0,
          "parentId": 0,
          "contextList": {
            "eventType": "TV_SELECT"
          },
          "created": "2018-08-29T03:00:40",
          "updated": "2018-12-12T02:22:33",
          "id": 3668,
          "name": "Dashboard",
          "realm": "genny"
        },
        {
          "question": {
            "attribute": {
              "dataType": {
                "className": "Event",
                "typeName": "Event",
                "validationList": []
              },
              "defaultPrivacyFlag": false,
              "code": "QQQ_QUESTION_GROUP_INPUT",
              "index": 0,
              "created": "2019-02-10T10:40:32",
              "updated": "2019-02-10T10:40:32",
              "id": 171,
              "name": "QuestionGroupInput",
              "realm": "genny"
            },
            "attributeCode": "QQQ_QUESTION_GROUP_INPUT",
            "mandatory": false,
            "readonly": false,
            "code": "QUE_INTERNSHIPS_GRP",
            "index": 0,
            "created": "2018-08-14T02:46:56",
            "updated": "2018-10-04T23:29:19",
            "id": 247,
            "name": "Internships",
            "realm": "genny"
          },
          "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
          "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
          "questionCode": "QUE_INTERNSHIPS_GRP",
          "attributeCode": "QQQ_QUESTION_GROUP_INPUT",
          "mandatory": false,
          "disabled": false,
          "hidden": false,
          "readonly": false,
          "weight": 0.0,
          "parentId": 0,
          "childAsks": [
            {
              "question": {
                "attribute": {
                  "dataType": {
                    "className": "Event",
                    "typeName": "Event",
                    "validationList": []
                  },
                  "defaultPrivacyFlag": false,
                  "code": "PRI_INTERNSHIPS_PLACED",
                  "index": 0,
                  "created": "2019-02-10T10:41:00",
                  "updated": "2019-02-10T10:41:00",
                  "id": 159,
                  "name": "Placed Internships",
                  "realm": "genny"
                },
                "attributeCode": "PRI_INTERNSHIPS_PLACED",
                "mandatory": false,
                "readonly": false,
                "code": "QUE_INTERNSHIPS_PLACED",
                "index": 0,
                "created": "2018-08-14T02:46:55",
                "updated": "2018-10-04T23:29:15",
                "id": 88,
                "name": "Placed Internships",
                "realm": "genny"
              },
              "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "questionCode": "QUE_INTERNSHIPS_PLACED",
              "attributeCode": "PRI_INTERNSHIPS_PLACED",
              "mandatory": true,
              "disabled": false,
              "readonly": false,
              "weight": 0.0,
              "parentId": 0,
              "contextList": {},
              "created": "2018-08-29T03:00:40",
              "updated": "2018-12-12T02:22:33",
              "id": 3668,
              "name": "Placed Internships",
              "realm": "genny"
            },
            {
              "question": {
                "attribute": {
                  "dataType": {
                    "className": "Event",
                    "typeName": "Event",
                    "validationList": []
                  },
                  "defaultPrivacyFlag": false,
                  "code": "PRI_INTERNSHIPS_COMPLETED",
                  "index": 0,
                  "created": "2019-02-10T10:41:00",
                  "updated": "2019-02-10T10:41:00",
                  "id": 159,
                  "name": "Completed Internships",
                  "realm": "genny"
                },
                "attributeCode": "PRI_INTERNSHIPS_COMPLETED",
                "mandatory": false,
                "readonly": false,
                "code": "QUE_INTERNSHIPS_COMPLETED",
                "index": 0,
                "created": "2018-08-14T02:46:55",
                "updated": "2018-10-04T23:29:15",
                "id": 88,
                "name": "Completed Internships",
                "realm": "genny"
              },
              "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "questionCode": "QUE_INTERNSHIPS_COMPLETED",
              "attributeCode": "PRI_INTERNSHIPS_COMPLETED",
              "mandatory": true,
              "disabled": false,
              "hidden": false,
              "readonly": false,
              "weight": 0.0,
              "parentId": 0,
              "contextList": {},
              "created": "2018-08-29T03:00:40",
              "updated": "2018-12-12T02:22:33",
              "id": 3668,
              "name": "Completed Internships",
              "realm": "genny"
            },
            {
              "question": {
                "attribute": {
                  "dataType": {
                    "className": "Event",
                    "typeName": "Event",
                    "validationList": []
                  },
                  "defaultPrivacyFlag": false,
                  "code": "PRI_INTERNSHIPS_IN_PROGRESS",
                  "index": 0,
                  "created": "2019-02-10T10:41:00",
                  "updated": "2019-02-10T10:41:00",
                  "id": 159,
                  "name": "In Progress Internships",
                  "realm": "genny"
                },
                "attributeCode": "PRI_INTERNSHIPS_IN_PROGRESS",
                "mandatory": false,
                "readonly": false,
                "code": "QUE_INTERNSHIPS_IN_PROGRESS",
                "index": 0,
                "created": "2018-08-14T02:46:55",
                "updated": "2018-10-04T23:29:15",
                "id": 88,
                "name": "In Progress Internships",
                "realm": "genny"
              },
              "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "questionCode": "QUE_INTERNSHIPS_IN_PROGRESS",
              "attributeCode": "PRI_INTERNSHIPS_IN_PROGRESS",
              "mandatory": true,
              "disabled": false,
              "hidden": false,
              "readonly": false,
              "weight": 0.0,
              "parentId": 0,
              "contextList": {},
              "created": "2018-08-29T03:00:40",
              "updated": "2018-12-12T02:22:33",
              "id": 3668,
              "name": "In Progress Internships",
              "realm": "genny"
            },
            {
              "question": {
                "attribute": {
                  "dataType": {
                    "className": "Event",
                    "typeName": "Event",
                    "validationList": []
                  },
                  "defaultPrivacyFlag": false,
                  "code": "PRI_INTERNSHIPS_ACTIVE",
                  "index": 0,
                  "created": "2019-02-10T10:41:00",
                  "updated": "2019-02-10T10:41:00",
                  "id": 159,
                  "name": "Active Internships",
                  "realm": "genny"
                },
                "attributeCode": "PRI_INTERNSHIPS_ACTIVE",
                "mandatory": false,
                "readonly": false,
                "code": "QUE_INTERNSHIPS_ACTIVE",
                "index": 0,
                "created": "2018-08-14T02:46:55",
                "updated": "2018-10-04T23:29:15",
                "id": 88,
                "name": "Active Internships",
                "realm": "genny"
              },
              "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "questionCode": "QUE_INTERNSHIPS_ACTIVE",
              "attributeCode": "PRI_INTERNSHIPS_ACTIVE",
              "mandatory": true,
              "disabled": false,
              "hidden": false,
              "readonly": false,
              "weight": 0.0,
              "parentId": 0,
              "contextList": {},
              "created": "2018-08-29T03:00:40",
              "updated": "2018-12-12T02:22:33",
              "id": 3668,
              "name": "Active Internships",
              "realm": "genny"
            },
            {
              "question": {
                "attribute": {
                  "dataType": {
                    "className": "Event",
                    "typeName": "Event",
                    "validationList": []
                  },
                  "defaultPrivacyFlag": false,
                  "code": "PRI_INTERNSHIPS_OFFERED",
                  "index": 0,
                  "created": "2019-02-10T10:41:00",
                  "updated": "2019-02-10T10:41:00",
                  "id": 159,
                  "name": "Offered Internships",
                  "realm": "genny"
                },
                "attributeCode": "PRI_INTERNSHIPS_OFFERED",
                "mandatory": false,
                "readonly": false,
                "code": "QUE_INTERNSHIPS_OFFERED",
                "index": 0,
                "created": "2018-08-14T02:46:55",
                "updated": "2018-10-04T23:29:15",
                "id": 88,
                "name": "Offered Internships",
                "realm": "genny"
              },
              "sourceCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "targetCode": "PER_ADAMCROW63_AT_GMAILCOM",
              "questionCode": "QUE_INTERNSHIPS_OFFERED",
              "attributeCode": "PRI_INTERNSHIPS_OFFERED",
              "mandatory": true,
              "disabled": false,
              "hidden": false,
              "readonly": false,
              "weight": 0.0,
              "parentId": 0,
              "contextList": {},
              "created": "2018-08-29T03:00:40",
              "updated": "2018-12-12T02:22:33",
              "id": 3668,
              "name": "Offered Internships",
              "realm": "genny"
            }
          ],
          "contextList": {
            "isDropdown": true
          },
          "created": "2019-02-14T03:15:22",
          "id": 46341,
          "name": "Internships",
          "realm": "genny"
        }
      ],
      "contextList": {},
      "created": "2019-02-14T03:15:22",
      "id": 46341,
      "name": "Tree View",
      "realm": "genny"
    }
  ],
  "data_type": "Ask",
  "delete": false,
  "replace": false,
  "msg_type": "DATA_MSG"
}
```

## Legacy Layouts ( prefix: LAY_ )

The **Legacy Layouts** are base entities created using the previous layouts system, using Json files and Data Queries. They are rendered using the Sublayout component. 

Unlike other aspects of layouts, the Backend is not handling the linking of **Legacy Layouts**. Layout Base Entities are given a randomised Code as an identifier, which means that for backend to fetch the layout they would have to search all Legacy Layouts using the URI, get the Base Entity, add the link, then send it to front end. Because **Legacy Layouts** are only a temporary feature to bridge the development gap, it was decided that Frontend would handle the linking instead.

### Route Changes
Each **Legacy Layouts** is a page that has a URI that corresponds to a **Route**. Because only one page needs to be displayed per route, all we need to do is determine which layout we need, and which **Frame** it needs to be linked to. The default **Frame** for this purpose is `FRM_CONTENT`.

The Frontend listens for **Route Change** events, and when it receives one, gets the URI from the URL, and creates a fake **Link** to the **FRAME** `FRM_CONTENT`. If there URI is empty, then the **Link** defaults to `home`.

## Links ( prefix: LNK_ )

A **Link** is used to define the relationship between two **Entities**. When used for **Layouts**, the **Link** is principally used to tell the front end which entities are being linked, what type of entity the child is, and the location of the child within the **Frame**, if the parent is a **Frame** base entity.

The type of link is defined by the `attributeCode` field. The valid types of links are as follows:
- LNK_FRAME: Indicates that the child is a **Frame** base entity.
- LNK_THEME: Indicates that the child is a **Theme** base entity.
- LNK_ASK: Indicates that the child is an **Question Sets**.
- **LNK_LAYOUT**: Indicates the child is a **Legacy Layout**. This allows backwards compatibility with the previous layouts.

The **Panel** the child will be linked to is deinfed by the `linkValue` field. The valid values are **NORTH**, **SOUTH**, **EAST**, **WEST**, and **CENTRE**

#### Link Structure
```
{
  "created": "2019-02-06T04:24:58",
  "link": {
    "attributeCode": "LNK_FRAME",
    "linkValue": "CENTRE",
    "sourceCode": "FRM_PARENT",
    "targetCode": "FRM_CHILD",
    "weight": 1
  },
  "updated": "2019-02-06T04:25:25",
  "valueString": "CENTRE",
  "weight": 1
}
```

#### Link Fields
| Field | Value Type | Example | Required | Description |
| ------ | ---------- | ------- | -------- | ----------- |
| sourceCode | string | "FRM_PARENT" | true | Base Entity code of the link parent. |
| targetCode | string | "FRM_CHILD" | true | Base Entity code of the link child. **IMPORTANT: If using LNK_LAYOUT, the target code must be the URI of the legacy layout. Must begin with `pages/` or `sublayouts'`, eg `pages/applications/:id`** |
| attributeCode | string | "LNK_FRAME" | true | Defines the type of link. |
| linkValue | string | "CENTRE" | true | Defines which **Panel** of the parent **Frame** the child is linked to. |
| weight | number | 1 | true | The priority of the link. Lower numbers are more important, a value of `0` means the child will be hidden. |

## Creating a Layout

[Click here to view a step by step walkthrough of creating a layout.](./docs/CREATING_LAYOUT_WALKTHROUGH.md)


