core.util = {
	header: function() {
		CT.dom.setAutoparse(true);
		var nodes = [
			CT.dom.node(CT.dom.node([ core.search.field() ], "div",
				"right h1", null, null, { padding: "30px" }),
				"div", "abs top0 bottom0 right0 w1-2"),
			CT.dom.link(core.config.header_logo || core.config.logo
				|| core.config.name, null, "/",
				"w1-2 biggest bold block nodecoration abs top0 bottom0 left0")
		];
		if (location.pathname != "/checkout.html")
			nodes[0].firstChild.appendChild(CT.dom.link("Shopping Cart", core.cart.modal, null, "block pv10"));
		CT.dom.setContent(CT.dom.id("header"), CT.dom.node(nodes, "div", "h1 w1"));
	},
	footer: function() {
		var f = core.config.footer;
		if (f.enabled) {
			var rights = [], content = [
				CT.dom.link(core.config.logo || core.config.name, null, "/", "left nodecoration")
			];
			if (f.links.length)
				rights.push(f.links.map(function(link) {
					return CT.dom.link(link.content, link.cb, link.href, "padded");
				}));
			if (f.contact.email || f.contact.phone) {
				var contacts = [];
				if (f.contact.email)
					contacts.push(CT.dom.node(f.contact.email, "div", "padded inline-block"));
				if (f.contact.phone)
					contacts.push(CT.dom.node(f.contact.phone, "div", "padded inline-block"));
				rights.push(contacts);
			}
			if (rights.length)
				content.push(CT.dom.node(rights, "div", "right p20"));
			if (f.bottom)
				content.push(CT.dom.node(f.bottom, "div", "small bline centered"));
			document.body.classList.add("footered");
			document.body.appendChild(CT.dom.node(content, "div", null, "footer"));
		}
	},
	modal: function(d, dtype) {
		var content = [
			CT.dom.node(d.name, "div", "biggest"),
			CT.dom.node(d.description)
		];
		if (dtype == "product") {
			content.push(CT.dom.button("Add to Cart", function() {
				core.cart.increase(d);
				alert("ok!");
			}, "right"));
		}
		(new CT.modal.Modal({
			transition: "slide",
			content: content
		})).show();
	}
};