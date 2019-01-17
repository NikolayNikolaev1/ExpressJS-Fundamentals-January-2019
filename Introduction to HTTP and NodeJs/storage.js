const fs = require("fs");
let storage = {};

//Note: Not using 'throw new Erorr();' because of example in the exercise.
module.exports = {
    put:(key, value) => {
        if (typeof(key) === "string") {
            if (!storage.hasOwnProperty(key)) {
                storage[key] = value;
            } else {
                return "Key already exists.";
            }
        } else {
            return "The key should be string.";
        }
    },
    get:(key) => {
        if (typeof(key) === "string") {
            if (storage.hasOwnProperty(key)) {
                return storage[key];
                
            } else {
                return"The key does not exists."
            }
        } else {
            return "The key should be string.";
        }
    },
    getAll:() => {
        if (Object.keys(storage).length === 0) {
            return "There are no items in the storage.";
        }

        return storage;
    },
    update:(key, newValue) => {
        if (typeof(key) === "string") {
            if (storage.hasOwnProperty(key)) {
                storage[key] = newValue;
            } else {
                throw new Error("Key does not exists.");
            }
        } else {
            return "The key should be string.";
        }
    },
    delete:(key) => {
        if (typeof(key) === "string") {
            if (storage.hasOwnProperty(key)) {
                delete storage[key];
            } else {
                return "Key does not exists.";
            }
        } else {
            return "The key should be string.";
        }
    },
    clear:() => { 
        storage = {};
    },
    save:() => {
        fs.writeFileSync("storage.json", JSON.stringify(storage));
    },
    load:() => {
        if (fs.existsSync("storage.json")) {
            let data = fs.readFileSync("storage.json");
            storage = JSON.parse(data);
        }
    }
}