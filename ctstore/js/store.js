CT.require("CT.all");
CT.require("core.config");
CT.require("core.search");
CT.require("core.data");
CT.require("core.cart");
CT.require("core.util");

CT.onload(function() {
	core.util.header();
	new CT.slider.Slider({
		navButtons: false,
		parent: CT.dom.id("slider"),
		frames: core.data.product.map(function(d) {
			return {
				title: d.label,
				blurb: d.description,
				img: d.image,
				tab: {
					content: CT.dom.link("Read More!",
						core.search.link(d.label),
						null, "big padded block pointer"),
					origin: "topright"
				}
			}
		})
	});
	CT.dom.setContent(CT.dom.id("showcase"),
		CT.dom.node(core.data[core.config.landing.showcase].map(function(d) {
			return CT.dom.node(CT.dom.link([
				CT.dom.node(null, "div", "w1 h4-5",
					null, null, { backgroundImage: "url(" + d.image + ")" }),
				CT.dom.node(d.name, "div", "big bold")
			], function() {
				core.search.results(d.label);
			}), "div", "h1 inline-block");
		}), "div", "w1 h1 nowrap scrollx"));

	var tabs = CT.dom.node(null, "center", "h1-5", "finder_tabs"),
		lists = CT.dom.node(null, null, "h4-5 scrolly", "finder_lists");
	CT.panel.simple(core.config.landing.finder, null, tabs, lists);
	core.config.landing.finder.forEach(function(category) {
		CT.dom.setContent(CT.dom.id("sbpanel" + category, true),
			core.data[category].map(function(item) {
				return CT.dom.link(item.label, core.search.link(item.label));
			}));
	});
	CT.dom.setContent(CT.dom.id("finder"), CT.dom.node([tabs, lists], "div", "h1 w1"));
});