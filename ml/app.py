import os
from flask import Flask, Response
from dotenv import load_dotenv
from pymongo import MongoClient
import csv
from functions import count_changes

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
test_collection = db["tests"]
rapports_collection = db["rapports"]


@app.route('/')
def hello():
    return 'Hello,World'


@app.route('/tests', methods=['GET'])
def get_tests():
    # query the collection and retrieve all documents
    tests = test_collection.find()

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
    tests = test_collection.find()
    headers = ['cpu', 'memory','request number','bytes', 'sentBytes',  'processTime', 'added_lines', 'removed_lines', 'loops_add', 'loops_remove', 'conditions_add', 'conditions_remove', 'success']
    
    with open('rapports.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        
        for test in tests:
            id_test = test['_id']
            details = test["detail"]
            cpu = sum(detail["cpu"] for detail in details) / len(details)
            memory = sum(detail["memory"] for detail in details) / len(details)
            success = test["status"] == "Passed"
            requestNumber = test["usersNumber"]
            added_lines = test["added_lines"]
            removed_lines = test["removed_lines"]
            loops_add = test["loops_add"]
            loops_remove = test["loops_remove"]
            conditions_add = test["conditions_add"]
            conditions_remove = test["conditions_remove"]
            rapports = rapports_collection.aggregate([
                {"$match": {"test": id_test}},
                {"$group": {
                    "_id": None,
                    "bytes": {"$sum": "$bytes"},
                    "sentBytes": {"$sum": "$sentBytes"},
                    "processTime": {"$sum": "$processTime"},
                    "count": {"$sum": 1}
                }}
            ])
            rapports = list(rapports)
            if len(rapports) > 0:
                rapports = rapports[0]
                bytes_ = rapports["bytes"] / rapports["count"]
                sentBytes = rapports["sentBytes"] / rapports["count"]
                processTime = rapports["processTime"] / rapports["count"]
            else:
                bytes_, sentBytes, processTime = 0, 0, 0
            
            # changes = [(count_changes(rapport["addedCode"], rapport["removedCode"])) for rapport in rapports_collection.find({ "test": id_test })]
            # added_lines, removed_lines, loops_add, loops_remove = sum(change[0] for change in changes), sum(change[1] for change in changes), sum(change[2] for change in changes), sum(change[3] for change in changes)
            # conditions_add, conditions_remove = sum(change[4] for change in changes), sum(change[5] for change in changes)

            writer.writerow([cpu, memory, requestNumber, bytes_, sentBytes, processTime, added_lines, removed_lines, loops_add, loops_remove, conditions_add, conditions_remove, success])
    
    return 'Le fichier CSV a été généré.'


if __name__ == '__main__':
    app.run(host="localhost", port=os.environ.get("FLASK_RUN_PORT"))
