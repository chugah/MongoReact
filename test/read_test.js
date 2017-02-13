const assert = require('assert');
const User = require('../src/user');

describe('Read a record in the database', () => {
	var james, david, mary, rita, lane;
	
	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		james.save();

		david = new User({ 
			first_name: 'David', 
			last_name: 'Smith' 
		});
		david.save();
		
		mary = new User({ 
			first_name: 'Mary', 
			last_name: 'Joyce' 
		});
		mary.save();

		rita = new User({
			first_name: 'Rita',
			last_name: 'Hayworth'
		});
		rita.save();

		lane = new User({
			first_name: 'Lane',
			last_name: 'Mansfield'
			});
		lane.save()
			.then(() => {
				done();
		});
	});
	
	it('should find all users with the same name', (done) => {
		User.find({ first_name: 'James' })
			.then((users) => {
				assert(users[0]._id.toString() === james._id.toString());
				done();
			});			
	});
	
	it('should find a user with a specific id', (done) => {
		User.findOne({ _id: james._id })
			.then((user) => {
				assert(user.first_name === 'James');
				done();
			});			
	});

	it ('should skip and limit the results returned', (done) => {
		User.find({})
		.sort({ first_name: 1 })
		.skip(1)
		.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].first_name === 'James');
				assert(users[1].first_name === 'Lane');
				done();
			});
	});
});