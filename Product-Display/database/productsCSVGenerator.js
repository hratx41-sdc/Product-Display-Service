const faker = require('faker'); 
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier; 
const fs = require('fs'); 

let maxRecords = 10000000; 

const csvStringifier = createCsvStringifier({ 
  append: true, 
  path: '../dbSeed.csv', 
  header: [ 
    { id: 'product_id', title: 'product_id' }, 
    { id: 'name', title: 'name' }, 
    { id: 'description', title: 'description'}, 
    { id: 'cost', title: 'cost'}, 
    { id: 'reviews', title: 'reviews'}, 
    { id: 'average_review', title: 'average_review'}, 
  ]
}); 

fs.writeFileSync('SQLProducts.csv', csvStringifier.getHeaderString(), (err) => { 
  if (err) throw err;  
  console.log(`header added to file`);
}); 

for (let i = 1; i < maxRecords; i++) { 
  let record = [{ 
    product_id: i, 
    name: faker.commerce.productName(), 
    description: faker.lorem.paragraph(),
    cost: faker.commerce.price(), 
    reviews: Math.floor(Math.random() * 21), 
    average_review: Math.floor(Math.random() * 6), 
  }]

  fs.appendFileSync('SQLProducts.csv', csvStringifier.stringifyRecords(record), (err) => { 
    if (err) throw err; 
    console.log(i);
  })
}