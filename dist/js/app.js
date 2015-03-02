(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/benhowdle/Dropbox/htdocs/ng-workshop-reddit/assets/js/app.js":[function(require,module,exports){
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
},{"./reddit-client.js":"/Users/benhowdle/Dropbox/htdocs/ng-workshop-reddit/assets/js/reddit-client.js"}],"/Users/benhowdle/Dropbox/htdocs/ng-workshop-reddit/assets/js/reddit-client.js":[function(require,module,exports){
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

module.exports = RedditClient;
},{}]},{},["/Users/benhowdle/Dropbox/htdocs/ng-workshop-reddit/assets/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL2pzL2FwcC5qcyIsImFzc2V0cy9qcy9yZWRkaXQtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVkZGl0Q2xpZW50ID0gcmVxdWlyZSgnLi9yZWRkaXQtY2xpZW50LmpzJyk7XG5cbnZhciBBcHAgPSB7XG5cdGJpbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0ZXJtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRlcm1cIl0nKSxcblx0XHRcdHJldHJpZXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JldHJpZXZlJyksXG5cdFx0XHRvdXRwdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI291dHB1dCcpO1xuXG5cdFx0cmV0cmlldmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0ZXJtID0gdGVybUlucHV0LnZhbHVlO1xuXHRcdFx0aWYgKHRlcm0pIHtcblx0XHRcdFx0dmFyIHJlZGRpdENsaWVudCA9IG5ldyBSZWRkaXRDbGllbnQoe1xuXHRcdFx0XHRcdGVsOiBvdXRwdXRFbGVtZW50LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxwPjxhIGhyZWY9J2h0dHA6Ly9yZWRkaXQuY29te3twZXJtYWxpbmt9fSc+e3t0aXRsZX19PC9hPjwvcD5cIixcblx0XHRcdFx0XHR0ZXJtOiB0ZXJtXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmJpbmQoKTtcblx0fVxufTtcblxuQXBwLmluaXQoKTsiLCJ2YXIgUmVkZGl0Q2xpZW50ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcblx0aWYgKCF0aGlzLmVsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdSZWRkaXRDbGllbnQgbmVlZHMgYW4gZWxlbWVudCcpO1xuXHR9XG5cdHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuXHR0aGlzLnRlcm0gPSBvcHRpb25zLnRlcm07XG5cdHRoaXMuZGF0YSA9IFtdO1xuXHR0aGlzLmZldGNoKCk7XG59O1xuXG5SZWRkaXRDbGllbnQucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24oKSB7XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oXCJHRVRcIiwgJ2h0dHA6Ly93d3cucmVkZGl0LmNvbS9yLycgKyB0aGlzLnRlcm0gKyAnLmpzb24nKTtcblx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xuXHRcdFx0dmFyIGpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmRhdGEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBqc29uLmRhdGEuY2hpbGRyZW5baV0uZGF0YTtcblx0XHRcdFx0dGhpcy5kYXRhLnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdH1cblx0fS5iaW5kKHRoaXMpKTtcblx0eGhyLnNlbmQoKTtcbn07XG5cblJlZGRpdENsaWVudC5wcm90b3R5cGUudGVtcGxhdGVNYWtlciA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0dmFyIGh0bWwgPSBcIlwiO1xuXHRkYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG5cdFx0Zm9yICh2YXIgeCBpbiBpdGVtKSB7XG5cdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKFwie3tcIiArIHggKyBcIn19XCIsIFwiaWdcIiksXG5cdFx0XHRcdG1hdGNoZWQgPSB0ZW1wbGF0ZS5tYXRjaChyZSk7XG5cdFx0XHRpZiAobWF0Y2hlZCkge1xuXHRcdFx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmUsIGl0ZW1beF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRodG1sICs9IHRlbXBsYXRlO1xuXHR9LmJpbmQodGhpcykpO1xuXHRyZXR1cm4gaHRtbDtcbn07XG5cblJlZGRpdENsaWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZU1ha2VyKHRoaXMuZGF0YSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZGRpdENsaWVudDsiXX0=
