sap.ui.define([
  "sap/ui/base/Object",
  "sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
  "use strict";
  var instance;
  var services = Object.extend("team12.Team12_Fish.util.data", {
	constructor: function() {
    },
    getData: function(oLocalModel, bForceRefresh, oEntry) {
    	return new Promise(function (resolve, reject) {
    		// if(oLocalModel.getJSON() === "{}" || bForceRefresh){
		    	$.ajax({
				  type: "POST",
				  url: '/api/search',
				  dataType: "json", 
		          data: JSON.stringify(oEntry),
		          contentType: "application/json" ,
				  success: function(oResult) {
				  	  var analytics = oResult.agg;
				  	  var aggArray = [];
				  	  for (var prop in analytics) { // enumerate its property names
				         // prop is "Title", "Description" etc
				         var value = analytics[prop]; // is the respective value
				         value.name = prop;
				         aggArray.push(value);
				     }
				     oResult.agg = aggArray;
					  //var oJsonModel = that.getView().getModel("local");
					  oLocalModel.setData(oResult);
					  resolve();
					  //fnSuccess();
						// that.getView().setBusy(false);
		                
		          },
		            error: function() { 
		            	reject();
		            }  
				});
	    	// } else {
	    	// 	resolve();
	    	// }

		});
    },
    postData: function(oEntry) {
    	return new Promise(function (resolve, reject) {
    		// if(oLocalModel.getJSON() === "{}" || bForceRefresh){
		    	$.ajax({
				  type: "POST",
				  url: '/api/upload',
				  dataType: "json", 
		          data: JSON.stringify(oEntry),
		          contentType: "application/json" ,
				  success: function(oResult) {
					  resolve();
		          },
		            error: function() { 
		            	reject();
		            }  
				});
	    	// } else {
	    	// 	resolve();
	    	// }

		});
    }
  });
  return {
        getInstance: function () {
            if (!instance) {
                instance = new services();
            }
            return instance;
        }
    };
});