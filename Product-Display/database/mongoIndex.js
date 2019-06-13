const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/products-sdc',{useNewUrlParser: true}); 

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', (() => { 
  console.log(`connected to db!`);
}))

const ProductSchema = new mongoose.Schema({ 
  product_id: Number, 
  name: String, 
  description: String, 
  cost: Number, 
  reviews: Number, 
  average_review: Number, 
  images: {
    img_1: String, 
    img_2: String, 
    img_3: String, 
    img_4: String, 
    img_5: String, 
    img_6: String, 
    img_7: String, 
  } 
})

const Product = mongoose.model('Product', ProductSchema, 'product'); 

const getAllProducts = (cb) => { 
  Product.find((err, allProducts) => { 
    if (err) { 
      throw err; 
    } else { 
      cb(null, allProducts)
    }
  });
};

const getProductInfo = (id, cb) => { 
  Product.find({'product_id': id}, (err, singleProduct) => { 
    console.log(id);
    if (err) { 
      console.log(err);
      throw err;
    } else { 
      cb(null, singleProduct)
    }
  }); 
}; 

const addProduct = (newProduct, cb) => { 
  console.log(newProduct);
  Product.findOne().sort('-product_id').exec((err, lastDoc) => { 
    if (err) { 
      console.log(err);
    } else { 
      let nextProduct_id = lastDoc.product_id; 
      nextProduct_id ++; 

      let nextProduct = { 
        product_id: nextProduct_id, 
        name: newProduct.product.name, 
        description: newProduct.product.description, 
        cost: newProduct.product.cost, 
        reviews: newProduct.product.reviews, 
        average_review: newProduct.product.average_review, 
        images: { 
          img_1: newProduct.images.img_1, 
          img_2: newProduct.images.img_2, 
          img_3: newProduct.images.img_3, 
          img_4: newProduct.images.img_4, 
          img_5: newProduct.images.img_5, 
          img_6: newProduct.images.img_6, 
          img_7: newProduct.images.img_7
        }
      }
      Product.create(nextProduct, (err) => { 
        if (err) { 
          cb(err); 
        } else { 
          cb(nextProduct.product_id); 
        }
      });
    }
  }); 
}; 

const updateProduct = (id, productInfo, cb) => { 
  Product.updateOne({ product_id: id }, 
    { 
      name: productInfo.product.name, 
      description: productInfo.product.description, 
      cost: productInfo.product.cost, 
      reviews: productInfo.product.reviews, 
      average_review: productInfo.product.average_review, 
      images: { 
        img_1: productInfo.images.img_1, 
        img_2: productInfo.images.img_2, 
        img_3: productInfo.images.img_3, 
        img_4: productInfo.images.img_4, 
        img_5: productInfo.images.img_5, 
        img_6: productInfo.images.img_6, 
        img_7: productInfo.images.img_7, 
      }
    }, (err) => { 
      if (err) { 
        cb(err); 
      } else { 
        cb(null)
      }
    });
}; 

const deleteProduct = (id, cb) => { 
  Product.deleteOne({ product_id: id }, (err) => { 
    if (err) { 
      cb(err)
    } else { 
      cb(err)
    }
  }); 
}

module.exports = { getAllProducts, getProductInfo, addProduct, updateProduct, deleteProduct }