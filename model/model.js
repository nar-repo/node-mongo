import { MongoNetworkError, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;



const uri = "mongodb+srv://XXXXXXXX@cluster0.uaud6cv.mongodb.net/app1?retryWrites=true&w=majority"
mongoose.connect(
  uri,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },(err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");}
});


// streamingNetwork : Netflix, hbomax, amazon etc...
const listSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  list_name: {type: String, required: true, unique: true},
  shows: [{title: String, genre: String, streamingService: String}]  
});
const WishList = model('Wishlist', listSchema);



//create list 
const createList = async (firstName, lastName, list_name) => {
  const wish = new WishList({firstName: firstName, lastName:lastName, list_name: list_name,
    shows:{title: "Placeholder", genre:"None", streamingService:"None"}});
  return wish.save();
}



// add shows to the list
const addShowToList = async (listId, title, genre, streamingService) => {   

  const newShow = await WishList.findOneAndUpdate({_id: mongoose.Types.ObjectId(listId)},
    {$push: {shows: {title: title, genre:genre, streamingService: streamingService}}})
  
  //const updated = WishList.find({list_name: list_name})
  return newShow.save()
}



//find list by _id 
const findList = async (filter) => {
  const query = await WishList.findById(mongoose.Types.ObjectId(filter))
  return query
} 



//find all lists
const findAllList = async (filter) => {
  const query = await WishList.find(filter)  
  return query
} 



//delete a show
const deleteShow= async (listId, showId) => {
  const deleted = await WishList.findOneAndUpdate({_id: mongoose.Types.ObjectId(listId)},
    {$pull: {shows: {_id: mongoose.Types.ObjectId(showId)}}})
  
  return deleted.deletedCount;
}


//delete a list by _id
const deleteById = async (_id) => {
  const result = await WishList.remove({_id: _id});
  return result.deletedCount;
}



export {createList, findList, findAllList, addShowToList, deleteShow, deleteById, WishList}
