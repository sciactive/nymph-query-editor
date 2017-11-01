# Nymph Query Editor - collaborative app data

[![Latest Stable Version](https://img.shields.io/npm/v/nymph-query-editor.svg?style=flat)](https://www.npmjs.com/package/nymph-query-editor) [![License](https://img.shields.io/npm/l/nymph-query-editor.svg?style=flat)](https://www.npmjs.com/package/nymph-query-editor) [![Open Issues](https://img.shields.io/github/issues/sciactive/nymph-query-editor.svg?style=flat)](https://github.com/sciactive/nymph-query-editor/issues)

Nymph is an object data store that is easy to use in JavaScript and PHP.

## Installation

You can install Nymph Query Editor with NPM.

```sh
npm install --save nymph-query-editor
```

This repository is the JavaScript query editor widget built with Svelte. For more information, you can see the [main Nymph repository](https://github.com/sciactive/nymph).

## Setting up Nymph Query Editor

<div dir="rtl">Quick Setup with NPM</div>

```sh
npm install --save nymph-query-editor
```

To use, include the file from either the UMD, CommonJS, or IIFE lib folder, and instantiate with a target and list of Nymph entity classes:

```js
var myQueryEditor = new HelloWorld({
  target: document.querySelector('query-editor'),
  data: {
    supportedClasses: [
      MyFirstEntity,
      MySecondEntity
    ],
    options: {
      "class": MyFirstEntity.class
    },
    selectors: [
      {
        "type": "&",
        "gte": ["cdate", null, "-1 week"]
      }
    ]
  }
});
```

Then you can get the query by the options and selectors:

```js
const query = [myQueryEditor.get("options"), ...myQueryEditor.get("selectors")];
```

For a thorough step by step guide to setting up Nymph on your own server, visit the [Setup Guide](https://github.com/sciactive/nymph/wiki/Setup-Guide).

## Documentation

Check out the documentation in the wiki, [Technical Documentation Index](https://github.com/sciactive/nymph/wiki/Technical-Documentation).
