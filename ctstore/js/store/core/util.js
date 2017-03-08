store.core.util = {
	modal: function(d, dtype) {
		var content = [
			CT.dom.node(d.name, "div", "biggest"),
			CT.dom.node(d.description)
		];
		if (dtype == "product") {
			content.push(CT.dom.button("Add to Cart", function() {
				store.core.cart.increase(d);
				alert("ok!");
			}, "w1 bigger padded mv5"));
		}
		(new CT.modal.Modal({
			transition: "slide",
			content: content
		})).show();
	}
};

var ccc = core.config.ctstore;
if (core.config.footer && !core.config.footer.logo)
	core.config.footer.logo = ccc.logo || ccc.name;
core.config.header.right.push(store.core.search.field());
if (!core.config.header.centerLogo)
	core.config.header.centerLogo = false;
if (!core.config.header.rightPadding)
	core.config.header.rightPadding = "25px";
if (location.pathname != "/store/checkout.html")
	core.config.header.right.push(CT.dom.link("Shopping Cart",
		store.core.cart.modal, null, "block pv10"));