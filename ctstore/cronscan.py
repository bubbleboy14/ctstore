from datetime import datetime
from cantools.web import respond, succeed, log, send_mail
from cantools import config
from model import db, Auction, Bid

CSB = """you did it!

great work.

here's your thing: %s

enjoy!
"""

def response():
	log("initiating cronscan", important=True)
	az = Auction.query(
		Auction.settled == False,
		Auction.deadline <= datetime.now()
	).all()
	log("found %s active auctions"%(len(az),))
	for a in az:
		b = Bid.query(
			Bid.emailed == False,
			Bid.auction == a.key
		).order("-amount").get()
		if b:
			u = b.user.get()
			log("emailing %s"%(u.email,), 1)
			cw = config.web
			send_mail(
				to = u.email,
				subject = "you won the auction!",
				body = CSB%("%s://%s:%s/_store?action=claim&bid=%s"%(cw.protocol,
					cw.host, cw.port, b.key.urlsafe()),)
			)
			b.emailed = True
			b.put()
	log("cronscan succeeded -- goodbye!")

respond(response, failMsg="cronscan failed")