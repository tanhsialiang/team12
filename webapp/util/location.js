sap.ui.define([
  "sap/ui/base/Object",
  "sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
  "use strict";
  return Object.extend("team12.Team12_Fish.util.location", {
	constructor: function() {
    },
    getLocation: function() {
    	var that = this;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };
	
	            // infoWindow.setPosition(pos);
	            // infoWindow.setContent('Location found.');
	            // infoWindow.open(map);
	            // map.setCenter(pos);
	          console.log(pos.lat, pos.lng);
	        }, function() {
	          that.handleLocationError(true);
	        });
	    } else {
	          // Browser doesn't support Geolocation
	          that.handleLocationError(false);
	    }
    },
    
    handleLocationError: function(browserHasGeolocation) {
        var vMsg = browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.';
        sap.m.MessageBox.error(vMsg);
    },
    
    _loadScript: function(sUrl) {
		return new Promise(function(resolve, reject) {
			try {
				//Load only once
				if (google) {
					resolve();
				}
			} catch (e) {
				/**
				 * If Google library was not loaded we have something like 'ReferenceError'
				 * */
				if (e instanceof ReferenceError) {
					$.getScript(sUrl)
						.done(function(script, textStatus) {
							resolve();
						})
						.fail(function(jqxhr, settings, exception) {
							reject('Error while loading Google Maps');
						});
				}
			}
		})
	}
  });
});