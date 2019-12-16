# Markdown directive

A directive to render markdown.

## Usage
This:
```html
<div v-markdown="'**bold** _italic_ [anchor](url.com)<<.class>>'" />
```
Will render this:
```html
<p>
  <strong>bold</strong>
  <i>italic</i>
  <a href="url.com" class="class">anchor</a>
</p>
```
