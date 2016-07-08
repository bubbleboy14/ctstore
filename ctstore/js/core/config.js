core.config = {
	name: "CTStore E-Commerce Application",
	data: "json", // or "db" -- for now, do everything json...
	search: {
		data: ["products"], // products, herbs, maladies
		blurs: [ "what are you looking for?", "what ails you?", "enter search terms" ]
	},
	landing: {
		showcase: ["products"], // herbs
		finder: ["products"] // maladies, herbs
	}
};