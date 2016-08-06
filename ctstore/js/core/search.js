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
				} else for (var j = 0; j < d._brefs.length; j++) {
					var br = CT.data.get(d._brefs[j]);
					if (br.label.indexOf(w) != -1 || br.description.indexOf(w) != -1)
						return true;
				}
			}
		}
	},
	frames: function(category, words) {
		core.search._words = words;
		return core.data[category].filter(core.search._filter);
	},
	slideshow: function(data) {
		new CT.slider.Slider({
			parent: CT.dom.id("results"),
			mode: "chunk",
			subMode: "profile",
			arrowPosition: "top",
			bubblePosition: "top",
			frames: data
		});
	},
	gallery: function(data) {
		CT.dom.setContent(CT.dom.id("results"), CT.dom.node(data.map(function(d) {
			return [
				CT.dom.node(d.label, "div", "bigger bold"),
				CT.dom.grid(d.frames.map(function(f) {
					return {
						label: f.label,
						img: f.img,
						onclick: function() {
							core.util.modal(f, d.label);
						}
					};
				}), null, null, 250)
			];
		}), "div", "full scrolly"));
	},
	results: function(searchwords) {
		if (location.pathname != "/results.html") {
			location = "/results.html#" + escape(searchwords);
			return;
		}
		var data = [], words = searchwords.toLowerCase().split(" ");
		CT.dom.setContent(CT.dom.id("results"), "searching...");
		core.config.search.data.forEach(function(category) {
			var frames = core.search.frames(category, words);
			if (frames.length) data.push({
				label: category,
				frames: frames
			});
		});
		core.search[core.config.search.layout](data);
	}
};