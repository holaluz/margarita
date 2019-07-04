# Button Input

You can use **Button Input** component as following minimal configuration:

In the case you want a **text only button**:
```livescript
<ma-button
  category="gradient"
>
This is a button with text only
</Button>
```

In the case you want an **icon only button**:
```livescript
<ma-button
  aria-label="Download PDF"
  rounded
  category="secondary"
>
  <ma-icon
    icon="DownloadContract"
    width="50"
    height="50"
  />
</Button>
```

In the case you want a **text with icon button**:
```livescript
<ma-button>
  This is a button with text and icon
  <ma-icon
    icon="Arrow"
  />
</Button>
```

In the case you want a **text and icon link**:
```livescript
<ma-button
  category="no-background"
  href="https://www.holaluz.com/"
  tag="a"
>
  This is a link with text and icon
  <ma-icon
    icon="Exit"
  />
</Button>
```

### Props are:

- <code>String</code> **category**: Available categories are showed in the component's const `AVAILABLE_CATEGORIES`. Default value is `primary`.
- <code>Boolean</code> **loading**: It defines if the button is loading. Defaul value is `false`.
- <code>Boolean</code> **rounded**: It defines if it's a rounded button or not. Defaul value is `false`.
- <code>Boolean</code> **fluid**: It defines if it's a fluid button or not. Defaul value is `false`.
- <code>String</code> **aria-label**: It defines an aria-label when a button has only an icon inside for accessibility.
- <code>String</code> **href**: It defines the button's href tag.
- <code>String</code> **tag**: It defines if the component is a `button` or a `a` html tag. Defaul value is `button`.

### Event:

You can listen `click` event directly listening this event from the parent.