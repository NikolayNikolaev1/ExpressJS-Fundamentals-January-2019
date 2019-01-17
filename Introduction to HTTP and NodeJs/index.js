const storage = require("./storage");

//Note: Delete storage.json before running.
//First example.
storage.load();
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fouth','fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.delete('second');
storage.update('first','updatedFirst');
storage.save();
storage.clear();
console.log(storage.getAll());
storage.load();
console.log(storage.getAll());

//Second examples.
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.delete('second')
storage.delete('second')
//..
storage.put(2,'someValue')
//..
storage.put('cat','dog')
storage.put('cat','anotherDog')

