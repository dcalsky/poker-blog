# coding: utf-8


from flask import Flask
from flask.ext.cors import CORS
from model.article import Article_model
from model.user import User_model

app = Flask(__name__)
CORS(app)

# 动态路由
app.register_blueprint(User_model, url_prefix='/user')
app.register_blueprint(Article_model, url_prefix='/article')


@app.route('/')
def index():
    return "My friend, I just use it for back-end. Why are you so boring ?..."
