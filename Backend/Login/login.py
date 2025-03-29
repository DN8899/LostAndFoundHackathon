from flask import request, jsonify, Blueprint
from Database import db
from Models.user import User

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404
    if user.password != password:
        return jsonify({'message': 'Incorrect password'}), 401

    return jsonify({'message': 'Login successful'}), 200