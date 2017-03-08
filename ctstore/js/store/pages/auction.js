CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");

var loadAuction = function(auctions) {
	if (!auctions.length)
		return CT.dom.setContent("ctmain",
			CT.dom.div("no auction today. come back soon!", "centered padded"));
	var bid, izu, auction = auctions[0], inode = CT.dom.node(), bnode = CT.dom.div(null, "pb10"),
		u = user.core.get(), loadBid = function(bidz) {
			CT.dom.clear(bnode);
			if (bidz.length) {
				bid = bidz[0];
				izu = u.key == bid.user;
				CT.dom.addContent(bnode, (izu ? "Your" : "High") + " bid: " + bid.amount);
			}
			(!bid || !izu) && CT.dom.addContent(bnode, CT.dom.button("Place Bid", function() {
				(new CT.modal.Prompt({
					prompt: "How much?",
					cb: function(amount) {
						var params = {
							amount: amount,
							auction: auction.key,
							user: u.key
						};
						CT.net.post({
							path: "/_bid",
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
	CT.dom.setContent("ctmain", CT.dom.div([
		inode, bnode,
		[
			"Auction ends at: " + auction.deadline,
			CT.parse.countdown((CT.parse.string2date(auction.deadline) - Date.now()) / 1000)
		]
	], "padded"));
};

CT.onload(function() {
	CT.initCore();
	CT.db.get("auction", loadAuction, 1, 0, null, {
		deadline: {
			value: CT.parse.date2string(null, true),
			comparator: ">="
		}
	});
});