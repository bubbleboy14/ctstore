store.core.util = {
	modal: function(d, dtype) {
		var content = [
			CT.dom.node(d.name, "div", "biggest"),
			CT.dom.node(d.description)
		];
		if (dtype && dtype.startsWith("product")) {
			content.push(CT.dom.button("Add to Cart", function() {
				store.core.cart.increase(d);
				alert("ok!");
			}, "w1 bigger padded mv5"));
		} else if (d.buttons)
			for (var b in d.buttons)
				content.push(CT.dom.button(b, d.buttons[b], "w1 bigger padded mv5"));
		(new CT.modal.Modal({
			transition: "slide",
			content: content
		})).show();
	}
};

store.core.util.auction = {
	acquire: function(target, alt_bid) {
		CT.db.get("auction", function(auctions) {
			store.core.util.auction.render(auctions, target, alt_bid);
		}, 1, 0, null, {
			deadline: {
				value: CT.parse.date2string(null, true),
				comparator: ">="
			}
		});
	},
	render: function(auctions, target, alt_bid) {
		if (!auctions.length)
			return CT.dom.setContent(target || "ctmain",
				CT.dom.div("no auction today. come back soon!", "centered padded"));
		var bid, izu, auction = auctions[0], inode = CT.dom.node(), bnode = CT.dom.div(null, "pb10"),
			u = user.core.get(), loadBid = function(bidz) {
				CT.dom.clear(bnode);
				if (bidz.length) {
					bid = bidz[0];
					izu = u.key == bid.user;
					CT.dom.addContent(bnode, (izu ? "Your" : "High") + " bid: " + bid.amount);
				}
				(!bid || !izu) && CT.dom.addContent(bnode, CT.dom.button("Place Bid", alt_bid || function() {
					(new CT.modal.Prompt({
						prompt: "How much?",
						cb: function(amount) {
							var params = {
								action: "bid",
								amount: amount,
								auction: auction.key,
								user: u.key
							};
							CT.net.post({
								path: "/_store",
								params: params,
								cb: function() {
									loadBid([params]);
								}
							});
						}
					})).show();
				}));
			};
		CT.db.one(auction.item, function(item) {
			CT.dom.setContent(inode, [
				CT.dom.img(item.image, "wm1-2 hm1-2 right"),
				CT.dom.div(item.name, "bigger"),
				CT.dom.div(item.description, "pv10")
			]);
		});
		CT.db.get("bid", loadBid, 1, 0, "-amount", {
			auction: auction.key
		});
		CT.dom.setContent(target || "ctmain", CT.dom.div([
			inode, bnode,
			[
				"Auction ends at: " + auction.deadline,
				CT.parse.countdown((CT.parse.string2date(auction.deadline) - Date.now()) / 1000)
			]
		], "padded"));
	}
};

var cfg = core.config.ctstore;
if (cfg.nofrills)
	CT.dom.Q('link[rel=stylesheet][href="/css/store.css"]', document.head)[0].remove();
else {
	if (core.config.footer && !core.config.footer.logo)
		core.config.footer.logo = ccc.logo || ccc.name;
	core.config.header.right.push(store.core.search.field());
	if (!core.config.header.centerLogo)
		core.config.header.centerLogo = false;
	if (!core.config.header.rightPadding)
		core.config.header.rightPadding = "25px";
	if (location.pathname != "/store/checkout.html")
		core.config.header.right.push(CT.dom.link("Shopping Cart",
			store.core.cart.modal, null, core.config.ctstore.cart_link_class || "block pv10"));
}
