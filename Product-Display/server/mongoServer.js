const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../database/mongoIndex'); 

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true })); 


app.use(express.static('./client/public')) 

app.get('/products/', (req, res) => { 
  db.getAllProducts((err, allProducts) => { 
    if (err) { 
      console.log(err);
      res.status(400).end(); 
    } else { 
      res.send(allProducts)
    }
  }); 
}); 

app.get('/products/:id', (req, res) => { 
  db.getProductInfo(parseInt(req.params.id), (err, product) => { 
    if (err) { 
      res.status(400).end(); 
    } else { 
      res.send(product)
    }
  });
}); 

app.post('/products/', (req, res) => { 
  db.addProduct(req.body, (err, product) => { 
    if (err) { 
      res.status(400).end(); 
    } else { 
      res.send(product)
    }
  }); 
});

app.put('/products/:id', (req, res) => { 
  db.updateProduct(parseInt(req.params.id), req.body, (err, product) => { 
    if (err) { 
      res.status(400).end()
    } else { 
      res.send(product)
    }
  }); 
}); 

app.delete('/products/:id', (req, res) => { 
  // console.log(req.params.id);
  db.deleteProduct(parseInt(req.params.id), (err) => { 
    if (err) { 
      res.status(400).end()
    } else { 
      res.send(`deletion successful`)
    }
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