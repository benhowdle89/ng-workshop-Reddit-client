var RedditClient = require('./reddit-client.js');

var App = {
	bind: function() {
		var termInput = document.querySelector('[name="term"]'),
			retrieveBtn = document.querySelector('#retrieve'),
			outputElement = document.querySelector('#output');

		retrieveBtn.addEventListener('click', function() {
			var term = termInput.value;
			if (term) {
				var redditClient = new RedditClient({
					el: outputElement,
					template: "<p><a href='http://reddit.com{{permalink}}'>{{title}}</a></p>",
					term: term
				});
			}
		});
	},
	init: function() {
		this.bind();
	}
};

App.init();