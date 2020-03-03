/**
* The following is the function where the solution shall be written
*/

function solution (input) {
  input = input.replace(/[A-Z]/g, "").replace(/ /g,'') //Removes all letters and whitespace
  input = input.split('').filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          }).join(''); //Extra code to remove duplicate numbers.
  let output = []
  for (let i = 0; i < input.length; i++) {
    let newStr = input.charAt(i)
    for (let j = 0; j < input.length; j++) {
      if (input.charAt(i) === input.charAt(j)) continue
      newStr += input.charAt(j)
    }
    output.push(newStr)
  }
  if (input.length > 2) { //Doesn't need to do this section if the input length is <=2
    for (let i = input.length -1; i > -1; i--) {
      let newStr = input.charAt(i)
      for (let j = input.length; j > -1; j--) {
         if (input.charAt(i) === input.charAt(j)) continue
        newStr += input.charAt(j)
      }
	    output.push(newStr)
    }
  }
  return output = output.sort(function(a, b){return b-a}).join() //Sorted output by descending
}
console.log(solution('632')); // expected output 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected output 632,623,362,326,263,236
console.log(solution('666')); // expected 6
console.log(solution('6688')); // expected output 86,68
