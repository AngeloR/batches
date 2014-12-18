var Batches = require('../src/batch'),
	assert = require('assert');

describe('batches', function () {
	it('should trigger when we add enough items', function (done) {
		var executed = 0;
		var Batch = new Batches({
			max_items: 5,
			callback: function (items) {
				executed++;
				assert.equal(items.length, 5);

				if (executed === 2) {
					done();
				}
			}
		});

		for (var i = 0; i < 10; ++i) {
			Batch.add({ id: i });
		}
	});

	it('should not trigger if we stop the processor', function (done) {

		var Batch = new Batches({
			max_items: 1,
			callback: function (items) {
				// we want it to fail if this callback is ever executed
				assert.equal(true, false);
				done();
			}
		});

		setTimeout(function () {
			done();
		}, 1000);

		Batch.stop();
		for (var i = 0; i < 10; ++i) {
			Batch.add({ id: i });
		}
	});

	it('should trigger the processor if we restart it', function (done) {
		var executed = 0, timeout;
		var Batch = new Batches({
			max_items: 5,
			callback: function (items) {
				executed++;
				assert.equal(items.length, 5);
				if (executed === 2) {
					clearTimeout(timeout);
					done();
				}
				
			}
		});

		timeout = setTimeout(function () {
			// we want it to fail if this callback is ever executed
			assert.equal(true, false);
			done();
		}, 1000);

		Batch.stop();
		for (var i = 0; i < 10; ++i) {
			Batch.add({ id: i });
		};
		Batch.start();
	})
});
