core.config = {
	name: "CTStore E-Commerce Application",
	data: "json",
	search: {
		layout: "slideshow", // slideshow|gallery
		data: ["product"],
		buttons: [],
		blurs: [ "what are you looking for?", "what ails you?", "enter search terms" ]
	},
	landing: {
		layout: "a", // a|b|c
		showcase: ["product"],
		finder: ["product"]
	},
	footer: {
		enabled: false,
		bottom: null,
		links: [],
		contact: {
			email: null,
			phone: null
		}
	},
	img_fallback: "https://skirtingboardsdirect.com/wp-content/uploads/2014/12/Fallback-Image-400x400.png"
};