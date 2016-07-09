if (core.config.data == "json") {
	core.data.all = core.data.product = [
		{
			name: "A Product",
			label: "a product",
			description: "it's great",
			image: "https://hellopledge.files.wordpress.com/2012/07/hello_medium-file3.jpg"
		}, {
			name: "A Product",
			label: "another product",
			description: "it's also great",
			image: "http://www.one-world.org/images/Earth-Oceania318_cropped.jpg"
		}
	];
} else { // db
	core.data.all = [];
	core.config.search.data.forEach(function(modelName) {
		CT.db.get(modelName, function(data) {
			core.data[modelName] = data;
			core.data.all = core.data.all.concat(data);
		}, 1000, null, null, null, true);
	});
}