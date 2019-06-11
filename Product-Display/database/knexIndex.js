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
  return knex('information')
    .where('product_id', id )
    .select() 
  .catch((err) => err); 
}

const getProductImages = (id) => { 
  return knex('images')
    .where('product_id', id)
    .select() 
  .catch((err) => err);
} 

const addProduct = (totalInfo) => { 
  return knex('information')
    .insert(totalInfo.product)
    .then(() => { 
      return knex('images') 
        .insert(totalInfo.images, 'product_id')
    })
    .catch((err) => err); 
}

const updateProduct = (id, totalInfo) => { 
  return knex('information')
    .where('product_id', id)
    .update(totalInfo.product)
    .then(() => { 
      return knex('images') 
        .where('product_id', id)
        .update(totalInfo.images, 'product_id')
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
