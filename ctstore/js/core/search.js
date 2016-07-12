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
	_filter: function(d) {
		for (var i = 0; i < core.search._words.length; i++) {
			var w = core.search._words[i];
			for (var prop in d) {
				if (["label", "description"].indexOf(prop) != -1) {
					if (d[prop].indexOf(w) != -1)
						return true;
				} else if (core.config.search.buttons.indexOf(prop) != -1) {
					for (var j = 0; j < d[prop].length; j++) {
						var s = CT.data.get(d[prop][j]);
						if (s.label.indexOf(w) != -1 || s.description.indexOf(w) != -1)
							return true;
					}
				}
			}
		}
	},
	frames: function(category, words) {
		core.search._words = words;
		return core.data[category].filter(core.search._filter);
	},
	results: function(searchwords) {
		if (location.pathname != "/results.html") {
			location = "/results.html#" + escape(searchwords);
			return;
		}
		var rnode = CT.dom.id("results"), data = [],
			words = searchwords.toLowerCase().split(" ");
		CT.dom.setContent(rnode, "searching...");
		core.config.search.data.forEach(function(category) {
			var frames = core.search.frames(category, words);
			if (frames.length) data.push({
				label: category,
				frames: frames
			});
		});
		new CT.slider.Slider({
			parent: rnode,
			mode: "chunk",
			subMode: "profile",
			arrowPosition: "top",
			bubblePosition: "top",
			frames: data
		});
	}
};