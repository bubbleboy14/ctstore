CT.require("CT.all");
CT.require("core.config");
CT.require("core.search");
CT.require("core.data");
CT.require("core.cart");
CT.require("core.util");

CT.onload(function() {
	core.util.header();
	CT.dom.setContent(CT.dom.id("results"), "search away!");
	if (location.hash)
		core.search.results(unescape(location.hash.slice(1)));
});