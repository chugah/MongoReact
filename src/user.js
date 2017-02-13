const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		validate: {
			validator: (first_name) => first_name.length > 1,
			message: 'First name must be 2 or more characters.'
		},
		required: [ true, 'First name is required.']
	},
	last_name: {
		type: String,
		validate: {
			validator: (last_name) => last_name.length > 1,
			message: 'Last name must be 2 or more characters.'
		},
		required: [ true, 'Last name is required.']
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});

UserSchema.pre('remove', function(next) {
	const BlogPost = mongoose.model('blogPost');
	BlogPost.remove({ _id: { $in: this.blogPosts } })
		.then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;