var assert = require('assert');
var fs = require('fs');
console.log(__dirname);
var obj = JSON.parse(fs.readFileSync(__dirname + "\\" + "executor.json", 'utf8'));
var roads = obj['Execution Order'];

require('it-each')({ testPerIteration: true });
var path = require('path');
var arr = new Array();

for(var i = 0; i < roads.length; i++) {
	arr[i] = {
		"index" : i + 1,
		"name"  : roads[i].uniqueName
	};
}

var fieldMap = new Map();

function ReturnVal(data, field, callback) {
	var arr = field.split('.');
	
	for(var k = 0; k < arr.length; k++) {
		if(typeof data[arr[k]] == 'string') {
			callback(data[arr[k]]);
		}
		else if(arr[k].includes('['))
		{
			data = data[arr[k].split("[")[0]][0];
		}
		else
		{
			data = data[arr[k]];
		}
	}
}

function Test(road, callback) {
    //Reading various fields from the given road
    var dict = {};
    var value_list = new Array();

    var module_name = road.sampleClassNames.node;	
    var arr = module_name.split('.');

    var func = arr[arr.length - 1].charAt(0).toLowerCase() + arr[arr.length - 1].slice(1);

    module_name = module_name.replace(/\./g, "/");
	
    var mod_name = path.resolve(process.cwd()+'\\'+module_name);
    var instance = require(mod_name);
    
	var dependentName = road.prerequisiteRoad;
    var dependentFields = road.dependentFieldMapping;
    var storedFields = road.storedResponseFields;
	
	if(module_name.includes("Token_Management"))
	{
		value_list.push("93B32398-AD51-4CC2-A682-EA3E93614EB1");
	}
	else if(module_name.includes("GetReportDefinition"))
	{
		value_list.push("TransactionRequestClass");
	}
    
	//Fetching various dependency fields and pushing it to the argument list
    for(j = 0; j < dependentFields.length; j++) {
		try {
			value_list.push(fieldMap.get(dependentName+dependentFields[j]));
		}
		catch(e) {
			value_list.push(null);
		}
    }
	
    var assertions = road.Assertions;
    
	if(JSON.stringify(assertions) == '{}') {
		var httpStatus = '';
		var expectedValues = [];
		var requiredFields = [];
    }
    else {
		var httpStatus = road.Assertions.httpStatus;
		var expectedValues = road.Assertions.expectedValues;
		var requiredFields = road.Assertions.requiredFields;
    }

    var field, value;
	
	if(dependentName)
	{
		if(module_name.includes("Retrieve") || module_name.includes("Delete"))
		{
			// implement sleep
		}
	}

    instance[func](function(error,data,response) {
        //Callback function for the sample code
        if(error) {
			//If it is an error response, all stored response fields set to null
			for(j = 0; j < storedFields.length; j++) {
			fieldMap.set(road.Name + storedFields[j], null);
			}
        }
        else {
			//Assigning values for stored response fields in the global map
			for(j = 0; j < storedFields.length; j++) {
				ReturnVal(data,storedFields[j], function(returnval) {
					fieldMap.set(road.uniqueName + storedFields[j], returnval);
				});
			}
		 
			 //Passing all expected values assertions and corresponding values into a dictionary
			for(j = 0; j < expectedValues.length; j++) {        
				field = expectedValues[j].field;
				value = expectedValues[j].value;
				
				ReturnVal(data, field, function(returnval) {
					var sub_dict = {};
					sub_dict["calculated"] = returnval;
					sub_dict["expected"] = value;
					dict[field] = sub_dict;
				});
			}
		 
			var sub_dict = {};
			 
			//Passing HTTP Status assertions and actual value into a dictionary
			sub_dict["calculated"] = JSON.stringify(response['status']);
			sub_dict["expected"] = httpStatus;
			dict["httpStatus"] = sub_dict;
			 
			//Passing required field values and their expected value(Not Null) to the dictionary
			for(j = 0; j < requiredFields.length; j++) {
				ReturnVal(data, requiredFields[j], function(returnval) {
					var sub_dict = {};
					sub_dict["calculated"] = (returnval == null);
					sub_dict["expected"] = false;
					dict[requiredFields[j]] = sub_dict;
				});
			}
		}

		callback(dict,error);
    },...value_list);
}

describe('Roads', function() {
	//Traversing for each road
    it.each(arr, "Test Case %d: %s", ['index','name'], function(element,next) {     	    
   	    Test(roads[element['index'] - 1], function(dict,error) {
			//Callback function validating against all the assertions
   	    	if(error) {
				assert.strictEqual("Failing", "Running", "Sample Code: " + element['name'] + " is broken");
				next();
			};
   	    	
			for(var key in dict) {
				if(key == "httpStatus" && dict[key]['expected'] == '') {
					continue;
				}
				
				assert.equal(dict[key]['calculated'], dict[key]['expected'], element['name'] + ": " + key);
			}
			
   	    	next();
   	    });
    });
 });