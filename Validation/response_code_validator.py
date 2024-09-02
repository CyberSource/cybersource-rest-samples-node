
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
    parser = argparse.ArgumentParser(description="Validates Response Codes for Requests")
    parser.add_argument("--expected", "-e", help="Source file containing the expected response codes for the requests")
    parser.add_argument("--actual", "-a", help="Log file for the current testing run")
    parser.add_argument("--output", "-o", help="Output JSON file for the result of validation")
    
    args = parser.parse_args()
    expected = args.expected
    actual = args.actual
    output = args.output
    return expected, actual, output

"""
ADD TO JSON OBJECT
"""

def add_to_json_object(json_obj, key, value):
    json_obj[key] = value
    return json_obj

"""
DUMP JSON TO FILE
"""

def dump_json_to_file(json_obj, filepath):
    with open(filepath, "w") as file:
        json.dump(json_obj, file, ensure_ascii=False, indent=4)

"""
LOAD EXPECTED JSON FILE
"""

def load_file(file):
    file_content = json.load(open(file, "r"))
    if "/pts/v2/payments" in file_content:
        flat_json_object = {}
        for path in file_content:
            path_content = file_content[path]
            for verb in path_content:
                samples_content = path_content[verb]
                for sample_name, response_code in samples_content.items():
                    flat_json_object = add_to_json_object(flat_json_object, sample_name, response_code)
        return flat_json_object
    else:
        return file_content

"""
COMPARE RESULTS
"""

def compare_results(expected, actual):
    code_map = {}
    for sample, response in actual.items():
        if sample in expected:
            if expected[sample] == response:
                validation = "SUCCESS"
            else:
                validation = "FAILURE [ Expected : " + str(expected[sample]) + " | Actual : " + str(response) + " ]"

            code_map = add_to_json_object(code_map, sample, validation)
            expected.pop(sample)
        else:
            code_map = add_to_json_object(code_map, sample, "UNEXPECTED SAMPLE CODE FOUND")

    for remaining_sample, remaining_response in expected.items():
        code_map = add_to_json_object(code_map, remaining_sample, "SAMPLE CODE NOT EXECUTED | Expected : " + str(remaining_response))

    return code_map

"""
MAIN FUNCTION
"""

def main():
    expected_json_file, actuals_json_file, destination_file = parse_arguments()
    expected_results = load_file(expected_json_file)
    actual_results = load_file(actuals_json_file)
    
    fails = 0
    validation_results = compare_results(expected_results, actual_results)
    for k, v in validation_results.items():
        if v == "FAILURE":
            fails += 1
    dump_json_to_file(validation_results, destination_file)
    return fails

if __name__ == "__main__":
    main()