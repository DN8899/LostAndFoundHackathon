import lamda

from Database.db import db
from datetime import datetime, timedelta

class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Text)
    retrieved = db.Column(db.Boolean, nullable=False, default=False)
    location = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(10), nullable=False)
    date_expired = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)

