---
pubDate: 2025-01-10T12:52:00-05:00
tags: ['til']
---

Because every so often, I have to Google again for [How To Use An Emoji As A Favicon Easily](https://css-tricks.com/emoji-as-a-favicon/). Here's the one-liner to add to the `<head>` tag:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤯</text></svg>">
```
