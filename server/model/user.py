# -*- coding: utf-8 -*-


from leancloud import Object, Query, User, LeanCloudError
from flask import Blueprint, jsonify, request

User_model = Blueprint('User', __name__)

@User_model.route("/login", methods=["POST"])
def login():
    try:
        User().login(request.get_json()["username"], request.get_json()["password"])
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok",
        "username": request.get_json()["username"]
    })


@User_model.route("/register", methods=["POST"])
def register():
    try:
        user = User()
        user.set("username", request.get_json()["username"])
        user.set("password", request.get_json()["password"])
        user.sign_up()
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok",
        "username": request.get_json()["username"]
    })


@User_model.route("/delete", methods=["POST"])
def delete():
    pass
