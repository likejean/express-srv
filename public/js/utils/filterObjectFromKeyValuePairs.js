//this function deletes keys from an object based on an array of keys
// and returns the modified object
function DeleteKeys(myObj, array) {
    for (let index = 0; index < array.length; index++) {
        delete myObj[array[index]];
    }
    return myObj;
}