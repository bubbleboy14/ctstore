store.core.search = {
	field: function() {
		var n = CT.dom.smartField(store.core.search.results,
			null, null, null, null, core.config.ctstore.search.blurs);
		store.data && new CT.autocomplete.Guesser({ // checkout page skips
			input: n,
			data: store.data.all
		});
		return n;
	},
	link: function(item) {
		return function() {
			store.core.search.results(item);
		};
	},
	_filter: function(d) {
		for (var i = 0; i < store.core.search._words.length; i++) {
			var w = store.core.search._words[i];
			if (d._search.indexOf(w) != -1)
				return true;
			for (var k = 0; k < core.config.ctstore.search.buttons; k++) {
				var pval = d[core.config.ctstore.search.buttons[k]] || [];
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
		store.core.search._words = words;
		return store.data[category].filter(store.core.search._filter);
	},
	slideshow: function(data) {
		new CT.slider.Slider({
			parent: "ctmain",
			mode: "chunk",
			subMode: "profile",
			arrowPosition: "top",
			bubblePosition: "top",
			frames: data,
			arrow: core.config.ctstore.search.arrow
		});
	},
	gallery: function(data) {
		CT.dom.setContent("ctmain", CT.dom.node(data.map(function(d) {
			return [
				CT.dom.node(d.label, "div", "bigger bold"),
				CT.layout.grid(d.frames.map(function(f) {
					return {
						label: f.label,
						img: f.img,
						onclick: function() {
							store.core.util.modal(f, d.label);
						}
					};
				}), null, null, 250)
			];
		}), "div", "full scrolly"));
	},
	flex: function(rows) {
		var lister = CT.dom.div(rows.map(function(row) {
			return [
				CT.dom.div(row.label, "bigger bold bottompadded"),
				CT.dom.div(row.frames.map(function(item) {
					return CT.dom.div([
						CT.dom.div(null, "hero", null, null, {
							backgroundImage: 'url("' + item.image + '")'
						}),
						CT.dom.div([
							CT.dom.div(item.variety, "right italic"),
							CT.dom.div(item.name, "big bold"),
							"price: " + item.price,
							item.description
						], "content")
					], "box pointer", null, {
						onclick: function() {
							store.core.util.modal(item, row.label);
						}
					});
				}), "row")
			];
		}), null, "lister");
		CT.dom.setContent("ctmain", core.config.ctstore.nofrills ? [
			CT.dom.div(store.core.search.field(), "right"),
			lister
		] : lister);
	},
	results: function(searchwords) {
		if (location.pathname != "/store/results.html") {
			location = "/store/results.html#" + escape(searchwords);
			return;
		}
		if (!searchwords)
			return store.core.search.all();
		var data = [], words = searchwords.toLowerCase().split(" ");
		CT.dom.setContent("ctmain", "searching...");
		core.config.ctstore.search.data.forEach(function(category) {
			var frames = store.core.search.frames(category, words);
			if (frames.length) data.push({
				label: searchwords + ": " + category,
				frames: frames
			});
		});
		store.core.search[core.config.ctstore.search.layout](data);
	},
	all: function() {
		var cfg = core.config.ctstore;
		store.core.search[cfg.search.layout]((cfg.data == "variety") ?
			cfg.search.data.map(function(variety) {
				return {
					label: variety + "s",
					frames: store.data[variety]
				};
			}) : [{
				label: "products",
				frames: store.data.all
			}]);
	}
};