/**
 * A FIFO queue for batch processing
 */
function Batch(config) {
    
    this.items = [];
    this.max_items = config.max_items || 10;
    this.callback = config.callback || function () { };
    this.running = true;

}

/**
 * Checks to see if batch script is running, and if it is, 
 * it checks ot see if there are enough items in there to 
 * trigger the processing. 
 * 
 * Once it triggers the processing, it calls itself, to 
 * ensure that if we stop/restart the script it will 
 * clear out the queue
 */
Batch.prototype.exec_if_enough_items = function () {
    if (!this.running) {
        return;
    }
    
    if (this.items.length >= this.max_items) {
        this.process(this.max_items);
        this.exec_if_enough_items();
    }
}

/**
 * Add an item to the batch list, and check to see if we should 
 * trigger the users callback
 */
Batch.prototype.add = function (item) {
    this.items.push(item);
    this.exec_if_enough_items();
};

/**
 * Start the process!
 * 
 * When we start it, we also check to see if there are items in 
 * the queue that need to be sent out.
 */
Batch.prototype.start = function () {
    this.running = true;
    this.exec_if_enough_items();
};

/**
 * Stop everything
 */
Batch.prototype.stop = function () {
    this.running = false;
};

/**
 * Execute the callback with the desired number of items from 
 * the list
 */
Batch.prototype.process = function (max_items) {
    this.callback(this.items.splice(0, max_items));
}



module.exports = Batch;
