core.util = {
	header: function() {
		var nodes = [
			CT.dom.node(core.search.field(), "div", "right"),
			CT.dom.link(core.config.name, null, "/", "biggerest bold block nodecoration")
		];
		if (location.pathname != "/checkout.html")
			nodes.push(CT.dom.link("Shopping Cart", core.cart.modal, null, "right"));
		CT.dom.setContent(CT.dom.id("header"), nodes);
	}
};