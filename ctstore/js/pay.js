CT.require("CT.all");
CT.require("CT.pay");
CT.require("core.config");
CT.require("core.search");
CT.require("core.cart");
CT.require("core.util");

CT.onload(function() {
	var pnode = CT.dom.node("", "div", "w1 h1");
	core.cart.load();
	core.util.header();
	CT.dom.setContent(CT.dom.id("items"), core.cart.list());
	CT.dom.setContent(CT.dom.id("payment"), pnode);
	new CT.pay.Form({
		parent: pnode
	});
});