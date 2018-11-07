'use strict'

 var fs = require('fs');
 var request = require('superagent');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportDownloadsApi,
 * download  report 
 */
function downloadReport(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportDownloadsApi(configObject);

        var reportDate = "2018-09-02";
        var reportName = "testrest_v2";

        var opts = [];

        opts['organizationId'] = "testrest";

        console.log("****************Download Report****************")

        
        // var stream = fs.createWriteStream('C:\\Users\\ghari\\swaggerFinal1-11-18\\cybersource-rest-samples-node\\Resource\\download.xml');
        // request.get('https://apitest.cybersource.com/reporting/v3/report-downloads?organizationId=testrest&reportDate=2018-09-02&reportName=testrest_v2')
        // .set('Accept', 'application/xml')
        // .set('content-type','application/json;charset=utf-8')
        // .set('authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsInYtYy1tZXJjaGFudC1pZCI6InRlc3RyZXN0IiwieDVjIjpbIk1JSUNYekNDQWNpZ0F3SUJBZ0lXTlRFeE1qSXlPRGsyTmpJek1ERTNOekF6TVRVM09UQU5CZ2txaGtpRzl3MEJBUXNGQURBZU1Sd3dHZ1lEVlFRRERCTkRlV0psY2xOdmRYSmpaVU5sY25SQmRYUm9NQjRYRFRFM01URXlNVEF3TURneE5sb1hEVEU1TVRFeU1UQXdNRGd4Tmxvd05ERVJNQThHQTFVRUF3d0lkR1Z6ZEhKbGMzUXhIekFkQmdOVkJBVVRGalV4TVRJeU1qZzVOall5TXpBeE56Y3dNekUxTnprd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUUMrQnRkTWNva2FLd1RlczlPK3NucWpXc2VoTzAvWTRDSnJ3bzRjZEdDYWZSTzZvd3MzbUMxeG1wU1l0dFRLSWRlR1IxcU9ZcFRTZVk5dUpoMmNDZmF5TUtYbWhRZjRkNXY4cE5Ebm1ZQk1HQndVMXdXamxZc01MRmJjUEZXamRQdEtsb3UyUklXWjU2NllXSWJXQ0JmK0c0ZEhrQTBEN0NzcDNGVDNsblVOMm1lNGxKa2x5c2ZxcDFYOHEzSkRxVklRRlZBZHVhbWhXQ1lNUlM1S2c4c0t3TWpsZEdRVWJ5ODhTK01Pd2NDQTNIT0hUNjRiYXJ2UElkMkV4cUFxdmZ5QkNQQVI0OVY2L3l3RFZzSDlTeUhld2cxMjFja01jQTlnNTV0SXFkc3lIR1JaTjlmczIwa015cUVQNzhMNGN4ZmlzdVZRQzhrbmxmWnRkY3FWQVk3RkFnTUJBQUV3RFFZSktvWklodmNOQVFFTEJRQURnWUVBSlhiS05SVWJOdDJCZFlFVE1PcjlNczkzTGtadGNhaTVJbDhuZFA0MnE1WEh0Ni9QY2JtYWpCSlNiUXpESTJSL2JjcVlwYzRZdFhGU0lJMThvMlVQUk90cmUyQmFMWHRZU1FDUHBtZkRTQTNvMEtVdzZkSmtvQmQvd3d1U1g5Y1c5QWFaVG1lWko2V1RNcEFjNVhSMExaS2ZHbUs3bHkrdWRnNUpibWFKUkZBPSJdfQ.eyJpYXQiOiJXZWQsIDA3IE5vdiAyMDE4IDA1OjQ3OjMzIEdNVCJ9.c7nvU692sc65L0ZzlTxmcdM_4b0wjJNU25nVvaERrPvYdx39pWD18GDoUH5ZKOmrCr4ypgTeHyMSZtwTpBBSRvvJ6SuuQ2rheju8kxO8PgLMf4QFiMXHld39LQbchOJG6aKv3Zc7EzbV8B6jk3ES3iycLveTHDVTt-P2E8f0kgzKlxlwxeQbB3Wm1W7k8a6GnTKqq4s9ot_USbIgec7C5w7iBrqPyaWR2P-fYDWN1TSKpMT9PnUdMiyPvKQ5HeRYqTNiRjaOCJvjNDrdR8tUKjDYG_I7E9kkow4oeHNFrZBIYRZmN0r7I0mcN2A_7XTDEDQpLjAtEWXMIphy4uiK7w')
        // .set('user-agent','node-superagent/3.8.3')
        // .pipe(stream);

        instance.downloadReport(reportDate, reportName, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in Download report : " + error);
            }
            else if (data) {
                console.log("\nData of Download report : " + data);
            }
            console.log("\nResponse of Download report : " + JSON.stringify(response));
            console.log("\nResponse Code of Download report : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    downloadReport(function () {
        console.log('Download report end.');
    });
}
module.exports.downloadReport = downloadReport;