import mongoose from 'mongoose';
import express from 'express';
import * as db from './model/model.js';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 3000;

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


// add a show
app.post('/:_id', (req, res) => {
  var listId = req.params._id;
  db.addShowToList(listId, req.body.title, req.body.genre, req.body.streamingService)
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
    res.status(201).json(user.shows);
  })
  .catch(error => {
    res.status(500).json({Error: 'Request failed' });
    console.log(error);
  })
});



//find all the lists
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



//delete a show
app.delete('/show', (req, res) => {
  var list_id = req.query.list_id;
  var show_id = req.query.show_id;
  db.deleteShow(list_id, show_id)
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



//delete a list by _id
app.delete('/:_id', (req, res) => {
  const listId = req.params._id

  db.deleteById(listId)
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