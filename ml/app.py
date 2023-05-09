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
    with open('rapports.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['cpu', 'memory','request number' , 'elapsed', 'bytes', 'sentBytes', 'Latency', 'Connect', 'processTime', 'addedCode', 'removedCode', 'success'])
        
        for test in tests:
            id_test = test['_id']
            cpu, memory = 0, 0
            
            for details in test["detail"]:
                cpu += details["cpu"]
                memory += details["memory"]
                
            cpu = cpu / len(test["detail"])
            memory = memory / len(test["detail"])
            success = False
            if (test["status"] == "Passed"): 
                success = True
            requestNumber = test["usersNumber"]
            rapports = rapports_collection.find({ "test": id_test })
            elapsed, bytes_, sentBytes, Latency, Connect, processTime = 0, 0, 0, 0, 0, 0
            count = rapports_collection.count_documents({ "test": id_test })
            
            for rapport in rapports:
                elapsed += rapport["elapsed"]
                bytes_ += rapport["bytes"]
                sentBytes += rapport["sentBytes"]
                Latency += rapport["Latency"]
                Connect += rapport["Connect"]
                processTime += rapport["processTime"]
                removedCode = rapport["removedCode"]
                addedCode = rapport["addedCode"]
            elapsed = elapsed / count if count > 0 else 0
            bytes_ = bytes_ / count if count > 0 else 0
            sentBytes = sentBytes / count if count > 0 else 0
            Latency = Latency / count if count > 0 else 0
            Connect = Connect / count if count > 0 else 0
            processTime = processTime / count if count > 0 else 0
            
            writer.writerow([cpu, memory, requestNumber ,elapsed, bytes_, sentBytes, Latency, Connect, processTime, addedCode, removedCode, success])
    
    return 'Le fichier CSV a été généré.'


if __name__ == '__main__':
    app.run(host="localhost", port=os.environ.get("FLASK_RUN_PORT"))
