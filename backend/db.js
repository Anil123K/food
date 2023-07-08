const mongoose = require('mongoose');
const mongoURI='mongodb+srv://shubiitg15:UNyKRAzt8rc93FJ3@cluster0.9tpcafi.mongodb.net/foodifymern?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_items");
      let foodCategory = mongoose.connection.db.collection("foodCategory");
      let data=await fetched_data.find({}).toArray() 
      let catData=await foodCategory.find({}).toArray()
      global.food_items=data;
      global.foodCategory=catData;
    } catch (error) {
      console.log('err: ', error);
    }
  };

module.exports = mongoDB;

