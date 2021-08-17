'use strict'
var axios = require('axios');
var Carrier = require('../models/Carriers');
var User = require('../models/Users');

function dataTransaction(req, res){
  console.log(req.files);
  console.log(req.body);
  var carrier = new Carrier();
  carrier.fid = req.body.fid;
  carrier.code = req.body.code;
  carrier.ubication = req.body.ubication;
  carrier.name = req.body.name;
  carrier.previousStage = req.body.previousStage;
  carrier.currentStage = req.body.currentStage;
  carrier.nameOfCompany = req.body.nameOfCompany;
  carrier.image = req.body.image;
  carrier.description = req.body.description;
  carrier.driverName = req.body.driverName;
  carrier.origin = req.body.origin;
  carrier.destination = req.body.origin;
  carrier.plates = req.body.plates;
  carrier.productPhotos = req.body.productPhotos;
  carrier.vehiclePhotos = req.body.vehiclePhotos;
  carrier.tracking = req.body.tracking;
  carrier.save((err, carrierStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!carrierStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(carrierStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
        });
      }
    }
  });
}

function serviceInit(carrierStored, next) {
    var url = 'http://'+host+':'+port.traceability+''+path.traceability+'';
    axios.post(url, {
      id: carrierStored._id,
      fid: carrierStored.fid,
      code: carrierStored.code,
      ubication: carrierStored.ubication,
      name: carrierStored.name,
      previousStage: carrierStored.previousStage,
      currentStage: carrierStored.currentStage,
      image: carrierStored.image,
      description: carrierStored.description
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error);
    });
}

function dataOfCompany(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.nameOfCompany = req.body.nameOfCompany;
  user.save((err, userStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos para el usuario' });
    }else{
      if(!userStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado para el usuario' });
      }else{
        res.status(200).send({ message: true, user: userStored });
      }
    }
  });
}

function getCompany(req, res) {
  User.findOne({email: req.body.email}, (err, userStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!userStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: userStored});
      }
    }
  });
}

function getData(req, res) {
  Carrier.find((err, carrierStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!carrierStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: carrierStored});
      }
    }
  });
}

function getHistory(req, res) {
  var history = [];
  var query = { nameOfCompany: req.query.nameOfCompany.replace(/[$]+/g, ' ') };
  Carrier.find(query, (err, dataStored) => {
    if(err){
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(!dataStored){
        res.status(200).send({ history: null });
      }else{
        for(var data of dataStored){
          history.push(data);
        }
        res.status(200).send({ history: history });
      }
    }
  });
}

module.exports = {
	dataTransaction,
  dataOfCompany,
  getCompany,
  getData,
  getHistory
};
