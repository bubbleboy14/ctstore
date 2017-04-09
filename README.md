# ctstore
This package enables the developer to create a basic ecommerce website with nothing but configuration.


# Back (Init Config)

    import os
    
    jss = os.path.join("js", "store")
    
    dirs = [jss]
    
    copies = {
    	".": ["cron.yaml"],
    	"css": ["custom.css"],
    	"html": ["index.html"]
    }
    copies[jss] = ["data.js"]
    
    syms = {
    	".": ["_store.py", "cronscan.py"],
    	"js": ["store.js"],
    	"css": ["store.css", "layouts"],
    	"html": ["store"]
    }
    syms[jss] = ["core.js", "core", "pages"]
    model = {
    	"ctstore.model": ["*"]
    }
    routes = {
    	"/_store": "_store.py",
    	"/cronscan": "cronscan.py"
    }
    
    requires = ["ctuser"]

# Front (JS Config)

## core.config.ctstore
### Import line: 'CT.require("core.config");'
    {
    	"name": "CTStore E-Commerce Application",
    	"data": "json",
    	"search": {
    		"layout": "slideshow",
    		"data": ["product"],
    		"buttons": [],
    		"blurs": [ "what are you looking for?", "what ails you?", "enter search terms" ]
    	},
    	"landing": {
    		"layout": "a",
    		"product_message": "Buy Now!",
    		"showcase": ["product"],
    		"finder": ["product"]
    	},
    	"pay_notice": null,
    	"img_fallback": "https://skirtingboardsdirect.com/wp-content/uploads/2014/12/Fallback-Image-400x400.png"
    }