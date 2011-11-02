require("./../lib/index").extendNative();

var test_string = "this is a simple test string to test toolkit";

console.log("'%s'", test_string);
console.log("- has %d words", test_string.words().length);

var word = test_string.words()[4];

console.log("- the 5th word is '%s'", word);
console.log("- which appears %d time(s)", test_string.count(word));
console.log("- repeated 2 times would be '%s'", word.repeat(2));
console.log("- inverted would be '%s'", word.reverse());
console.log("- padded to 10 chars with '-' would be '%s'", word.pad(10, '-'));
console.log("- padded on both sides to 10 chars with '-' would be '%s'", word.pad(10, '-', 'center'));