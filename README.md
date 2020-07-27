<!-- @format -->

# Unegui Searcher

This project is for people who want to deep search from https://www.unegui.mn .

## How to use

This script will crawls ads then filters datas.

```sh
$ git clone git@github.com:enkhee-Osiris/search-from-unegui.git unegui
$ cd unegui
$ npm install
$ node index.js > result.org
```

And wait...

### To edit the filter

You can change keywords.

```javascript
const keywords = ['гал тогоо тусдаа', 'гал тогоо', 'gal togoo', 'gal togoo tusdaa'];
```

And filter function

```javascript
if (
  (regex.test(result.description) || regex.test(result.title)) &&
  Number(result.attrs.attrs__davhar) !== Number(result.attrs.attrs__davhar1) &&
  Number(result.attrs.attrs__davhar1) > 2 &&
  Number(result.attrs.attrs__ashon) >= 2000 &&
  ((Number(result.price) <= 10000000 &&
    Number(result.price) * Number(result.attrs.attrs__talbai) <= 120000000) ||
    Number(result.price) <= 120000000)
) {
```
