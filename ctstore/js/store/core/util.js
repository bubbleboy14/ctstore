store.core.util = {
	header: function() {
		var rights = [ store.core.search.field() ];
		if (location.pathname != "/checkout.html")
			rights.push(CT.dom.link("Shopping Cart", store.core.cart.modal, null, "block pv10"));
		CT.dom.setAutoparse(true);
		CT.layout.header({
			logo: store.core.config.header_logo || store.core.config.logo || store.core.config.name,
			right: rights,
			centerLogo: false
		});
	},
	footer: function() {
		var f = store.core.config.footer;
		f.enabled && CT.layout.footer({
			logo: store.core.config.logo || store.core.config.name,
			links: f.links,
			contact: {
				email: f.contact.email,
				phone: f.contact.phone
			}
		});
	},
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