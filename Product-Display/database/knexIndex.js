require('dotenv').config(); 

const knex = require('knex')({ 
  client: 'pg', 
  connection: { 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE
  }
}); 

const getProductInfo = (id) => { 
  let product = {}
  return knex('information')
    .where('product_id', id)
    .select()
    .then((productInfo) => { 
      product.info = productInfo;
    })
    .then(() => { 
      return knex('images')
        .where('product_id', id)
        .select()
        .then((productImages) => { 
          product.images = productImages; 
          return product;
        })
    })
  .catch((err) => err); 
}

// const getProductInfo = (id) => { 
//   return knex('information')
//     .where('product_id', id )
//     .select() 
//   .catch((err) => err); 
// }

const getProductImages = (id) => { 
  return knex('images')
    .where('product_id', id)
    .select() 
  .catch((err) => err);
} 

const addProduct = (product) => { 
  return knex('information')
    .insert(product.info)
    .then(() => { 
      return knex('images') 
        .insert(product.images, 'product_id')
    })
    .catch((err) => err); 
}

const updateProduct = (id, product) => { 
  return knex('information')
    .where('product_id', id)
    .update(product.info)
    .then(() => { 
      return knex('images') 
        .where('product_id', id)
        .update(product.images, 'product_id')
    })
    .catch((err) => err); 
}

const deleteProduct = (id) => { 
  return knex('images')
    .where('product_id', id)
    .del()
    .then(() => { 
      return knex('information')
        .where('product_id', id)
        .del()
    })
    .catch((err) => err);
}

module.exports = { getProductInfo, getProductImages, addProduct, updateProduct, deleteProduct }
