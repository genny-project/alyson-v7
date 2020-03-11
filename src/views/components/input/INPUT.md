# Input

## Description

Inputs are the components which display information to the user and allow the user to enter information.

## List of Input Types

###

| Type | TypeName | Component | Default Props | Description |
|:-----|:-----|:----------|:------------| :------------|
| Text Field | ```"text", "abn number", "acn number", "double"``` | [InputText](../src/views/components/input/text/INPUT_TEXT.md) | {} | Standard text field |
| Password | ```"password"``` | InputText | ```{ secureTextEntry: true }``` | As InputText field, but with hidden characters |
| Email | ```"email"``` | InputText | ```{ keyboardType: "email-address" }``` | As InputText, but with keyboardtype set for email |
| Number |```"number", "java.lang.integer", "java.lang.long", "java.lang.Long", "java.lang.Integer", "mobile", "landline"``` | InputText | ```{ keyboardType: "phone-pad" }``` | As InputText, but with keyboardtype set for phone |
| TextArea | ```"textarea"``` | [InputTextArea](../src/views/components/input/textarea/INPUT_TEXT_AREA.md) | ```{ multiline: true, numberOfLines: 2 }``` | Multiline text field |
| Address | ```"address"``` | [InputAddress](../src/views/components/input/address/INPUT_ADDRESS.md) | ```{}``` | Text field with an autocomplete address lookup using the Google Places API |
| Dropdown (Single Select) | ```"dropdown"``` | [InputTag](../src/views/components/input/tag/INPUT_TAG.md) | ```{ allowMultipleSelection: false, allowNewTags: false}``` | Single select dropdown field |
| Dropdown (Multiple Select) | ```"dropdownmultiple"``` | InputTag |  ```{ allowMultipleSelection: true, allowNewTags: false}``` | Multiple select dropdown field |
| Tags | ```"tag"``` | InputTag | ```{ allowMultipleSelection: true }``` | Multiple select dropdown field which allows user to add new tags |
| Date | ```"date", "java.time.localdate"``` | [InputDatePicker](../src/views/components/input/date-time/INPUT_DATE_TIME.md) | ```{}``` | Masked Text Field with calendar picker |
| DateTime | ```"datetime", "java.time.localdate"``` | InputDatePicker | ```{}``` | Masked Text Field |
| File | ```"file", "upload", "imagemultiple", "Imagemultiple", "images"``` | [InputFile](../src/views/components/input/file/INPUT_FILE.md) | ```{}``` | File uploader and viewer |
| Image | ```"image", "Image"``` | InputFile | ```{ allowedFileTypes: ['image/*'] }``` | Image only uploads |
| Event | ```event", "buttonevent", "form previous submit", "form cancel next", "form submit", "button", "form submit cancel"``` | [InputEvent](../src/views/components/input/event/INPUT_EVENT.md) | ```{}``` | Touchable which sends an Event to the backend |
| Signature | ```"signature"``` | [Signature](../src/views/components/input/signature/INPUT_SIGNATURE.md) | ```{}``` | Canvas area with a confirm button to upload a signature |
| Colour Picker | ```"color", "colour"``` | [ColourPicker](../src/views/components/input/colour-picker/COLOUR_PICKER.md) | ```{}``` | Colour picker |
| Progress | ```progress"``` | [Progress](../src/views/components/input/progress/PROGRESS.md) | ```{}``` | Progress bar |
| Rich Text Editor | ```"htmlarea", "rich-text-editor", "editor", "texteditor"``` | [RichTextEditor](../src/views/components/input/rich-text-editor/RICH_TEXT_EDITOR.md) | ```{}``` | Multiline text area using Markdown / Rich Text format |

<!--  | htmlarea, textarea | InputText | multiline, numberOfLines={3}, height={100} |  | -->
<!-- | currency, org.javamoney.moneta.money | InputCurrency | - |  |
| java.lang.boolean, switch | Switch | - |  |
| read, termsandconditions | InputRead | - |  |
| scroll | InputScroll | - |  |
| rating | InputRating | - |  |
| autocomplete | InputAutocomplete | - |  | -->
<!-- | checkbox | CheckBox | - |  |
| checkboxmultiple | InputCheckbox | - |  | -->

