# Alyson v7

Alyson v7 is the updated Frontend for the Genny system.

## Contents
- [Overview](#Overview)
- [Store](#Store)
- [Layout Basics](#Layout-Basics)
- [Frames](#Frames)
- [Themes](#Themes)
- [Question Sets](#Question-Sets)
- [Legacy Layouts](#Legacy-Layouts)
- [Links](#Links)
- [Creating a Layout](#Creating-a-Layout)

## Overview
### What Has Changed
The previous version used json files called 'layouts' to describe component structures, which were then converted to React Element trees. 

This version aims to removes the dependance on a predefined layout. The Backend sends **Base Entities**, **Question Sets**, and **Links** to the Frontend, then, starting from one root Base Entity, it recursively renders the entire component tree.

### What Does This Affect
Instead of defining each page, and navigating between them to change the display, the Backend only needs to add, remove, or change **Base Entities** or the **Links** between **Base Entities**.

The styling for all Components is defined by the Backend, meaning that the Backend can control the styling and apply changes to as many instances of the system as desired.

## Store
*coming soon*
*explain what the store is and how to view it*
*detail the different fields in the store*

## Layout Basics
A layout is constructed of from the following objects:

- **Frames.** **Base Entities** that positions child elements according to certain criteria.
- **Themes.** **Base Entities** that contain styling or behavioural data for other elements.
- **Question Sets.** **Question Groups** and **Questions** that renders content or input elements.
- **Links.** Describes the nature of the relationship between entities.
- **Legacy Layout.** Renders elements from the previous versions json file.

## Frames
( prefix: FRM_ )
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

## Themes
( prefix: THM_ )

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

## Question Sets
( prefix: QUE_ )

The **Question Sets** are composed of **Question Groups** and **Questions**. A **Question Sets** is rendered as a Form component with each **Question Group** being rendered as a **FormGroup** Component, and each **Question** as an **Input** component. They cover almost all of the display elements and interactable elements shown on the page.

### Applying Themes.
Unlike Base Entities, **Themes** are connected to Question Sets by the **ContextList**.

### Questions
A Question is connected to an Ask, which has an Attribute. It is displayed as an Input component. The data for the Input is used from the `question` field.

### Question Groups
The Question Group is a container form a group of Questions and/or Question Groups. It can be used to pass inheritable Theme data to all of the children, and also can told to render in a different way if there are any Behavioural Attributes attached to the Theme.

A Question Group can also have a `question` field, but by default it is not rendered.

### Difference Between a Question Group and a Question?
A Question Group and a Question both have Codes that begin with `QUE_`, and there is actually no check being made in the front end to see if the suffix `_GRP` is present, so what is the actual distinction between the two? 

The answer is that if the object has `childAsks`, then it is rendered as a Question Group.  If not, then it is rendered as a Question.

### Complex Rendering and Question Group Inputs

*coming soon*
*explain attributes*
*explain with images why question group inputs are neccessary*
*Collapsible*

## Legacy Layouts
( prefix: LAY_ )

The **Legacy Layouts** are base entities created using the previous layouts system, using Json files and Data Queries. They are rendered using the Sublayout component. 

Unlike other aspects of layouts, the Backend is not handling the linking of **Legacy Layouts**. Layout Base Entities are given a randomised Code as an identifier, which means that for backend to fetch the layout they would have to search all Legacy Layouts using the URI, get the Base Entity, add the link, then send it to front end. Because **Legacy Layouts** are only a temporary feature to bridge the development gap, it was decided that Frontend would handle the linking instead.

### Route Changes
Each **Legacy Layouts** is a page that has a URI that corresponds to a **Route**. Because only one page needs to be displayed per route, all we need to do is determine which layout we need, and which **Frame** it needs to be linked to. The default **Frame** for this purpose is `FRM_CONTENT`.

The Frontend listens for **Route Change** events, and when it receives one, gets the URI from the URL, and creates a fake **Link** to the **FRAME** `FRM_CONTENT`. If there URI is empty, then the **Link** defaults to `home`.

## Links
( prefix: LNK_ )

A **Link** is used to define the relationship between two **Entities**. When used for **Layouts**, the **Link** is principally used to tell the front end which entities are being linked, what type of entity the child is, and the location of the child within the **Frame**, if the parent is a **Frame** base entity.

The type of link is defined by the `attributeCode` field. The valid types of links are as follows:
- LNK_FRAME: Indicates that the child is a **Frame** base entity.
- LNK_THEME: Indicates that the child is a **Theme** base entity.
- LNK_ASK: Indicates that the child is an **Question Sets**.
- **LNK_LAYOUT**: Indicates the child is a **Legacy Layout**. This allows backwards compatibility with the previous layouts.

***Important:*** *While Themes are linked to Frames, they aren't actually applied to Frames directy, but instead are applied to a specific Panel based on the value of the Link.*

The **Panel** the child will be linked to is defined by the `linkValue` field. The valid values are **NORTH**, **SOUTH**, **EAST**, **WEST**, and **CENTRE**.

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

## Creating a Layout
The default entry point for the Layout structure is `FRM_ROOT`. Any **Themes** that need to be applied through the whole app such as text color or background color should be linked to `FRM_ROOT`.

[Click here to view a step by step walkthrough of creating a layout.](./docs/CREATING_LAYOUT_WALKTHROUGH.md)
