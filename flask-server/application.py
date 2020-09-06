from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pymongo
from pymongo import MongoClient
from flask_pymongo import PyMongo
from bson import ObjectId
import json
from decouple import config
from sendemail import sendEmail


application = app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = config('MONGO_URI')
mongo = PyMongo(app)
db = mongo.db.newusers


@app.route("/")
def my_index():
    return render_template("index.html")


@app.route('/data', methods=["GET", "POST"])
def getusers():
    if request.method == "GET":
        o = []
        for i in db.find():
            o.append({"_ID": str(ObjectId(
                i["_id"])), "name": i["name"], "email": i["email"]})
        return jsonify(o)
    elif request.method == "POST":
        id = db.insert(
            {"name": request.json["name"], "email": request.json["email"]})
        return jsonify(str(ObjectId(id)))


@app.route('/data/<id>', methods=["DELETE", "PUT"])
def deleteput(id):
    if request.method == "DELETE":
        db.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "deleted"})
    elif request.method == "PUT":
        db.update({"_id": ObjectId(id)}, {"$set": {
            "name": request.json["name"],
            "email": request.json["email"]
        }})
        return jsonify({"message": "updated"})


@app.route('/data/getone/<id>', methods=["GET"])
def getone(id):
    res = db.find_one({"_id": ObjectId(id)})
    return {"_ID": str(ObjectId(res["_id"])), "name": res["name"], "email": res["email"]}


@app.route('/sendemail/<address>/<subject>/<content>', methods=["POST"])
def sendmail(address, subject, content):
    sendEmail(str(address), str(subject), str(content))
    print(address + " " + subject + " " + content)
    return {"message": [str(address), str(subject), str(content)]}
