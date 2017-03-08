CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");
CT.dom.addStyle(null, "/css/layouts/landing/" + core.config.ctstore.landing.layout + ".css");

CT.onload(function() {
	CT.initCore();
	new CT.slider.Slider({
		navButtons: false,
		parent: CT.dom.id("slider"),
		frames: store.data.product.map(function(d) {
			return {
				title: d.label,
				blurb: d.description,
				img: d.img,
				onclick: function() {
					store.core.util.modal(d, "product");
				},
				tab: {
					content: CT.dom.link(core.config.ctstore.landing.product_message,
						store.core.search.link(d.label),
						null, "big padded block pointer"),
					origin: "topright"
				}
			}
		})
	});
	CT.dom.setContent(CT.dom.id("showcase"),
		CT.dom.node(store.data[core.config.ctstore.landing.showcase].map(function(d) {
			return CT.dom.node(CT.dom.link([
				CT.dom.node(null, "div", "w1 h4-5 rounder",
					null, null, { backgroundImage: "url(" + d.img + ")" }),
				CT.dom.node(d.name, "div", "big h1-5 bold nonowrap")
			], function() {
				store.core.search.results(d.label);
			}), "div", "h9-10 m5 inline-block vtop hoverglow");
		}), "div", "w1 h1 nowrap scrollx"));

	var tabs = CT.dom.node(null, "center", null, "finder_tabs"),
		lists = CT.dom.node(null, null, "scrolly", "finder_lists");
	CT.panel.simple(core.config.ctstore.landing.finder, null, tabs, lists);
	core.config.ctstore.landing.finder.forEach(function(category) {
		CT.dom.setContent(CT.dom.id("sbpanel" + category, true),
			store.data[category].map(function(item) {
				return CT.dom.link(item.label, store.core.search.link(item.label));
			}));
	});
	CT.dom.setContent(CT.dom.id("finder"), CT.dom.node([tabs, lists], "div", "h1 w1"));
});