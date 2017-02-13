const mongoose = require('mongoose'); 
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
	var james, blogPost;
	
	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		blogPost = new BlogPost({
			title: 'Ulysees',
			content: 'A modernist novel that parallels the epic poem Odyssey'
		});
		
		james.blogPosts.push(blogPost); 

		Promise.all([
			james.save(),
			blogPost.save()
		])
		.then(() => done());
	});

	it('should remove blogposts associated with a user', (done) => {
		james.remove()
			.then(() => BlogPosts.count())
			.then((count) => {
				assert(count === 0);
			});
			done();
	});
});