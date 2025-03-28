from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from Database.db import db
from Models.user import User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['POST'])
@cross_origin()
def create_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@user_bp.route('/', methods=['GET'])
@cross_origin()
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.user_id, "email": user.email} for user in users]), 200

