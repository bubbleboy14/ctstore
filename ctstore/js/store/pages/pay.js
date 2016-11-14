CT.require("CT.all");
CT.require("CT.pay");
CT.require("core.config");
CT.require("store.core.search");
CT.require("store.core.cart");
CT.require("store.core.util");

CT.onload(function() {
	store.core.util.header();
	store.core.util.footer();
	var pnode = CT.dom.node("", "div", "w1 h1");
	store.core.cart.load();
	CT.dom.setContent(CT.dom.id("items"), store.core.cart.list());
	CT.dom.setContent(CT.dom.id("payment"), pnode);
	new CT.pay.Form({
		parent: pnode
	});
	if (core.config.ctstore.pay_notice) {
		(new CT.modal.Modal({
			transition: "slide",
			content: core.config.ctstore.pay_notice
		})).show();
	}
});