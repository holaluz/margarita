# Text Input

You can use **Text** component as following minimal configuration:

```livescript
<ma-input
  label="Field Name"
  value="Property value"
/>
```

### Required props are:

- **label** <code>String</code>: The label for the form input.
- **value** <code>String, Number</code>: The binded value. You can send v-model instead, and `v-on:input` will be the v-model default behavior.

### Text allows you to use the next configuration fields:

- <code>String</code> **id**: Id for the input.
- <code>Boolean</code> **hasError**: Defines if input is errored. Adds styles and shows the error message.
- <code>String</code> **errorMessage**: A String that defines de error message (not shown if `hasError` is `false`).
- <code>String</code> **type**: The input HTML `type`.
- <code>Boolean</code> **disabled**: Sets the disabled status for the input.

### Slots

- **inputSibling**: Able to add a input sibling, like a button, a counter, an icon, etc.
- **labelSibling**: Able to add a label sibling, like a link, an extra description, etc.

### Events:

You can listen `blur`, `input` and `change` input events directly listening these events from the parent.