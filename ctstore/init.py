import os

jss = os.path.join("js", "store")
jsc = os.path.join(jss, "core")

dirs = [jss, jsc]

copies = {
	".": ["model.py"],
	"css": ["custom.css"],
	"html": ["index.html"]
}
copies[jsc] = ["config.js", "data.js"]

syms = {
	"css": ["store.css", "layouts"],
	"html": ["results.html", "checkout.html"]
}
syms[jss] = ["pay.js", "results.js", "home.js"]
syms[jsc] = ["cart.js", "search.js", "util.js"]

requires = ["ctuser"]