# batchd

Batchd is a simple script that collects items and then executes a callback 
once it has collected enough items.

When you are dealing with large volumes of data in a OLTP environment, you 
need to ensure that you are handling data efficiently. That means batching 
things like database queries. 

# Installation
```
npm install batchd
```

# Usage
```js
var Batches = require('batchd'),
	collection;

collection = new Batches({
	max_items: 100,
	callback: function(items) {
		// do something with the 100 items
	}
});


// whenever you want to add to this collection
collection.add({id: 1, data_attr: 2});
```

Batches will ensure that your collection is ONLY triggered when the 
desired number of items are collected internally.
