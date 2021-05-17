const codingTask = require('./coding-task.js');

test('char count = 5', () => {
  expect(codingTask.charCounter('e', 'I have some cheese')).toBe(5);
});

test('char count = 2', () => {
  expect(codingTask.charCounter('w', 'I look forward to working at Vuture')).toBe(2);
});

test('char count = 1', () => {
  expect(codingTask.charCounter('I', 'I look forward to working at Vuture')).toBe(1);
});

test('char count = 1', () => {
  expect(codingTask.charCounter('i', 'I look forward to working at Vuture')).toBe(1);
});

test('char count = 0', () => {
  expect(codingTask.charCounter('z', 'The weather outside is cold.')).toBe(0);
});

test('char count = 1', () => {
  expect(codingTask.charCounter('.', 'The weather outside is cold.')).toBe(1);
});

test('char count = 8', () => {
  expect(codingTask.charCounter('.', '.-.-.-.-.-.-.-??!!-/-.')).toBe(8);
});


test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('I have some cheese')).toBe(false);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('God saved Eva’s dog')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Mr. Owl ate my metal worm')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Do geese see God?')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Was it a car or a cat I saw?')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Murder for a jar of red rum')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Go hang a salami, I\'m a lasagna hog')).toBe(true);
});

test('Check if the string is a palendrome, should = true', () => {
  expect(codingTask.isPalendrome('Go hang a salami, am a lasagna hog')).toBe(false);
});

test('Count the number of censored words from the list in the text', () => {
  expect(codingTask.censoredWordCounter(["dog", "cat", "large"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")).toBe("cat: 1, dog: 2, large: 1, total: 4");
});

test('Count the number of censored words from the list in the text', () => {
  expect(codingTask.censoredWordCounter(["word", "CAT", "large", "horse"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")).toBe("word: 0, CAT: 1, large: 1, horse: 1, total: 3");
});

test('Censor words in a string that are featured in a list', () => {
  expect(codingTask.censorWords(["meow", "woof"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")).toBe("I have a cat named M**w and a dog name W**f. I love the dog a lot. He is larger than a small horse.");
});

test('Censor words in a string that are featured in a list', () => {
  expect(codingTask.censorWords(["cat", "DOG"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")).toBe("I have a c*t named Meow and a d*g name Woof. I love the d*g a lot. He is larger than a small horse.");
});

test('Censor words in a string that are featured in a list', () => {
  expect(codingTask.censorWords(["I", "HAVE", "a", "rabbit"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")).toBe("* h**e * c*t n*med Meow *nd * dog n*me Woof. * love the dog * lot. He *s l*rger th*n * sm*ll horse.");
});

test('Censor single word palindomes in a text', () => {
  expect(codingTask.censorPalindrome("Anna went to vote in the election to fulfil her civic duty")).toBe("A**a went to vote in the election to fulfil her c***c duty");
});

test('Censor single word palindomes in a text', () => {
  expect(codingTask.censorPalindrome("Bob went to vote in the election to fulfil his civic duty")).toBe("B*b went to vote in the election to fulfil his c***c duty");
});
