import mongoose from 'mongoose';
import express from 'express';
import * as db from './model/model.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded(({extended: false})));
app.use(bodyParser.json());
app.use(cors());





// create a list
app.post('/', (req, res) => {
  db.createList(req.body.firstName, req.body.lastName, req.body.list_name)
  .then(user => {                      
      res.status(201).json(user);
  })
  .catch(error => {
      res.status(500).json({Error: 'Request failed' });
      console.log(error);
      })
});


// add restaurant to restaurants array in list
app.put('/', (req, res) => {
  var listName = req.query.list_name; 
  db.addRestaurantToList(listName, req.body.title, req.body.category, req.body.img, 
        req.body.city, req.body.latitude, req.body.longitude)
  .then(result => {
    res.status(201).json(result);
  })
  .catch(error => {
    res.status(500).json({Error: 'Request failed' });
    console.log(error);
    })
})    



// find a list by id
app.get('/:_id', (req, res) => {
  const id = req.params._id;
  db.findList(id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).json({Error: 'Request failed' });
    console.log(error);
  })
});



//find all the list for drop down selection
app.get('/', (req, res) => {
  const filter = {}
  db.findAllList(filter)
  .then(result => {
    res.status(201).json(result);
  })
  .catch(error => {
    res.status(500).json({Error: 'Request failed' });
    console.log(error);
  })
}); 



//delete restaurant from the list by RESTAURANT ID
app.delete('/', (req, res) => {
  var list_id = req.query.list_id;
  var restaurant_id = req.query.restaurant_id;
  db.deleteRestaurant(list_id, restaurant_id)
  .then(deletedCount => {
    if (deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(500).json({Error: 'Object not found'});
    }
  })
  .catch(error => {
    res.status(500).json({Error: 'Request failed' });
    console.log(error);
  })
});




app.listen(PORT, () => {
  console.log(`NodeJS server is running on ${PORT}`);
}); 