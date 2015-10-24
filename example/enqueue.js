var monq = require('../lib/index');

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/monq_example', function(err, db) {
  var client = monq(db);
  var queue = client.queue('foo');

  queue.enqueue('uppercase', { text: 'bar' }, function (err, job) {
      if (err) throw err;
      console.log('Enqueued:', job.data);
      process.exit();
  });
})
