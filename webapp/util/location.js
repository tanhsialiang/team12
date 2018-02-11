sap.ui.define([
  "sap/ui/base/Object",
  "sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
  "use strict";
  return Object.extend("team12.Team12_Fish.util.location", {
	constructor: function() {
		var sBaseUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdfCuwONEVZ97agcRgvCyydOh3VQ4OsfU';
    	this._loadScript(sBaseUrl)
    },
    getLocation: function(fnSuccess, bState) {
    	var that = this;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };
	            
	            var latLng = new google.maps.LatLng(pos.lat,pos.lng);
                new google.maps.Geocoder().geocode({latLng: latLng},function(responses){     
                   if (responses && responses.length > 0){
                   		if(bState){
	                   		for(var i = 0; i < responses[0].address_components.length; i++){
	                   			if(responses[0].address_components[i].types[0] === "administrative_area_level_1"){
	                   				fnSuccess(responses[0].address_components[i].long_name);
	                   			}
	                   		} 
                   		} else {
                   			fnSuccess(responses[0].formatted_address);
                   		}
                   } else {       
                     sap.m.MessageToast.show('Not getting Any address for given latitude and longitude.');     
                   }   
                });
	
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