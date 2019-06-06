const faker = require('faker'); 

exports.seed = function(knex, Promise) {

  const fakeRows = []; 
  const maxFakeRows = 5; 

  for (let i =0; i <maxFakeRows; i++) { 
    fakeRows.push(createFakeRow()); 
  }

  // Deletes ALL existing entries
  return knex('information_and_images').del()
    .then(() => {
      // Inserts seed entries
      return knex('information_and_images')
        .insert(fakeRows);
    });
};


const faker = require('faker'); 

const createFakeRow = () => ({ 
  name: faker.commerce.productName(), 
  description: '',
  cost: faker.commerce.price(), 
  reviews: Math.floor(Math.random() * 21), 
  average_review: Math.floor(Math.random() * 6), 
  UUID: Math.floor(Math.random() * 101) + 1, 
  img_1: faker.image.imageUrl(), 
  img_2: faker.image.imageUrl(), 
  img_3: faker.image.imageUrl(), 
  img_4: faker.image.imageUrl(), 
  img_5: faker.image.imageUrl(), 
  img_6: faker.image.imageUrl(), 
  img_7: faker.image.imageUrl()
});

exports.seed = function(knex, Promise) { 

  const fakeReviews = []; 
  const maxFakeReviews = 1000; 

  for (let i = 0; i < maxFakeReviews; i ++) { 
    fakeReviews.push(createFakeReview()); 
  }
  // Deletes ALL existing entries
  return knex('review')
    .insert(fakeReviews)
};

