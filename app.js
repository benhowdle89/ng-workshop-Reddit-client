var RedditClient = function(options) {
	this.el = options.el;
	if (!this.el) {
		throw new Error('RedditClient needs an element');
	}
	this.template = options.template;
	this.term = options.term;
	this.data = [];
	this.fetch();
};

RedditClient.prototype.fetch = function() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'http://www.reddit.com/r/' + this.term + '.json');
	xhr.addEventListener('readystatechange', function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var json = JSON.parse(xhr.responseText);
			for (var i = 0; i < json.data.children.length; i++) {
				var item = json.data.children[i].data;
				this.data.push(item);
			}
			this.render();
		}
	}.bind(this));
	xhr.send();
};

RedditClient.prototype.templateMaker = function(data) {
	var html = "";
	data.forEach(function(item) {
		var template = this.template;
		for (var x in item) {
			var re = new RegExp("{{" + x + "}}", "ig"),
				matched = template.match(re);
			if (matched) {
				template = template.replace(re, item[x]);
			}
		}
		html += template;
	}.bind(this));
	return html;
};

RedditClient.prototype.render = function() {
	this.el.innerHTML = this.templateMaker(this.data);
};

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