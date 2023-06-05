import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from functions import datasetGeneration, prediction
import json
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5000"}})
load_dotenv()
app.debug = True
app.config["CORS_HEADERS"] = "Content-Type"

client = MongoClient(os.environ.get("MY_MONGO_CLIENT"))

db = client[os.environ.get("MY_MONGO_DB")]
test_collection = db["tests"]
rapports_collection = db["rapports"]


@app.route("/rapports/csv", methods=["GET"])
def generate_csv():
    datasetGeneration(test_collection, rapports_collection)
    return "<center><h1>Le fichier CSV est généré avec succès</h1><center>"


@app.route("/predict", methods=["POST"])
def statusPredict():
    cpuCapacity = request.json.get("cpuCapacity")
    memoryCapacity = request.json.get("memoryCapacity")
    requestNumber = request.json.get("requestNumber")
    added_lines = request.json.get("added_lines")
    removed_lines = request.json.get("removed_lines")
    loops_add = request.json.get("loops_add")
    loops_remove = request.json.get("loops_remove")
    conditions_add = request.json.get("conditions_add")
    conditions_remove = request.json.get("conditions_remove")

    pred = prediction(
        cpuCapacity,
        memoryCapacity,
        requestNumber,
        added_lines,
        removed_lines,
        loops_add,
        loops_remove,
        conditions_add,
        conditions_remove,
    )
    success_predicted = bool(pred["success"])
    processTime_predicted = abs(float(pred["processTime"]))
    json_data = json.dumps(
        {
            "success_predicted": success_predicted,
            "processTime_predicted": processTime_predicted,
        }
    )

    donnees = {
        "success": success_predicted,
        "processTime": processTime_predicted / 60000,
    }
    return jsonify(donnees)


if __name__ == "__main__":
    app.run(host="localhost", port=os.environ.get("FLASK_RUN_PORT"))
