# Form

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
