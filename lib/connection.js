
var job = require('./job');
var Queue = require('./queue');
var Worker = require('./worker');

module.exports = Connection;

function Connection(db, options) {
    this.db = db;
}

Connection.prototype.worker = function (queues, options) {
    var self = this;

    var queues = queues.map(function (queue) {
        if (typeof queue === 'string') {
            queue = self.queue(queue);
        }

        return queue;
    });

    return new Worker(queues, options);
};

Connection.prototype.queue = function (name, options) {
    return new Queue(this, name, options);
};

Connection.prototype.close = function () {
    this.db.close();
};