// First, the user must install and complete the necessary setup of node, as the solution is run in this environment.
//
console.log("TEst")
function csvJSON(csv){
  console.log("Test")
  let lines = csv.split("\n");

  let result = [];

  let headers = lines[0].split(",");
  console.log(csv)
  for (let i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return JSON.stringify(result);
}
//
// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "products.csv",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });
//
// function processData(allText) {
//     var allTextLines = allText.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];
//
//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {
//
//             var tarr = [];
//             for (var j=0; j<headers.length; j++) {
//                 tarr.push(headers[j]+":"+data[j]);
//             }
//             lines.push(tarr);
//         }
//     }
//     // alert(lines);
// }
