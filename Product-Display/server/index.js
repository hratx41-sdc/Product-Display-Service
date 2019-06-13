const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/knexIndex')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true })); 


app.use(express.static('./client/public')) 

app.get('/products/:id', (req, res) => { 
  db.getProductInfo(req.params.id)
    .then((productInfo) => { 
      res.send(productInfo)
    })
    .catch(err => { 
      res.send(err)
    });
}); 


// app.get('/products/:id', (req, res) => { 
//   let product = {}; 
//   db.getProductInfo(req.params.id)
//     .then(productInfo => { 
//       product.info = productInfo; 
//     })
//     .then(() => { 
//       db.getProductImages(req.params.id)
//         .then(productImages => { 
//           // console.log(productImages);
//           product.images = productImages; 
//           res.send(product)
//         })
//     })
//     .catch(err => { 
//       console.log(err);
//       res.status(400).send()
//     }); 
// }); 

app.post('/products', (req, res) => { 
  db.addProduct(req.body)
    .then((id => { 
      res.send(id)
    }))
    .catch(err => {
      res.send(err)
    });
});

app.put('/products/:id', (req, res) => { 
  db.updateProduct(req.params.id, req.body) 
    .then((id) => { 
      res.send(`${id} updated.`)
    })
    .catch(err => {
      res.send(err)
    });
}); 

app.delete('/products/:id', (req, res) => { 
  // console.log(req.params.id);
  db.deleteProduct(req.params.id) 
    .then((id) => { 
      // res.send(data)
      res.send(`${id} product deleted.`)
    })
    .catch((err) => { 
      res.send(err)
    });
}); 


app.listen(3003, () => {
  console.log('listening on port 3003')
})

// BELOW syntax/for expected for POST/PUT reqs. 
// {
//   "product": 
//     {
//       "name": "todd test post", 
//       "description": "yadda YADDA yadda.", 
//       "cost": 884, 
//       "reviews": 10,  
//       "average_review": 5 
//     },
//   "images": 
//     {
//       "img_1": "http://lorempixel.com/640/480/",  
//       "img_2": "http://lorempixel.com/640/480/fashion/", 
//       "img_3": "http://lorempixel.com/640/480/", 
//       "img_4": "http://lorempixel.com/640/480/", 
//       "img_5": "http://lorempixel.com/640/480/",  
//       "img_6": "http://lorempixel.com/640/480/",  
//       "img_7": "http://lorempixel.com/640/480/" 
//     }
// }

// BELOW syntax/for expected for POST/PUT reqs. 
// FOR MONGO
// {
//   "product_id": 1,
//   "name": "Tasty Steel Computer",
//   "description": "Sed reprehenderit debitis beatae aut provident ratione tempora in incidunt. Repellendus ut itaque odio similique. Quia distinctio molestiae ullam veniam tenetur reprehenderit sed.",
//   "cost": "50.00",
//   "reviews": 11,
//   "average_review": 1,
//   "images": {
//     "img_1": "http://lorempixel.com/640/480/fashion/",
//     "img_2": "http://lorempixel.com/640/480/fashion/",
//     "img_3": "http://lorempixel.com/640/480/fashion/",
//     "img_4": "http://lorempixel.com/640/480/fashion/",
//     "img_5": "http://lorempixel.com/640/480/fashion/",
//     "img_6": "http://lorempixel.com/640/480/fashion/",
//     "img_7": "http://lorempixel.com/640/480/fashion/"
//   }