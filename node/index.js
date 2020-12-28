const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')

const carSchema = new mongoose.Schema({
  SlotNo : Number,
  RegNo : String,
  Color : String
})

const Car = new mongoose.model('Car',carSchema)

mongoose.connect('mongodb://localhost/car',{useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/cars',async(req,res,next)=>{
  const car = await Car.find()
  res.send(car)
})

app.post('/api/cars', async (req, res,next) => {
  const { error } = validateCar(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let car = new Car({ 
    SlotNo: req.body.SlotNo,
    RegNo: req.body.RegNo,
    Color: req.body.Color 
  });
  const result = await car.save();
  res.send(result);
});

app.delete('/api/cars/:id',async(req,res,next)=>{
  const car = await Car.findByIdAndRemove(req.params.id)
  if (!car) return res.status(404).send('The car with the given SlotNo was not found.');
  res.send(car);
})

function validateCar(car) {
  const schema = Joi.object({
    SlotNo: Joi.number().required(),
    RegNo: Joi.string().required(),
    Color: Joi.string().required()
  });
  return schema.validate(car);
}

