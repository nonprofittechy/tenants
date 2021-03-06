'use strict';

angular.module('advocates')
  .directive('addDetails', ['$rootScope', '$filter', '$sce', '$timeout', 'Activity', 'Advocates', 'Problems',
    function ($rootScope, $filter, $sce, $timeout, Activity, Advocates, Problems) {
    return {
      restrict: 'E',
      templateUrl: 'modules/advocates/partials/add-details.client.view.html',
      scope: {
        tenant: '='
      },
      link: function (scope, element, attrs) {

        // $modal has issues with ngTouch... see: https://github.com/angular-ui/bootstrap/issues/2280
        // scope.action is a $resource!
        scope.problems = [];

        scope.$watch('tenant', function (tenant) {
          // console.log('add details');
          if(tenant) {
            scope.tenant = tenant;
            for(var i = 0; i < scope.tenant.problems.length; i++) {
              scope.problems.push(scope.tenant.problems[i].title);
            }
            // Advocates.currentTenant = scope.tenant;
          }
        });

        scope.status = {
          expanded: false,
          tagging: false,
          closeAlert: false,
          closeErrorAlert: true,
          formSubmitted: false,
          completed: false
        };
        //if(!scope.completed) scope.completed = false;

        scope.newActivity = {
          date: '',
          title: 'modules.activity.other.statusUpdate',
          key: 'statusUpdate',
          relatedProblems: [],
          photos: []
        };

        scope.expand = function(event) {
          event.preventDefault();
          scope.status.expanded = true;
          // setTimeout(function() { element[0].querySelector('textarea').focus(); }, 0);
          // setTimeout(function() { element[0].querySelector('textarea').focus(); }, 0);

        };

        scope.toggleTagging = function() {
          scope.status.tagging = !scope.status.tagging;
        };

        scope.selectProblem = function(problem) {

          if(!this.isSelectedProblem(problem)) {
            scope.newActivity.relatedProblems.push(problem);
          } else {
            var i = scope.newActivity.relatedProblems.indexOf(problem);
            scope.newActivity.relatedProblems.splice(i, 1);
            // $scope.checklist[area].numChecked--;
          }
        };
        scope.isSelectedProblem = function(problem) {
          // if(!$scope.newIssue.issues[area]) return false;
          return scope.newActivity.relatedProblems.indexOf(problem) !== -1;
        };

        scope.addPhoto = function(file) {

          if(file) {
            scope.newActivity.photos.push(file);
            // console.log(file);
            // console.log(file.lastModifiedDate);
            if(file.lastModifiedDate) scope.newActivity.date = file.lastModifiedDate;
          }

        };

        scope.closeAlert = function() {
          scope.status.closeAlert = true;
        };

        scope.createActivity = function(isValid) {

          scope.status.formSubmitted = true;

          if(isValid) {
            $rootScope.loading = true;

            console.time("statusUpdate");

            // console.log('create activity pre creation', scope.newActivity);

            // [TODO] have an actual section for the 'area' field in the activity log
            // if(scope.newActivity.description && scope.newActivity.area) scope.newActivity.description = scope.newActivity.area + ' - ' + scope.newActivity.description;
            // else if(scope.newActivity.area) scope.newActivity.description = scope.newActivity.area;

            var activity = new Activity(scope.newActivity);

            // console.log('create activity post creation', scope.newActivity);

            activity.$saveManagedByID({ id: scope.tenant._id }, function(response) {

              // console.log('create activity post save', response);
              console.timeEnd("statusUpdate");

              $rootScope.loading = false;
              scope.status.completed = true;
              scope.status.formSubmitted = false;
              scope.status.expanded = false;

              scope.newActivity = {
                date: '',
                title: 'modules.activity.other.statusUpdate',
                key: 'statusUpdate',
                relatedProblems: [],
                photos: []
              };

              // need to use angular.extend rather than scope.tenant = response
              // this will actually update all the attributes
              // (and trigger an update in parent controllers)
              angular.extend(scope.tenant, response);

            }, function(errorResponse) {
              $rootScope.loading = false;
              scope.error = errorResponse.data.message;
              scope.status.closeErrorAlert = false;
            });
          }

        }; // end of create activity


      }
    };
  }]);
