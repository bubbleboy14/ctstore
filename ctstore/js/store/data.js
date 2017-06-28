if (core.config.ctstore.data == "json") {
	store.data.all = store.data.product = [
		{
			name: "A Product",
			label: "a product",
			description: "it's great",
			img: "https://hellopledge.files.wordpress.com/2012/07/hello_medium-file3.jpg"
		}, {
			name: "A Product",
			label: "another product",
			description: "it's also great",
			img: "http://www.one-world.org/images/Earth-Oceania318_cropped.jpg"
		}
	];
} else { // db
	store.data.all = [];
	core.config.ctstore.search.data.forEach(function(modelName) {
		CT.db.get(modelName, function(data) {
			store.data[modelName] = CT.data.alpha(data, "name");
			store.data.all = store.data.all.concat(data);
		}, 1000, null, null, null, true);
	});
	store.data.all.forEach(function(d) {
		d.img = d.img || d.image || core.config.ctstore.img_fallback;
	});
}

CT.data.addSet(store.data.all);
store.data.all.forEach(function(d) {
	d._brefs = [];
	d._search = (d.label + " " + d.description).toLowerCase().split(" ");
});
store.data.all.forEach(function(d) {
	core.config.ctstore.search.buttons.forEach(function(cat) {
		if (d[cat]) {
			d.buttons = d.buttons || {};
			d[cat].forEach(function(related) {
				var relative = CT.data.get(related);
				relative._brefs.push(d.key);
				d.buttons[relative.name] = store.core.search.link(related);
			});
		}
	});
	if (d.modelName == "product") {
		d.buttons = d.buttons || {};
		d.buttons["Add to Cart"] = function() {
			store.core.cart.increase(d);
			alert("ok!");
		}
	}
});