const faker = require('faker'); 
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier; 
const fs = require('fs'); 

let maxRecords = 10000000; 

const csvStringifier = createCsvStringifier({ 
  append: true, 
  path: '../dbSeed.csv', 
  header: [ 
    { id: 'product_id', title: 'product_id' }, 
    { id: 'img_1', title: 'img_1' }, 
    { id: 'img_2', title: 'img_2' }, 
    { id: 'img_3', title: 'img_3' }, 
    { id: 'img_4', title: 'img_4' }, 
    { id: 'img_5', title: 'img_5' }, 
    { id: 'img_6', title: 'img_6' }, 
    { id: 'img_7', title: 'img_7' }, 
  ]
}); 

fs.writeFileSync('SQLImages.csv', csvStringifier.getHeaderString(), (err) => { 
  if (err) throw err;  
  console.log(`header added to file`);
}); 

for (let i = 1; i < maxRecords; i++) { 
  let record = [{ 
    product_id: i, 
    img_1: `http://lorempixel.com/640/480/fashion/`, 
    img_2: `http://lorempixel.com/640/480/fashion/`, 
    img_3: `http://lorempixel.com/640/480/fashion/`, 
    img_4: `http://lorempixel.com/640/480/fashion/`, 
    img_5: `http://lorempixel.com/640/480/fashion/`, 
    img_6: `http://lorempixel.com/640/480/fashion/`, 
    img_7: `http://lorempixel.com/640/480/fashion/`, 
  }]

  fs.appendFileSync('SQLImages.csv', csvStringifier.stringifyRecords(record), (err) => { 
    if (err) throw err; 
    // console.log(i); <-- it didn't print anyways
  })
}