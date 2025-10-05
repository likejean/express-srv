//this function trims all occurrences of a specified substring from both the start and end of a given string
//it is used to clean up strings by removing unwanted leading and trailing substrings
//example usage: trimBySubstring("...Hello World...","...") returns "Hello World"
function trimBySubstring(str, substr) {
    // Trim from the beginning
    while (str.startsWith(substr)) {
        str = str.slice(substr.length);
    }
    // Trim from the end
    while (str.endsWith(substr)) {
        str = str.slice(0, -substr.length);
    }
    return str;
}