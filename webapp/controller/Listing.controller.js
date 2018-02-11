sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"team12/Team12_Fish/util/data"
], function(Controller, JSONModel,History, data) {
	"use strict";

	return Controller.extend("team12.Team12_Fish.controller.Listing", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf team12.Team12_Fish.view.Listing
		 */
			onInit: function() {
				// this.getView().setModel(new JSONModel(), "local");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("Listing").attachPatternMatched(this._onObjectMatched, this);
			},
			
			_onObjectMatched: function (oEvent) {
				// this.getView().bindElement({
				// 	path: "/" + oEvent.getParameter("arguments").invoicePath,
				// 	model: "invoice"
				// });
				
				// this.oLocUtil.getLocation(jQuery.proxy(this._setSearchDefaultValue, this)); 
				var oSearch = oEvent.getParameter("arguments");
				var oEntry = {};
				oEntry.query = [];
				oEntry.query.push({"field": "location", "value": oSearch.location});
				oEntry.query.push({"field": "species", "value": oSearch.fish});
				var that = this;
				this.getView().setBusy(true);
				data.getInstance().getData(that.getView().getModel("local"), false, oEntry).then(
					function(){
			  			that.getView().setBusy(false);
				}).catch(function(oError){
					that.getView().setBusy(false);
					new sap.m.MessageToast.show("Error while searching");
				});          
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
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf team12.Team12_Fish.view.Listing
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf team12.Team12_Fish.view.Listing
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf team12.Team12_Fish.view.Listing
		 */
		//	onExit: function() {
		//
		//	}

	});

});