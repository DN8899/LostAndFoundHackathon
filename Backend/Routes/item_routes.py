from PIL.DdsImagePlugin import item1, item
from flask import Flask, Blueprint, request, jsonify
from Database.db import db
from Models.item import Item

item_bp = Blueprint('item_bp', __name__)
@item_bp.route('/', methods=['POST'])
def create_item():
    data = request.json
    new_item = Item(name=data['name'], description=data['description'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Item created successfully"}), 201

@item_bp.route('/', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{"id": item.item_id,
                     "name": item.name,
                     "description": item.description,
                     "date": item.date,
                     "retrieved": item.retrieved,
                     "location": item.location,
                     "status": item.status,
                     "date_expired": item.date_expired,
                     "owner_id": item.owner_id} for item in items]), 200

@item_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    item_data = {
        "id": item.item_id,
        "name": item.name,
        "description": item.description,
        "date": item.date,
        "retrieved": item.retrieved,
        "location": item.location,
        "status": item.status,
        "date_expired": item.date_expired,
        "owner_id": item.owner_id
    }
    return jsonify({"item": item_data}), 200

@item_bp.route('/pending', methods=['GET'])
def get_pending_items():
    pending_items = Item.query.filter_by(status="pending").all()

    items_list = [
        {
            "id": item.item_id,
            "name": item.name,
            "description": item.description,
            "date": item.date,
            "retrieved": item.retrieved,
            "location": item.location,
            "status": item.status,
            "date_expired": item.date_expired,
            "owner_id": item.owner_id
        }
        for item in pending_items
    ]
    return jsonify({"items": items_list}), 200
