'use strict';

angular.module('actions').factory('Pdf', ['$http', '$q', 'Authentication', '$filter',
  function Pdf($http, $q, Authentication, $filter) {

  	// SPLIT THIS OUT OMG
  	var postRequest = function (dataObj) {

  		var deferred = $q.defer();
    	var user = Authentication.user;
    	console.log(user);

  		// This block assembles our issues list PhantomJS
  		var assembledObject = {
  			issuesAssembled: []
  		};
  		var issuesCount = 0;

  		if(user.geo) {
  			user.zip = user.geo.zip;
  		} else {
  			user.zip = '';
  		}

  		// Kick off assembly of obj sent to PDF service
			assembledObject.tenantInfo = {
  			'phone': user.phone,
  			'name': user.fullName,
  			'address': user.address + 
  								' <br> ' + user.borough +
  								' <br> New York  ' + user.zip // This needs to be replaced, talk to dan ASAP
	  	};
	  	assembledObject.landlordInfo = {
  			'name': 'Sir/Madam',
  			'address': '600 Main St <br> Brooklyn, NY  11235'
	  	}

      for(var issue in user.issues) {
        var key = issue,
            title = $filter('areaTitle')(key),
            vals = user.issues[issue];

        if(vals.length) {
        	var tempObject = {};

        	// Here we go...
          var activityIdx = user.activity.map(function(i) { return i.key; }).indexOf(key);
          if(activityIdx !== -1) var activity = user.activity[activityIdx];

          tempObject.title = title;
          tempObject.vals = [];

          vals.forEach(function(v) {
            tempObject.vals.push({title: v.title, emergency: v.emergency});
          });

          if(activity) {
            tempObject.startDate = $filter('date')(activity.date, 'longDate'); 

            if(activity.description) {
            	tempObject.description = activity.description;
            }

            activity = undefined;
          }

          assembledObject.issuesAssembled.push(tempObject);

          issuesCount++;
        }
      }

	  	$http({
	  		method: 'POST',
	  		// Placeholder URL, needs to be attached to a real URL w/ JustFix (Also, using goddamnedtestbucket, let's get that out of there...)
	  		url:'http://pdf-microservice.herokuapp.com/complaint-letter',
	  		data: assembledObject
	  	}).then(
	  		function successfulPdfPost(response){
	  			Authentication.user.complaintUrl = response.data;
	  			deferred.resolve(response.data);
	  		},
	  		function failedPdfPost(error) {
	  			deferred.reject(error);
	  		}
	  	);

	  	return deferred.promise;
  	};

  	var getRequest = function () {
  		var user = Authentication.user;

  		if(user.complaintUrl !== '') {
  			return user.complaintUrl;
  		} else {
  			postRequest();
  		}
  	};

  	return {
  		postComplaint: postRequest,
  		getComplaint: getRequest
  	};
  }]);