var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarrierSchema = new Schema({
  fid: {type: String, required: true, max: 100},
  code: {type: String, required: true, max: 100},
  ubication: {type: String, required: true, max: 100},
  name: {type: String, required: true, max: 100},
  previousStage: {type: String, required: true, max: 100},
  currentStage: {type: String, required: true, max: 100},
  nameOfCompany: {type: String, required: true, max: 100},
  image: {type: String, required: true, max: 100},
  description: {type: String, required: true, max: 100},
  driverName: {type: String, required: true, max: 100},
  origin: {type: String, required: true, max: 100},
  destination: {type: String, required: true, max: 100},
  plates: {type: String, required: true, max: 100},
  productPhotos: {type: String, required: true, max: 100},
  vehiclePhotos: {type: String, required: true, max: 100},
  tracking: {type: String, required: true, max: 100}
});

module.exports = mongoose.model('Carrier', CarrierSchema);
