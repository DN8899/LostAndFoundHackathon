from PIL.DdsImagePlugin import item1
from flask import Flask, Blueprint, request, jsonify
from Database.db import db
from Models.item import Item

from Backend.Models import post, item
from Backend.Models.post import Post

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
