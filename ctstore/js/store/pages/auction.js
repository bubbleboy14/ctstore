CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");

CT.onload(function() {
	CT.initCore();
	store.core.util.auction.acquire();
});