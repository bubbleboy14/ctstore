CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");

var loadAuction = function(auctions) {
	if (!auctions.length)
		return CT.dom.setContent("ctmain", "no auction today. come back soon!");
	var auction = auctions[0], inode = CT.dom.node();
	CT.db.one(auction.item, function(item) {
		CT.dom.setContent(inode, [
			CT.dom.img(item.image, "wm1-2 hm1-2 right"),
			CT.dom.div(item.name, "bigger"),
			CT.dom.div(item.description, "pv10")
		]);
	});
	CT.dom.setContent("ctmain", CT.dom.div([
		inode,
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