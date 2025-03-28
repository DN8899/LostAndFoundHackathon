from Database.db import db

class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'), nullable=False)
    date_posted = db.Column(db.String(80), unique=False, nullable=False)

    item = db.relationship('Item', backref='post', uselist=False)
