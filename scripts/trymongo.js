'use strict';
const MongoClient = require('mongodb');

function usage(){
  console.log('Usage:');
  console.log('node', __filename, '<option>');
  console.log('Where option is one of: ');
  console.log('callbacks   use the callbacks paradim');
  console.log('promises    use the promises paradigm');
  console.log('generator   use the Generator paradigm');
  console.log('async       use the async module');
}

function testWithCallbacks(){
  MongoClient.connect('mongodb://localhost/playground', function(error, db){
    db.collection('employees').insertOne({id: 1, name: 'A. Callback'},
    function(error, result){
      console.log("Result of insert: ", result.insertedId);
      db.collection('employees').find({id:1}).toArray(function(error, result){
        console.log('Result of find: ', result);
        db.close();
      });
    });
  });
}

function testWithPromises(){
  let db;
  MongoClient.connect('mongodb://localhost/playground').then(connection =>{
    db = connection;
    return db.collection('employees').insertOne({id: 1 , name: 'A Callback'});
  }).
    then(result=>{
      console.log("Result of insert : ", result.insertedId);
      return db.collection('employees').find({id: 1}).toArray();
    }).then(docs=>{
      console.log('Result of find: ', docs);
      db.close();
    }).catch(err=>{
      console.log('Error', err);
    });
}

function testWithGenerator(){
  const co = require('co');
  co(function*(){
    const db = yield MongoClient.connect('mongodb://localhost:/playground')
    const result = yield db.collection('employees').insertOne({id: 1, name:'C. Generator'})
    console.log('Result of insert: ', result.insertedId);
    const docs = yield db.collection('employees').find({id:1}).toArray();
    console.log('Result of find: ', docs);

    db.close();
  }).catch(err=>{
    console.log('Error', err);
  });
}


function testWithAsync(){
  const async = require('async');
  let db;
  async.waterfall([
    next =>{
      MongoClient.connect('mongodb://localhost/playground', next);
      console.log("connection is done")

    }, (connection, next) =>{
      db = connection;
      db.collection('employees').insertOne({id: 1, name:'D. Asynchronous'})
      console.log("insert one employee");
  //    next.apply();
    }, (insertResult, next) => {
      console.log('Insert result: ', insertResult.insertedId);
      db.collection('Employees').find({id: 1}).toArray(next);
    }, (docs, next)=>{
      console.log('Result of find: ', docs);
      db.close();
      next(null, 'All Done');
    }
  ], (err, result)=>{
    console.log("script problem");
    if(err){
      console.log('ERROR', err);
    }else{
      console.log("hello world problem");
      console.log(result);
    }
  });
}


if(process.argv.length < 3){
  console.log('Incorrect number of argument');
  usage();

}else{
  if(process.argv[2] == 'callbacks'){
    testWithCallbacks();
  }else if(process.argv[2]== 'promises'){
    testWithPromises();
  }else if(process.argv[2]== 'generator'){
    testWithGenerator();
  }else if(process.argv[2]== 'async'){
    testWithAsync();
  }else{
    console.log("invalid option: ", process.argv[2]);
    usage();
  }
}
