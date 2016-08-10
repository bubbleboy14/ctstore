import os

jss = os.path.join("js", "store")

dirs = [jss]

copies = {
	".": ["model.py"],
	"css": ["custom.css"],
	"html": ["index.html"]
}
copies[jss] = ["config.js", "data.js"]

syms = {
	"js": ["store.js"],
	"css": ["store.css", "layouts"],
	"html": ["store"]
}
syms[jss] = ["core.js", "core", "pages"]

requires = ["ctuser"]