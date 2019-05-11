# RevealJS

## A simple JavaScript image comparison library

![Demo Gif](demo.gif)

------

This library is designed to be plug and play. Simply download and include the [Reveal.css](dist/Reveal.css) and [Reveal.js](dist/Reveal.js) file on your page and set some tags in the HTML and the rest is taken care of auto-magically.

## Basic Usage

Each reveal item consists of 2 images in a container. The simplest example is as follows.
```html
<div class="reveal">
    <img src="leftImage.jpg">
    <img src="rightImage.jpg">
</div>
```
All you need is the `.reveal` class on the container of the images. Feel free to have as many of these reveal containers on your page.

The other two components you need are the stylesheet and the script.

Add this line to your `<head>`:
```html
<link rel="stylesheet" href="Reveal.css">
```
Add this line to the bottom of your `<body>`:
```html
<script src="Reveal.js"></script>
```

Once the page is loaded, the script will automatically find all of the `.reveal` containers and setup everything for you. If you are adding content to your page after it's already loaded, check out the [Advanced Usage](#advanced-usage) below!

## Advanced usage

The API is very straight forward. You can call `Reveal.init()` and pass in a DOM element to initialize that reveal element. Make sure it still has the `class="reveal"` in the HTML!

```js
Reveal.init(document.getElementById("newRevealItem"));
```

## Browser Support

Works on all browsers both mobile and desktop! (Yes that includes Internet Explorer.)