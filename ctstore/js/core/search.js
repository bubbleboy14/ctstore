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
			if (d._search.indexOf(w) != -1)
				return true;
			for (var k = 0; k < core.config.search.buttons; k++) {
				var pval = d[core.config.search.buttons[k]] || [];
				for (var j = 0; j < pval.length; j++)
					if (CT.data.get(pval[j])._search.indexOf(w) != -1)
						return true;
			}
			for (var j = 0; j < d._brefs.length; j++)
				if (CT.data.get(d._brefs[j])._search.indexOf(w) != -1)
					return true;
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
				CT.layout.grid(d.frames.map(function(f) {
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