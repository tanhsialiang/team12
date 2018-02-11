sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"team12/Team12_Fish/util/location",
	"team12/Team12_Fish/util/data"
], function(Controller, History, JSONModel, Location, Data) {
	"use strict";

	return Controller.extend("team12.Team12_Fish.controller.InputData", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf team12.Team12_Fish.view.InputData
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("InputData").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function (oEvent) {
			this.oLocUtil = new Location();
			this.getView().setBusy(true);
			var oSpeciesModel = new JSONModel({
			  "results": [
			    {
			      "commonName": "Mackerel tuna",
			      "scientificName": "Euthynnus affinis"
			    },{
			      "commonName": "Black pomfret",
			      "scientificName": "Parastromateus niger"
			    },{
			      "commonName": "White Pomfret",
			      "scientificName": "Pampus argenteus"
			    },{
			      "commonName": "Torpedo scad",
			      "scientificName": "Megalaspis cordyla"
			    }
			  ]
			});
			// oSpeciesModel.loadData("model/species.json");
			this.getView().setModel(oSpeciesModel,"species");
			this.oLocUtil.getLocation(jQuery.proxy(this._setFormDefaultValue, this), false);
			
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("InitList", true);
			}
		},
		
		_setFormDefaultValue: function(sLocation){
			this.getView().setModel(new JSONModel({"seller": "Seller 1", "sellerID": "888", "location": sLocation}), "form");
			this.getView().setBusy(false);
		},
		
		onSubmit: function(){
			var that = this
			this.getView().setBusy(true);
			var oData = this.getView().getModel("form").getData();
			oData.unit = "KG";
			oData.price = parseFloat(oData.price);
			oData.date = new Date().toISOString().split('T')[0];
			oData.month = new Date().getMonth() + 1;
			oData.year = new Date().getYear();
			oData.day = new Date().getDate();
			oData.buyerType = '';
			switch(oData.commonName){
				case "Mackerel tuna":
					oData.scientificName = "Euthynnus affinis";
					break;
				case "Black pomfret":
					oData.scientificName = "Parastromateus niger";
					break;
				case "White Pomfret":
					oData.scientificName = "Pampus argenteuss";
					break;
				case "Torpedo scad":
					oData.scientificName = "Megalaspis cordyla";
					break;
				default:
					oData.scientificName = oData.commonName;
					break;
			}
			console.log(oData);
			
			Data.getInstance().postData(oData).then(
				function(){
		  			that.getView().setBusy(false);
			}).catch(function(oError){
				that.getView().setBusy(false);
				new sap.m.MessageToast.show("Error while posting");
			});  
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf team12.Team12_Fish.view.InputData
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf team12.Team12_Fish.view.InputData
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf team12.Team12_Fish.view.InputData
		 */
		//	onExit: function() {
		//
		//	}

	});

});