import os

jss = os.path.join("js", "store")

dirs = [jss]

copies = {
	"css": ["custom.css"],
	"html": ["index.html"]
}
copies[jss] = ["data.js"]

syms = {
	"js": ["store.js"],
	"css": ["store.css", "layouts"],
	"html": ["store"]
}
syms[jss] = ["core.js", "core", "pages"]
model = {
	"ctstore.model": ["*"]
}

requires = ["ctuser"]