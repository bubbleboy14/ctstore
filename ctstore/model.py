from cantools import db

class Product(db.ModelBase):
	name = db.String()
	description = db.Text()
	image = db.Binary()
	price = db.Float()
	variety = db.String()

class Item(db.ModelBase): # keeps it listed separately...
	name = db.String()
	description = db.Text()
	image = db.Binary()

class Auction(db.ModelBase):
	item = db.ForeignKey(kind=Item)
	deadline = db.DateTime()
	settled = db.Boolean(default=False)

class Bid(db.ModelBase):
	auction = db.ForeignKey(kind=Auction)
	user = db.ForeignKey()
	amount = db.Float()
	emailed = db.Boolean(default=False)
