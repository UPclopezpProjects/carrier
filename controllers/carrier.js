'use strict'
var axios = require('axios');
var Carrier = require('../models/Carriers');

function dataTransaction(req, res){
  var carrier = new Carrier();
  carrier.fid = req.body.fid;
  carrier.ubication = req.body.ubication;
  carrier.name = req.body.name;
  carrier.previousStage = req.body.previousStage;
  carrier.currentStage = req.body.currentStage;
  carrier.save((err, carrierStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!carrierStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(carrierStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData });
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
      currentStage: carrierStored.currentStage
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

function getData(req, res) {
  var code = req.body.code;
  console.log(code);
  var query = { id: code };
  Carrier.findOne(query, (err, data) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!data){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: JSON.stringify(data)});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  getData
};
