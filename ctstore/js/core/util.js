core.util = {
	header: function() {
		var nodes = [
			CT.dom.node(CT.dom.node([ core.search.field() ], "div",
				"right h1", null, null, { padding: "30px" }),
				"div", "abs top0 bottom0 right0 w1-2"),
			CT.dom.link(core.config.logo || core.config.name, null, "/",
				"w1-2 biggest bold block nodecoration abs top0 bottom0 left0")
		];
		if (location.pathname != "/checkout.html")
			nodes[0].firstChild.appendChild(CT.dom.link("Shopping Cart", core.cart.modal, null, "block pv10"));
		CT.dom.setContent(CT.dom.id("header"), CT.dom.node(nodes, "div", "h1 w1"));
	}
};