core.config = {
	name: "CTStore E-Commerce Application",
	data: "json", // or "db" -- for now, do everything json...
	search: {
		data: ["product"],
		buttons: [],
		blurs: [ "what are you looking for?", "what ails you?", "enter search terms" ]
	},
	landing: {
		showcase: ["product"],
		finder: ["product"]
	},
	img_fallback: "https://skirtingboardsdirect.com/wp-content/uploads/2014/12/Fallback-Image-400x400.png"
};