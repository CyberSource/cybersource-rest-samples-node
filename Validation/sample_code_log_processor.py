
"""
IMPORTS
"""

import argparse
import re
import json

"""
ARGUMENT PARSER
"""

def parse_arguments():
    parser = argparse.ArgumentParser(description="Processes the log file from Sample Code Testing")
    parser.add_argument("--log", "-l", help="Log file for the current testing run of Sample Codes")
    parser.add_argument("--output", "-o", help="JSON file to store the actual results from the current testing run")
    
    args = parser.parse_args()
    log_path = args.log
    output_file = args.output
    return log_path, output_file

"""
LOG FILE PROCESSOR
"""

def process_log_file(filepath):
    with open(filepath, "r", encoding = "utf-8") as file:
        contents = file.read()
    matches = re.findall(r"(\[Sample Code Testing\]) (\[([A-Za-z0-9\-_]+)\]) ([0-9]{3})", contents)

    return matches

"""
ADD TO JSON OBJECT
"""

def add_to_json_object(json_obj, key, value):
    json_obj[key] = value
    return json_obj

"""
DUMP JSON TO FILE
"""

def dump_json_to_file(filepath, src):
    with open(filepath, "w") as file:
        json.dump(src, file, ensure_ascii=False, indent=4)

"""
MAIN FUNCTION
"""

def main():
    current_log_file, output_json_file = parse_arguments()
    log_statements = process_log_file(current_log_file)
    
    code_map = {}
    for statement in log_statements:
        if statement[2] not in ("Configuration"):
            code_map = add_to_json_object(code_map, statement[2], statement[3])

    dump_json_to_file(output_json_file, code_map)

if __name__ == "__main__":
    main()