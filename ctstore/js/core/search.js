core.search = {
	field: function() {
		var n = CT.dom.smartField(core.search.results,
			null, null, null, null, core.config.search.blurs);
		core.data && new CT.autocomplete.Guesser({ // checkout page skips
			input: n,
			data: core.data.all
		});
		return n;
	},
	link: function(item) {
		return function() {
			core.search.results(item);
		};
	},
	frames: function(category, words) {
		return Object.values(core.data[category]).filter(function(d) {
			for (var i = 0; i < words.length; i++) {
				var w = words[i];
				for (var prop in d) {
					if (prop == "img")
						continue;
					if (["label", "description"].indexOf(prop) != -1) {
						if (d[prop].indexOf(w) != -1)
							return true;
					} else { // array props
						var arr = d[prop];
						for (var j = 0; j < arr.length; j++) {
							if (arr[j].indexOf(w) != -1)
								return true;
						}
					}
				}
			}
		});
	},
	results: function(searchwords) {
		if (location.pathname != "/results.html") {
			location = "/results.html#" + escape(searchwords);
			return;
		}
		var rnode = CT.dom.id("results"),
			words = searchwords.toLowerCase().split(" ");
		CT.dom.setContent(rnode, "searching...");
		new CT.slider.Slider({
			parent: rnode,
			mode: "chunk",
			subMode: "profile",
			arrowPosition: "top",
			bubblePosition: "top",
			frames: core.config.search.data.map(function(category) {
				return {
					label: category,
					frames: core.search.frames(category, words)
				}
			})
		});
	}
};