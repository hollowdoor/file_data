file-data
====

Install
----

`npm install file-data`

Usage
---

```javascript
const FileData = require('file-data');
//f has info about the file
let f = new FileData('./files/index.html');

```

The structure
----

```
FileData {
    basename,
    dir,
    ext,
    filename,
    mimetype,
    name,
    stats,
    type,
    format()
}
```


About
---

Use `new FileData('filename')` to get an object with a bunch of info about a file.
