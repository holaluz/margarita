# Markdown directive

A directive to render markdown.

## Usage
This:
```html
<div v-markdown="'**bold** _italic_ [anchor](https://url.com)<<.class>>'" />
```
Will render this:
```html
<p>
  <strong>bold</strong>
  <i>italic</i>
  <a href="https://url.com" class="class">anchor</a>
</p>
```
Also, by adding the attribute `blank` to an anchor, the attributes `target` and `rel` will be added. Example:
```html
<div v-markdown="'[anchor](https://url.com)<<blank>>'" />
```
Will render this:
```html
<a href="https://url.com" target="_blank" rel="noopener,nofollow">anchor</a>
```
