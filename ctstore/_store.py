from cantools.web import respond, succeed, fail, cgi_get
from model import db, Bid

def response():
	action = cgi_get("action", choices=["bid", "claim"])
	if action == "bid":
		bid = Bid()
		bid.user = cgi_get("user")
		bid.amount = cgi_get("amount")
		bid.auction = cgi_get("auction")
		bid.put()
	elif action == "claim":
		bid = db.get(cgi_get("bid"))
		if not bid.emailed:
			fail("it's not your turn!")
		auction = bid.auction.get()
		if auction.settled:
			fail("this auction is already settled!")
		auction.settled = True
		auction.put()
		# TODO: actually redirect to payment confirmation page
		# and only settle auction once user pays
		succeed("great! you agreed to pay %s -- you win!!"%(bid.amount,))

respond(response)