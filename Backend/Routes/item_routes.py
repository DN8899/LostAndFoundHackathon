from PIL.DdsImagePlugin import item1
from flask import Flask, Blueprint, request, jsonify
from Database.db import db
from Models.item import Item

item_bp = Blueprint('item_bp', __name__)
@item_bp.route('/items', methods=['POST'])
def create_item():
    data = request.json
    new_item = Item(name=data['name'], description=data['description'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Item created successfully"}), 201

@item_bp.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{"id": item.item_id, "name": item.name, "description": item.description} for item in items]), 200


