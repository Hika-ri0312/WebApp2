const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const async = require('async');


router.post('/', function (req, res, next) {
　console.log( "body" );
　console.dir( req.body );
　console.log( req.body.abc );

　let v001s = req.body["v001"];
　let ar001s = [];

　if( v001s == null ) {
　　console.log( 'non data' );
    res.redirect('/')
　} else {
　　if( Object.prototype.toString.call( v001s) === '[object Array]') {
　　　console.log( "v001s is array" );
　　　console.log( "length00:" + v001s.length );
　　　ar001s = v001s;
　} else {
　　console.log( "v001s is non array" );
　　console.log( "v001s --> " + v001s );
　　ar001s[0] = v001s;
　}
　async.each( ar001s, function( val, callback ) {
    console.log(val)
　　callback();
　}, function( err ) {
　　if( err ) {
　　　console.log( "err --> " + err );
　　} else {
　　}
　});
  for(var id in ar001s)
  {
    console.log(ar001s[id])
    knex("tasks")
      .where({id:ar001s[id]})
      .del()
      .then(function () {
        res.redirect('/')
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          errorMessage: [err.sqlMessage],
        });
      });
  }
  }
});

module.exports = router;                  
