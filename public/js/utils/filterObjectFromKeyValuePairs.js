function DeleteKeys(myObj, array) {
    for (let index = 0; index < array.length; index++) {
        delete myObj[array[index]];
    }
    return myObj;
}