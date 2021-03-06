CT.require("CT.all");
CT.require("core");
CT.require("store");
CT.require("user.core");
CT.dom.addStyle(null, "/css/layouts/results/" + core.config.ctstore.search.layout + ".css");

CT.onload(function() {
	CT.initCore();
	CT.dom.setContent("ctmain", "search away!");
	var terms = unescape(location.hash.slice(1));
	if (terms) {
		if (terms == "LIST")
			store.core.search.all();
		else
			store.core.search.results(terms);
	}
});