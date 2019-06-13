const faker = require('faker'); 
const fs = require('fs'); 

let maxRecords = 11; 

fs.writeFileSync('MongoProducts.json', '[', (err) => { 
  if (err) throw err;  
  console.log(`header added to file`);
}); 

for (let i = 1; i < maxRecords; i++) { 

  let collectionString = '';

  let name = faker.commerce.productName(); 
  let description = faker.lorem.paragraph(); 
  let cost = faker.commerce.price(); 
  let reviews = Math.floor(Math.random() * 21); 
  let average_review = Math.floor(Math.random() * 6); 

  let record = { 
    product_id: i, 
    name: name, 
    description: description,
    cost: cost, 
    reviews: reviews, 
    average_review: average_review, 
    images: {
      img_1: `http://lorempixel.com/640/480/fashion/`, 
      img_2: `http://lorempixel.com/640/480/fashion/`, 
      img_3: `http://lorempixel.com/640/480/fashion/`, 
      img_4: `http://lorempixel.com/640/480/fashion/`, 
      img_5: `http://lorempixel.com/640/480/fashion/`, 
      img_6: `http://lorempixel.com/640/480/fashion/`, 
      img_7: `http://lorempixel.com/640/480/fashion/`, 
    } 
  }; 

  if (i === (maxRecords -1)) { 
    collectionString += JSON.stringify(record);
  } else { 
    collectionString += (JSON.stringify(record) + ',');
  }

  fs.appendFileSync('MongoProducts.json', collectionString, (err) => { 
    if (err) throw err; 
    console.log(i);
  }); 
}

fs.appendFileSync('MongoProducts.json', ']', (err) => { 
  if (err) throw err; 
  console.log('Finished!')
}); 
