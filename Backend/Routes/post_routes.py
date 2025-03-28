from PIL.DdsImagePlugin import item1
from flask import Flask, Blueprint, request, jsonify
from Database.db import db
from Models.item import Item
from Models.post import Post

post_bp = Blueprint('post_bp', __name__)
@post_bp.route('/', methods=['POST'])
def create_post():
    def create_post():
        data = request.json
        new_post = Post(name=data['name'], description=data['description'])
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'id': new_post.id}), 201

@post_bp.route('/', methods=['GET'])
def get_post():
    posts = Post.query.all()
    post_list = []
    for post in posts:
        post_list.append({
            "id": post.id,
            "name": post.name,
            "description": post.description,
            "user_id": post.user_id,
            "item_id": post.item_id,
            "date_posted": post.date_posted
        })
    return jsonify(posts), 200

@post_bp.route('/<int:post_id>', methods=['GET'])
def post_item(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    post_data = {
        "id": post.id,
        "name": post.name,
        "description": post.description,
        "user_id": post.user_id,
        "item_id": post.item_id,
        "date_posted": post.date_posted,
    }
    return jsonify({"item": post_data}), 200

@post_bp.route('/<int:item_id>/complete', methods=['POST'])
def complete_post(item_id):
    item = Item.query.get(item_id)

    if not item:
        return jsonify({"Error": "Item not found"}), 404

    item.retrieved = True
    item.status = 'Found'

    db.session.commit()

    return jsonify({"message": "Item marked as found", "item_id": item.item_id, "status": item.status}), 200



