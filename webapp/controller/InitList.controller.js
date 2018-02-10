sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"team12/Team12_Fish/util/location"
], function(Controller, Location) {
	"use strict";

	return Controller.extend("team12.Team12_Fish.controller.InitList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf team12.Team12_Fish.view.InitList
		 */
			onInit: function() {
				this.oLocUtil = new Location();
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("InitList").attachPatternMatched(this._onObjectMatched, this);
			},
			
			_onObjectMatched: function (oEvent) {
				// this.getView().bindElement({
				// 	path: "/" + oEvent.getParameter("arguments").invoicePath,
				// 	model: "invoice"
				// });
				this.oLocUtil.getLocation();          
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf team12.Team12_Fish.view.InitList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf team12.Team12_Fish.view.InitList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf team12.Team12_Fish.view.InitList
		 */
		//	onExit: function() {
		//
		//	}
		
		_getLocation: function(){
			var latLng = new google.maps.LatLng(lat,log);
   //         geocoder.geocode({latLng: latLng}, function(responses){     
   //         	if (responses && responses.length > 0){                                	
   //             	var formatedAddress=responses[0].formatted_address;
   //                 sap.m.MessageToast.show("You have selected : " + formatedAddress);
   //         	} else {       
   //             	sap.m.MessageToast.show('Not getting Any address for given latitude and longitude.');     
   //         	}   
   //         }
		}

	});

});