core.config = {
	name: "CTStore E-Commerce Application",
	data: "json", // or "db" -- for now, do everything json...
	search: {
		data: ["products"],
		blurs: [ "what are you looking for?", "what ails you?", "enter search terms" ]
	},
	landing: {
		showcase: ["products"],
		finder: ["products"]
	}
};