import re
import urllib.request

def count_changes(added_code_path, removed_code_path):
    response_added = urllib.request.urlopen(added_code_path)
    response_removed = urllib.request.urlopen(removed_code_path)
     
    added_code = response_added.read().decode('utf-8')
    removed_code = response_removed.read().decode('utf-8')

    added_lines = len(re.findall(r'^\+.*', added_code, flags=re.MULTILINE)) - len(re.findall(r'^\+\+\+.*', added_code, flags=re.MULTILINE))
    removed_lines = len(re.findall(r'^\-.*', removed_code, flags=re.MULTILINE)) - len(re.findall(r'^\-\-\-.*', removed_code, flags=re.MULTILINE))
    loops_add = len(re.findall(r'for.*{', added_code))
    loops_remove = len(re.findall(r'for.*{', removed_code))
    conditions_add = len(re.findall(r'if.*{', added_code))
    conditions_remove = len(re.findall(r'if.*{', removed_code))

    return added_lines, removed_lines, loops_add, loops_remove, conditions_add, conditions_remove
    