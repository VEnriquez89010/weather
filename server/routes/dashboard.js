const express = require('express');
const router = express.Router();

const axios = require('axios');
const API = 'http://api.weatherbit.io/v2.0/forecast';

/*
  Expose information of Obregon
*/
router.get('/obregon' , (req,res)=>{
  axios.get(`${API}/daily?lat=27.4828003&lon=-109.9335208&key=e725d71c159440ceb9649e2032592e5d`).then( location =>{
    res.status(200).json(location.data.data);
  }).catch(error =>{
    res.status(500).send(error);
  });
});

/*
  Expose information of Hermosillo
*/
router.get('/hermosillo' , (req,res)=>{
  axios.get(`${API}/daily?lat=29.0869027&lon=-110.9827333&key=e725d71c159440ceb9649e2032592e5d`).then( location =>{
    res.status(200).json(location.data.data);
  }).catch(error =>{
    res.status(500).send(error);
  });
});

/*
  Expose information of Nogales
*/
router.get('/nogales' , (req,res)=>{
  axios.get(`${API}/daily?lat=31.3007897&lon=-110.9447621&key=e725d71c159440ceb9649e2032592e5d`).then( location =>{
    res.status(200).json(location.data.data);
  }).catch(error =>{
    res.status(500).send(error);
  });
});

/*
  Expose information of Navojoa
*/
router.get('/navojoa' , (req,res)=>{
  axios.get(`${API}/daily?lat=27.0673972&lon=-109.4434902&key=e725d71c159440ceb9649e2032592e5d`).then( location =>{
    res.status(200).json(location.data.data);
  }).catch(error =>{
    res.status(500).send(error);
  });
});

module.exports = router;
