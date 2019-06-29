store.core.cart = {
	_items: {},
	increase: function(d) {
		if (!(d.label in store.core.cart._items)) {
			store.core.cart._items[d.label] = d;
			d.count = 0;
		}
		store.core.cart._items[d.label].count += 1;
	},
	decrease: function(d) {
		store.core.cart._items[d.label].count -= 1;
		if (!store.core.cart._items[d.label].count)
			delete store.core.cart._items[d.label];
	},
	list: function(d) {
		return Object.values(store.core.cart._items).map(function(d) {
			var cnode = CT.dom.node(d.count, "b");
			return [
				CT.dom.node([
					CT.dom.button("-", function () {
						store.core.cart.decrease(d);
						if (d.count)
							cnode.innerHTML = d.count;
						else
							CT.dom.remove(cnode.parentNode.parentNode);
					}),
					CT.dom.pad(),
					cnode,
					CT.dom.pad(),
					CT.dom.button("+", function () {
						store.core.cart.increase(d);
						cnode.innerHTML = d.count;
					})
				], "div", "right padded"),
				CT.dom.node(d.label, "div", "bordered padded margined bold")
			];
		});
	},
	receipt: function() {
		return Object.values(store.core.cart._items).map(function(d) {
			return (d.price * d.count) + " for " + d.count + " " + d.label;
		}).join("\n");
	},
	total: function() {
		return Object.values(store.core.cart._items).reduce(function(a, b) {
			return (a.price * a.count) + (b.price * b.count);
		});
	},
	load: function() {
		store.core.cart._items = CT.storage.get("cart");
	},
	checkout: function() {
		CT.storage.set("cart", store.core.cart._items);
		location = "/store/checkout.html";
	},
	modal: function() {
		var items = store.core.cart.list();
		(new CT.modal.Modal({
			transition: "slide",
			className: "w1-3 basicpopup above",
			content: [
				CT.dom.node("Shopping Cart", "div", "big padded"),
				items.length ? [
					items,
					CT.dom.button("Checkout", store.core.cart.checkout),
				] : CT.dom.node("empty!", "center")
			]
		})).show();
	}
};