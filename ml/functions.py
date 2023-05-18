import csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def datasetGeneration(collection):
    tests = collection.find()
    headers = ['requestNumber', 'added_lines', 'removed_lines', 'loops_add', 'loops_remove', 'conditions_add', 'conditions_remove', 'success']
    
    with open('rapports.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        
        for test in tests:
            success = test["status"] == "Passed"
            requestNumber = test["usersNumber"]
            added_lines = test["added_lines"]
            removed_lines = test["removed_lines"]
            loops_add = test["loops_add"]
            loops_remove = test["loops_remove"]
            conditions_add = test["conditions_add"]
            conditions_remove = test["conditions_remove"]
                        
            writer.writerow([requestNumber, added_lines, removed_lines, loops_add, loops_remove, conditions_add, conditions_remove, success])

def prediction(requestNumber, added_lines, removed_lines, loops_add, loops_remove, conditions_add, conditions_remove):
    data = pd.read_csv('rapports.csv')
    X = data.drop(['success'], axis=1)
    
    X_train, X_test, y_train, y_test = train_test_split(X, data['success'], test_size=0.2, random_state=42)
    
    # Random Forest Algorithm
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    X_new = pd.DataFrame({'requestNumber': [requestNumber], 'added_lines': [added_lines], 'removed_lines': [removed_lines], 'loops_add': [loops_add], 'loops_remove': [loops_remove], 'conditions_add': [conditions_add], 'conditions_remove': [conditions_remove]})
    y_new = model.predict(X_new)

    return y_new