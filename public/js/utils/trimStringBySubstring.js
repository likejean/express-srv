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