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

To use, include Locutus' strtotime and the files from the lib folder, and instantiate with a target and list of Nymph entity classes:

```html
<!-- Locutus strtotime (loading it manually) -->
<script type="text/javascript">
  if (typeof module !== "undefined") _module = module;
  module = {};
</script>
<script src="/node_modules/locutus/php/datetime/strtotime.js"></script>
<script type="text/javascript">
  strtotime = module.exports;
  delete module;
  if (typeof _module !== "undefined") module = _module;
</script>
<!-- Query Editor JS -->
<script src="/node_modules/nymph-query-editor/lib/ValueEditor.js"></script>
<script src="/node_modules/nymph-query-editor/lib/SelectorEditor.js"></script>
<script src="/node_modules/nymph-query-editor/lib/QueryEditor.js"></script>
<script type="text/javascript">
  ((global, QueryEditor) => {
    // If you don't use AMD or CJS, just do this:
    QueryEditor = (QueryEditor && QueryEditor.__esModule) ? QueryEditor["default"] : QueryEditor;
    const myQueryEditor = new QueryEditor({
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
  })(this, QueryEditor);
</script>
```

Then you can get the query by the options and selectors:

```js
const query = [myQueryEditor.get("options"), ...myQueryEditor.get("selectors")];
```

For a thorough step by step guide to setting up Nymph on your own server, visit the [Setup Guide](https://github.com/sciactive/nymph/wiki/Setup-Guide).

## API Docs

Check out the [API Docs in the wiki](https://github.com/sciactive/nymph/wiki/API-Docs).
