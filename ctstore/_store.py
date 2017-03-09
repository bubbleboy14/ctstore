from cantools.web import respond, succeed, cgi_get
from model import db, Bid

def response():
	action = cgi_get("action", choices=["bid"])
	if action == "bid":
		bid = Bid()
		bid.user = cgi_get("user")
		bid.amount = cgi_get("amount")
		bid.auction = cgi_get("auction")
		bid.put()

respond(response)