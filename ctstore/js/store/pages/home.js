CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");
var cfg = core.config.ctstore.landing;
CT.dom.addStyle(null, "/css/layouts/landing/" + cfg.layout + ".css");

CT.onload(function() {
	CT.initCore();
	if (cfg.check21 && !user.core.get()) {
		var redir = function() {
			location = "http://duckduckgo.com";
		};
		var p = new CT.modal.Prompt({
			noClose: true,
			data: ["yes", "no"],
			transition: "slide",
			style: "single-choice",
			prompt: "Are You Over 21?",
			cb: function(answer) {
				p.on.hide = function() {};
				if (answer != "yes")
					redir();
			}
		});
		p.on.hide = redir;
		p.show();
	}
	var _modal = function(d) {
		return function() {
			store.core.util.modal(d, d.modelName);
		}
	};
	if (cfg.slider_alternative)
		cfg.slider_alternative();
	else if (cfg.slider_replacement)
		CT.dom.setContent("slider", cfg.slider_replacement());
	else {
		new CT.slider.Slider(CT.merge({
			noEnter: true,
			navButtons: false,
			parent: CT.dom.id("slider"),
			frames: store.data.product.map(function(d) {
				return {
					title: d.label,
					blurb: d.description,
					img: d.img,
					onclick: _modal(d),
					tab: {
						content: CT.dom.link(cfg.product_message,
							store.core.search.link(d.label),
							null, "biggerest padded block pointer"),
						origin: "topright"
					}
				}
			})
		}, cfg.slider_opts));
	}
	CT.dom.setContent(CT.dom.id("showcase"),
		CT.dom.div(store.data[cfg.showcase].map(function(d) {
			return CT.dom.div(CT.dom.link([
				CT.dom.div(null, "w1", null, null, {
					height: "65%",
					border: "7px solid black",
					backgroundImage: "url(" + d.img + ")"
				}),
				CT.dom.div(d.name, "big h1-5 bold nonowrap", null, null, {
					fontSize: "103%"
				})
			], cfg.search_links ? function() {
				store.core.search.results(d.label);
			} :  _modal(d)), "h9-10 m5 inline-block vtop hoverglow");
		}), "w1 h1 nowrap scrollx"));

	var tabs = CT.dom.node(null, "center", null, "finder_tabs"),
		lists = CT.dom.div(null, "scrolly", "finder_lists");
	CT.panel.simple(cfg.finder, null, tabs, lists);
	cfg.finder.forEach(function(category) {
		CT.dom.setContent(CT.dom.id("sbpanel" + category, true),
			store.data[category].map(function(item) {
				return CT.dom.link(item.label,
					!cfg.search_links && _modal(item),
					cfg.search_links && store.core.search.link(item.label));
			}));
	});
	CT.dom.setContent("finder", CT.dom.div([tabs, lists], "h1 w1"));
});