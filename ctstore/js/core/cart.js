core.cart = {
	_items: {},
	increase: function(d) {
		if (!(d.label in core.cart._items)) {
			core.cart._items[d.label] = d;
			d.count = 0;
		}
		core.cart._items[d.label].count += 1;
	},
	decrease: function(d) {
		core.cart._items[d.label].count -= 1;
		if (!core.cart._items[d.label].count)
			delete core.cart._items[d.label];
	},
	list: function(d) {
		return Object.values(core.cart._items).map(function(d) {
			var cnode = CT.dom.node(d.count, "b");
			return [
				CT.dom.node([
					CT.dom.button("-", function () {
						core.cart.decrease(d);
						if (d.count)
							cnode.innerHTML = d.count;
						else
							CT.dom.remove(cnode.parentNode.parentNode);
					}),
					CT.dom.pad(),
					cnode,
					CT.dom.pad(),
					CT.dom.button("+", function () {
						core.cart.increase(d);
						cnode.innerHTML = d.count;
					})
				], "div", "right padded"),
				CT.dom.node(d.label, "div", "bordered padded margined bold")
			];
		});
	},
	load: function() {
		core.cart._items = CT.storage.get("cart");
	},
	checkout: function() {
		CT.storage.set("cart", core.cart._items);
		location = "/checkout.html";
	},
	modal: function() {
		var items = core.cart.list();
		(new CT.modal.Modal({
			transition: "slide",
			className: "w1-3 basicpopup above",
			content: [
				CT.dom.node("Shopping Cart", "div", "big padded"),
				items.length ? [
					items,
					CT.dom.button("Checkout", core.cart.checkout),
				] : CT.dom.node("empty!", "center")
			]
		})).show();
	}
};