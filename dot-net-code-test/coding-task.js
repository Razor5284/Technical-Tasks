// Task 1
// Create a function which counts the number of occurrences of a given letter in a string.
function charCounter(l, s) {
    return s.split("").reduce((a, b) => (b === l ? a + 1 : a), 0)
}

// charCounter('e', 'I have some cheese') // 5
// charCounter("w", "I look forward to working at Vuture") // 2
// charCounter("I", "I look forward to working at Vuture") // 1
// charCounter("i", "I look forward to working at Vuture") // 1
// charCounter("z", "The weather outside is cold.") // 0
// charCounter(".", "The weather outside is cold.") // 1
// charCounter(".", ".-.-.-.-.-.-.-??!!-/-.") // 8


// Task 2
// Create a function which decides if a string is a palindrome.
function isPalendrome(s) {
    let input = s.toLowerCase().replace(/[^\w]/gi, '')
    let r = input.split("").reverse().join("")
    return input === r ? true : false
}
// isPalendrome("I have some cheese") // False
// isPalendrome("God saved Eva’s dog") // True
// isPalendrome("Mr. Owl ate my metal worm") // True
// isPalendrome("Do geese see God?") // True
// isPalendrome("Was it a car or a cat I saw?") // True
// isPalendrome("Murder for a jar of red rum" ) // True
// isPalendrome("Go hang a salami, I'm a lasagna hog") // True
// isPalendrome("Go hang a salami, am a lasagna hog") // False


// Task 3
// A)
// Create a function which counts the number of occurrences of words from a "censored words list" in a text.
// I realise here I need to loop through the words in the text and match them to the array, then output the string, instead of the other way around.
// It wasn't until it was too late before I noticed this, however.
function censoredWordCounter(wordList, text) {
  let total = 0, output = ""
  for (let i = 0; i < wordList.length; i++) {
    let word = wordList[i]
    let count = text.toLowerCase().split(wordList[i].toLowerCase()).length - 1
    total += count
    output += word + ": " + count + ", "
  }
  output += "total: " + total
  return output
}
// censoredWordCounter(["dog", "cat", "large"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.") // cat: 1, dog: 2, large: 1, total: 4



// B)
// Create a way to censor words featured in the "censored words list" that appear in the text.
function censorWords(wordList, text) {

   for (let i = 0; i < wordList.length; i++) {
        let search = wordList[i]
        let searchRegExp = new RegExp(search, 'gi')
        let index = text.search(searchRegExp)
        let replaceWith = "*"
        if (wordList[i].length > 2) {
            replaceWith = text.charAt(index) + "*".repeat(wordList[i].length-2) + text.charAt(index + (wordList[i].length - 1))
        }
        text = text.replace(searchRegExp, replaceWith)
   }
return text
}
      //let newText = text.toLowerCase().replace(/[^\w ]/gi, '').split(" ")
      //text = text.split(" ")
//         let index = newText.indexOf(wordList[i].toLowerCase())
//         let newWord = text[index]
//         newWord = newWord.charAt(0) + "*".repeat(newWord.length-2) + text[index].charAt(newWord.length - 1)
//         index ? text.splice(index, 1, newWord) : ""
//    }
//     return text.join(" ")

//     let word = wordList[i].toLowerCase(), censor = ""
//     let character = newText.indexOf(word)
//     let endCharacter = newText.indexOf(word) + (word.length - 1)
//     text = text.replace(word, text.charAt(character) + "*".repeat(word.length-2) + text.charAt(endCharacter))
//   }
//   return text
//censorWords(["meow", "woof"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")
//censorWords(["cat", "DOG"], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")

// C
// Create a way to censor a single word palindrome in a text.
function censorPalindrome(text) {
  text = text.split(" ")

  for (let i = 0; i < text.length; i++) {
    if (isPalendrome(text[i])) {
      let word = text[i]
      text.splice(text.indexOf(word), 1, word.charAt(0) + "*".repeat(word.length-2) + word.charAt(word.length-1))
    }
  }
  return text.join(" ")
}

// censorPalindrome("Anna went to vote in the election to fulfil her civic duty")
// censorPalindrome("BoB went to vote in the election to fulfil his civic duty")

module.exports = { censorPalindrome: censorPalindrome, censorWords: censorWords,
                  censoredWordCounter : censoredWordCounter, isPalendrome: isPalendrome,
                  charCounter: charCounter }
// Part D - BONUS)
// Come up with at least 3 different ways to provide the "censored words list" to the application. This task does not require coding, please send us 3 bullet points on how you would do this.

// - JSON array
// - Console input
