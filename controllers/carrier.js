'use strict'
var axios = require('axios');
var Carrier = require('../models/Carriers');
var User = require('../models/Users');

function dataTransaction(req, res){
  var carrier = new Carrier();
  carrier.fid = req.body.fid;
  carrier.ubication = req.body.ubication;
  carrier.name = req.body.name;
  carrier.previousStage = req.body.previousStage;
  carrier.currentStage = req.body.currentStage;
  carrier.nameOfCompany = req.body.nameOfCompany;
  carrier.image = req.body.image;
  carrier.description = req.body.description;
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
        console.log(error);
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

module.exports = {
	dataTransaction,
  dataOfCompany,
  getCompany,
  getData
};
