const boxesData = require('./boxes.json')
const orderData = require('./orders.json')

let small = {}, medium = {}, large = {}, totalBoxes = 0, totalEmissions = 0

calculateBoxSize()
calculateOrderSize()
orderBoxing()
co2Calculation()

function calculateBoxSize() {

  // const boxSizes = boxesData.map(box => {
  //   return {
  //      size: box.dimensions.widthMm * box.dimensions.heightMm * box.dimensions.depthMm /1000,
  //      id: box.id,
  //      co2FootprintKg: box.co2FootprintKg
  //     }
  //   })
  // return boxSizes;

  boxesData.forEach(e => {
    let sizeCubed = e.dimensions.widthMm * e.dimensions.heightMm * e.dimensions.depthMm
    if (e.name === 'Small') {
      small.size = sizeCubed / 1000
      small.co2 = e.co2FootprintKg
    }
    else if (e.name === 'Medium') {
      medium.size = sizeCubed / 1000
      medium.co2 = e.co2FootprintKg
    }
    else {
      large.size = sizeCubed / 1000
      large.co2 = e.co2FootprintKg
    }
  })
}

function calculateOrderSize() {

  return orderData.map(e => {
    totalBoxes++
    let orderIngSize = e.ingredients.reduce((orderSize, a) => {
      return orderSize + a.volumeCm3
    }, 0)
    return {'id': e.id, 'totalsize': orderIngSize}
  })
}


// assign each order to a box, output the id and size
function orderBoxing() {

  calculateOrderSize().forEach((item, i) => {
    if(item.totalsize <= small.size) {
      item.box = "Small"
      item.emissions = small.co2
    } else if (item.totalsize <= medium.size ) {
      item.box = "Medium"
      item.emissions = medium.co2
    } else {
      item.box = "Large"
      item.emissions = large.co2
    }
    totalEmissions += item.emissions
    console.log(item)
  });

}

// Calculate box sizes co2 emmisisons
function co2Calculation() {
  let maxEmissions = 0
  maxEmissions = totalBoxes * large.size
  let emissionsSaved = maxEmissions - totalEmissions
  console.log(`We have saved ${emissionsSaved}kg of emissions, which is a total of ${emissionsSaved / 1000} trucks worth.`)
}
