from sklearn.linear_model import LinearRegression
import csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier


def datasetGeneration(test_collection, rapports_collection):
    tests = test_collection.find()
    headers = [
        "cpuCapacity",
        "memoryCapacity",
        "requestNumber",
        "added_lines",
        "removed_lines",
        "loops_add",
        "loops_remove",
        "conditions_add",
        "conditions_remove",
        "processTime",
        "success",
    ]

    with open("rapports.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(headers)

        for test in tests:
            id_test = test["_id"]
            success = test["status"] == "Passed"
            requestNumber = test["usersNumber"]
            cpuCapacity = test["cpuCapacity"]
            memoryCapacity = test["memoryCapacity"]
            added_lines = test["added_lines"]
            removed_lines = test["removed_lines"]
            loops_add = test["loops_add"]
            loops_remove = test["loops_remove"]
            conditions_add = test["conditions_add"]
            conditions_remove = test["conditions_remove"]
            rapports = rapports_collection.aggregate(
                [
                    {"$match": {"test": id_test}},
                    {
                        "$group": {
                            "_id": None,
                            "processTime": {"$sum": "$processTime"},
                            "count": {"$sum": 1},
                        }
                    },
                ]
            )
            rapports = list(rapports)
            if len(rapports) > 0:
                rapports = rapports[0]
                processTime = rapports["processTime"] / rapports["count"]
            else:
                processTime = 0, 0, 0
            writer.writerow(
                [
                    cpuCapacity,
                    memoryCapacity,
                    requestNumber,
                    added_lines,
                    removed_lines,
                    loops_add,
                    loops_remove,
                    conditions_add,
                    conditions_remove,
                    processTime,
                    success,
                ]
            )


def prediction(
    cpuCapacity,
    memoryCapacity,
    requestNumber,
    added_lines,
    removed_lines,
    loops_add,
    loops_remove,
    conditions_add,
    conditions_remove,
):
    data = pd.read_csv("rapports.csv")
    X = data.drop(["success", "processTime"], axis=1)
    y_success = data["success"]
    y_processTime = data["processTime"]

    (
        X_train,
        X_test,
        y_train_success,
        y_test_success,
        y_train_processTime,
        y_test_processTime,
    ) = train_test_split(X, y_success, y_processTime, test_size=0.2, random_state=42)

    # Initialiser l'arbre de décision avec des paramètres par défaut pour prédire "success"
    tree_success = DecisionTreeClassifier()
    tree_success.fit(X_train, y_train_success)

    # Initialiser la régression linéaire pour prédire "processTime"
    regressor_processTime = LinearRegression()
    regressor_processTime.fit(X_train, y_train_processTime)

    X_new = pd.DataFrame(
        {
            "cpuCapacity": [cpuCapacity],
            "memoryCapacity": [memoryCapacity],
            "requestNumber": [requestNumber],
            "added_lines": [added_lines],
            "removed_lines": [removed_lines],
            "loops_add": [loops_add],
            "loops_remove": [loops_remove],
            "conditions_add": [conditions_add],
            "conditions_remove": [conditions_remove],
        }
    )
    y_new = {}
    y_new["processTime"] = regressor_processTime.predict(X_new)
    y_new["success"] = tree_success.predict(X_new)
    return y_new
