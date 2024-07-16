
"""
IMPORTS
"""

import argparse
import os
import re
import copy
import json
import re
from json2html import *
from xhtml2pdf import pisa
from bs4 import BeautifulSoup as bs, Tag

"""
ARGUMENT PARSER
"""

def parse_arguments():
    parser = argparse.ArgumentParser(description="Converts JSON result data to HTML")
    parser.add_argument("--input", "-i", help="JSON file containing result data to be rendered")
    parser.add_argument("--output", "-o", help="HTML file generated from the JSON data")

    args = parser.parse_args()
    input_file = args.input
    output_file = args.output
    return input_file, output_file

"""
LOAD JSON FILE
"""

def load_json_file(file):
    with open(file, "r") as file_handle:
        file_contents = json.load(file_handle)
    return file_contents

"""
CONVERT JSON TO HTML
"""

def convert_json_to_html(data, file):
    with open(file, "w") as file_handle:
        file_handle.write(json2html.convert(json=data))

"""
PRETTIFY HTML
"""

def prettify_html(file):
    with open(file, "r") as file_handle:
        soup = bs(file_handle, "html.parser")
  
    # Processing table
    table_tag = soup.table
    table_tag.name = "table"
    table_tag["style"] = """
            width: 95%;
            border-collapse:collapse;
            margin-left:auto;
            margin-right:auto;
            font-family: Helvetica, sans-serif;
            font-size: 10px;
            vertical-align: bottom;
    """

    # Processing second column
    second_col_tags = soup.find_all("td")
    for second_col_single_tag in second_col_tags:
        more_style = ""
        if "FAILURE" in second_col_single_tag.contents[0]:
            more_style = """
                color: #FFFFFF;
                background-color: #E34234
            """
        elif "SUCCESS" in second_col_single_tag.contents[0]:
            more_style = """
                color: #000000;
                background-color: #50C878
            """
        elif "SAMPLE CODE" in second_col_single_tag.contents[0]:
            more_style = """
                color: #E34234;
                background-color: #FFE135
            """
        second_col_single_tag.name = "td"
        second_col_single_tag["style"] = "text-align: center; padding-top: 2px; padding-bottom: 0px; vertical-align: middle;" + more_style

    # Processing first column
    first_col_tags = soup.find_all("th")
    first_col_style = """
        text-align: left;
        padding-top: 2px;
        padding-bottom: 0px;
        vertical-align: middle;
        padding-left: 10px;
    """
    for first_col_single_tag in first_col_tags:
        first_col_single_tag.name = "td"
        first_col_single_tag["style"] = first_col_style

    # Create header rows
    first_column_style = """
        text-align: center;
        padding-top: 2px;
        padding-bottom: 0px;
        padding-left: 10px;
        color: #FFFFFF;
        background-color: #333399;
        font-size: 12px;
        width: 70%;
    """
    first_column_header = soup.new_tag("th", style=first_column_style)
    first_column_header.insert(3, "Sample Code Tested")

    second_column_style = """
        text-align: center;
        padding-top: 2px;
        padding-bottom: 0px;
        color: #FFFFFF;
        background-color: #333399;
        font-size: 12px;
        width: 30%;
    """
    second_column_header = soup.new_tag("th", style=second_column_style)
    second_column_header.insert(3, "Validation Result")

    # Insert header rows into table
    table_tag.insert(0, second_column_header)
    table_tag.insert(0, first_column_header)
    
    with open(file, "wb") as file_handle:
        file_handle.write(soup.prettify("utf-8"))

"""
CONVERT HTML TO PDF
"""

def convert_html_to_pdf(file):
    with open(file, "r") as src:
        source_html = src.read()

    output_file = file.split(".")[0] + ".pdf"

    try:
        with open(output_file, "w+b") as result_file:
            pisa_status = pisa.CreatePDF(source_html, dest=result_file)

        if pisa_status.err != 0:
            raise Exception('Error during PDF file creation:\n' + pisa_status.err)
    except Exception as e:
        raise e

"""
MAIN FUNCTION
"""

def main():
    input_file, output_file = parse_arguments()
    json_data = load_json_file(input_file)
    convert_json_to_html(json_data, output_file)
    prettify_html(output_file)

    try:
        convert_html_to_pdf(output_file)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()