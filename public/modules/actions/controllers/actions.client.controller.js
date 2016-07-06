'use strict';

// Issues controller
angular.module('actions').controller('ActionsController', ['$scope', '$filter', 'Authentication', 'Actions', 'Activity', '$translate', '$sce',
  function($scope, $filter, Authentication, Actions, Activity, $translate, $sce) {
    //$scope.authentication = Authentication;
    $scope.user = Authentication.user;

    // 
    // $scope.userCompletedDetailsProgress = function() {
    //
    //   var prog = 0,
    //       $scope.user.problems
    //   $scope.user.problems
    //
    //   return prog;
    // };

    var translatedText = $translate('modules.actions.views.listActions.empty').then(function(text){
    	console.log(text);
    	$scope.trustedTranslation = $sce.trustAsHtml(text);
    });
    console.log(translatedText);

    $scope.userCompletedDetails = function() {
      if($scope.user.actionFlags) {
        return $scope.user.actionFlags.indexOf('allInitial') !== -1;
      }
      else return false;
    };

    $scope.list = function() {
      Actions.query(function(actions) {
        $scope.onceActions = $filter('filter')(actions, { $: 'once' }, true);
        $scope.recurringActions = $filter('filter')(actions, { $: 'recurring' }, true);
        $scope.legalActions = $filter('filter')(actions, { $: 'legal' }, true);
      });

    };

  }
]);
