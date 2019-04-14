# Forms

## Description

The entry point for Asks. Handles the form validation, and sends answers to backend.

## Props
| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| questionGroupCode | `string` or `array` | - | The code or codes of the ask that is to be displayed. |
| asks | object | `{}` | All ask data passed from the store. |
| baseEntities | object | `{}` | All base entity passed from the store.  |
| inheritedThemes | object | `{}` | Any themes inherited from the parent component. |
| loadingText | string | `Loading form...` | Text displayed while loading the form |
| shouldSetInitialValues | bool | true | Should form prefill with existing values. |
| fullWidth | bool | - | Should form expand horizontally to take up all available space. |

# FormGroup

## Description

Component rendered as a wrapper for Questions, and other Question Groups. Applies the styling from Themes, and controls complex behaviour such as collapsing,

## Rendering a Question as part of the Question Group

## Collapsing

## Props
| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| questionGroup |  |  | Data for the question group. |
| form |  |  | Props from the form. |
| functions |  |  | Functions from the form. |
| inheritedThemes |  |  | Any themes inherited from the parent component. |
| inputRefs |  |  | Refs for the child inputs from the form. |
| dataTypes |  |  | All datatypes passed from the store. |
| asks |  |  | All ask data passed from the store. |
| themes |  |  | All theme data passed from the store. |