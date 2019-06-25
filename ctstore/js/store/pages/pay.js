CT.require("CT.all");
CT.require("CT.pay");
CT.require("core.config");
CT.require("store.core.search");
CT.require("store.core.cart");
CT.require("store.core.util");

CT.onload(function() {
	var pnode = CT.dom.div(null, "w1 h1"),
		pcfg = core.config.ctstore.payment;
	CT.initCore();
	store.core.cart.load();
	CT.dom.setContent("items", store.core.cart.list());
	CT.dom.setContent("payment", pnode);
	CT.pay.init({ // TODO: fuller integration, including cc!
		mode: pcfg.mode,
		cb: function() {
			new CT.pay.Form({
				parent: pnode
			});
		}
	});
	if (pcfg.notice) {
		(new CT.modal.Modal({
			transition: "slide",
			content: pcfg.notice
		})).show();
	}
});