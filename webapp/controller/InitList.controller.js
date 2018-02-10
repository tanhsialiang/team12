sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"team12/Team12_Fish/util/location"
], function(Controller, JSONModel,Location) {
	"use strict";

	return Controller.extend("team12.Team12_Fish.controller.InitList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf team12.Team12_Fish.view.InitList
		 */
			onInit: function() {
				this.oLocUtil = new Location();
				// this.getView().setModel(new JSONModel(), "local");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("InitList").attachPatternMatched(this._onObjectMatched, this);
			},
			
			_onObjectMatched: function (oEvent) {
				// this.getView().bindElement({
				// 	path: "/" + oEvent.getParameter("arguments").invoicePath,
				// 	model: "invoice"
				// });
				this.oLocUtil.getLocation(jQuery.proxy(this._setSearchDefaultValue, this));          
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
		
		onSearch: function(oEvent){
			sap.m.MessageToast.show("Search Triggered");
			var that = this;
			var oEntry = {};
			oEntry.query = [];
			if(oEvent.getParameter("query")!== ""){
				oEntry.query.push({"field": "location", "query": oEvent.getParameter("query")});
			}
			
			$.ajax({
			  type: "POST",
			  url: '/api/search',
			  dataType: "json", 
              data: JSON.stringify(oEntry),
              contentType: "application/json" ,
			  success: function(oResult) {  
				  debugger;
                    
              },
                error: function() {  
                	new sap.m.MessageToast.show("Error while searching");
                }  
			});
		},
		
		_setSearchDefaultValue: function(sLocation){
			this.getView().byId("idSearchField").setValue(sLocation).fireSearch();
		}


	});

});