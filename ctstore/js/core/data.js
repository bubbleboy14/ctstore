if (core.config.data == "json") {
	core.data.all = core.data.product = [
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
	core.data.all = [];
	core.config.search.data.forEach(function(modelName) {
		CT.db.get(modelName, function(data) {
			core.data[modelName] = CT.data.alpha(data, "name");
			core.data.all = core.data.all.concat(data);
		}, 1000, null, null, null, true);
	});
	core.data.all.forEach(function(d) {
		d.img = d.img || d.image || core.config.img_fallback;
	});
}