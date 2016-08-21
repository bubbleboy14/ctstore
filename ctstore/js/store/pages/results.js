CT.require("CT.all");
CT.require("core.config");
CT.require("store");
CT.dom.addStyle(null, "/css/layouts/results/" + core.config.ctstore.search.layout + ".css");

CT.onload(function() {
	store.core.util.header();
	store.core.util.footer();
	CT.dom.setContent(CT.dom.id("results"), "search away!");
	if (location.hash)
		store.core.search.results(unescape(location.hash.slice(1)));
});