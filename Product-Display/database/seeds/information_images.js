const faker = require('faker'); 

const createProductDescription = () => ({ 
  name: faker.commerce.productName(), 
  description: faker.lorem.paragraph(),
  cost: faker.commerce.price(), 
  reviews: Math.floor(Math.random() * 21), 
  average_review: Math.floor(Math.random() * 6), 
});

const createProductDisplay = () => ({ 
  img_1: `http://lorempixel.com/640/480/fashion/`, 
  img_2: `http://lorempixel.com/640/480/fashion/`, 
  img_3: `http://lorempixel.com/640/480/fashion/`, 
  img_4: `http://lorempixel.com/640/480/fashion/`, 
  img_5: `http://lorempixel.com/640/480/fashion/`, 
  img_6: `http://lorempixel.com/640/480/fashion/`, 
  img_7: `http://lorempixel.com/640/480/fashion/`, 
}); 

exports.seed = async function(knex, Promise) {

  const maxRows = 10000
  
  // return knex('information').del()
  //   .then(() => {
  //     return knex('images').del()
  //   })
  //   .then(() => { 
      for (let i = 0; i < maxRows; i ++) { 
        await knex('information')
          .insert(createProductDescription())
          .then(() => { 
            return knex('images')
              .insert(createProductDisplay());
          });
      }
    // })
};

// http://lorempixel.com/640/480/fashion/