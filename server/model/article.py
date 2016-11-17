# -*- coding: utf-8 -*-

from leancloud import Object, Query, LeanCloudError
from flask import jsonify, Blueprint, request
from datetime import datetime

Comment = Object.extend('Comment')
Article = Object.extend('Article')

Article_model = Blueprint('Article', __name__)


@Article_model.route('/general')
def get_general():
    try:
        article_list = Query(Article).descending("createdAt").find()
        articles = map(lambda article: {
            "title": article.get("title"),
            "desc": article.get("desc"),
            "date": article.get("date"),
            "article_id": article.id
        }, article_list)
    except LeanCloudError, e:
        if e.code == 101:
            return jsonify({
                "status": "error",
                "message": "101"
            })
        else:
            raise e
    return jsonify({
        "status": "ok",
        "articles": articles
    })


@Article_model.route("/<article_id>")
def get(article_id):
    try:
        article = Query(Article).get(article_id)
        comment_list = Query(Comment).equal_to("article", article).descending("createdAt").find()
        comments = map(lambda comment: {
            "username": comment.get("username"),
            "content": comment.get("content"),
            "date": comment.get("date"),
            "id": comment.id
        }, comment_list)
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok",
        "title": article.get("title"),
        "desc": article.get("desc"),
        "date": article.get("date"),
        "content": article.get("content"),
        "comments": comments
    })


@Article_model.route("/comment", methods=["POST"])
def comment():
    try:
        comment = Comment()
        article = Article()
        article.id = request.get_json()["article_id"]
        date = datetime.now()
        comment.set("username", request.get_json()["username"])
        comment.set("content", request.get_json()["content"])
        comment.set("date", date)
        comment.set("article", article)
        comment.save()
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok",
        "username": request.get_json()["username"],
        "date": date,
        "id": comment.id
    })


@Article_model.route("/delete", methods=["POST"])
def delete():
    try:
        article = Article()
        article.id = request.get_json()["article_id"]
        article.destroy()
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok"
    })


@Article_model.route("/publish", methods=["POST"])
def publish():
    try:
        article = Article()
        article.set("title", request.get_json()["title"])
        article.set("content", request.get_json()["content"])
        article.set("desc", request.get_json()["desc"])
        article.set("date", datetime.now())
        article.save()
    except LeanCloudError, e:
        raise e
    return jsonify({
        "status": "ok"
    })
