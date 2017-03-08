CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.require("user.core");
CT.dom.addStyle(null, "/css/layouts/results/" + core.config.ctstore.search.layout + ".css");

CT.onload(function() {
	CT.initCore();
	CT.dom.setContent(CT.dom.id("results"), "search away!");
	if (location.hash)
		store.core.search.results(unescape(location.hash.slice(1)));
});