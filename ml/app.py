import os
from flask import Flask, Response
from dotenv import load_dotenv
from pymongo import MongoClient
import csv


app = Flask(__name__)
load_dotenv()

# Enable debug mode
# Auto reload when saving
app.debug = True

# create a MongoClient instance
client = MongoClient(
    os.environ.get("MY_MONGO_CLIENT"))

# select the database
db = client[os.environ.get("MY_MONGO_DB")]
collection = db["tests"]
rapports_collection = db["rapports"]


@app.route('/')
def hello():
    return 'Hello,World'


@app.route('/tests', methods=['GET'])
def get_tests():
    # query the collection and retrieve all documents
    tests = collection.find()

    # create a list of test dictionaries
    test_list = []
    for test in tests:
        test_dict = {"testName": test["testName"], "port": test["port"],
                     "url": test["url"], "method": test["method"], "usersNumber": test["usersNumber"]}
        test_list.append(test_dict)

    # return the list of tests as a JSON response
    return {"tests": test_list}


@app.route('/rapports/csv')
def generate_csv():
    # Récupération des données de la collection "rapports"
    rapports = rapports_collection.find()

    # Configuration du fichier CSV
    with open('rapports.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['timeStamp', 'elapsed', 'bytes', 'sentBytes',
                        'Latency', 'Connect', 'processTime', 'responseCode', 'addedCode', 'removedCode', 'success'])
        for rapport in rapports:
            writer.writerow([rapport["timeStamp"], rapport["elapsed"], rapport["bytes"], rapport["sentBytes"],
                            rapport["Latency"],  rapport["Connect"],  rapport["processTime"], rapport["responseCode"], rapport["addedCode"], rapport["removedCode"], rapport["success"]])

    return 'Le fichier CSV a été généré.'


if __name__ == '__main__':
    app.run(host="localhost", port=os.environ.get("FLASK_RUN_PORT"))
