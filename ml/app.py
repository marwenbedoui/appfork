import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from functions import datasetGeneration, prediction
import json

app = Flask(__name__)
load_dotenv()
app.debug = True

client = MongoClient(
    os.environ.get("MY_MONGO_CLIENT"))

db = client[os.environ.get("MY_MONGO_DB")]
test_collection = db["tests"]
rapports_collection = db["rapports"]

@app.route('/rapports/csv', methods=['GET'])
def generate_csv():
    datasetGeneration(test_collection)            
    return '<center><h1>Le fichier CSV est généré avec succès</h1><center>'

@app.route('/predict', methods=['GET'])
def statusPredict():
    requestNumber = request.json.get('requestNumber')
    added_lines = request.json.get('added_lines')
    removed_lines = request.json.get('removed_lines')
    loops_add = request.json.get('loops_add')
    loops_remove = request.json.get('loops_remove')
    conditions_add = request.json.get('conditions_add')
    conditions_remove = request.json.get('conditions_remove')
    
    pred = prediction(requestNumber, added_lines, removed_lines, loops_add, loops_remove, conditions_add, conditions_remove)
    bool_python = bool(pred)
    json_data = json.dumps(bool_python)
    
    donnees = {
        'prediction':json_data,
    }
    return jsonify(donnees)

if __name__ == '__main__':
    app.run(host="localhost", port=os.environ.get("FLASK_RUN_PORT"))
