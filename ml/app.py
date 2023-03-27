import os
from flask import Flask
from dotenv import load_dotenv
from pymongo import MongoClient

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


if __name__ == '__main__':
    app.run(host="localhost", port=5001)
