'use strict';

//Setting up route
angular.module('advocates').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Jump to first child state
    // $urlRouterProvider.when('/advocate/signup', '/advocate/signup/create');

		// Advocate state routing
		$stateProvider
			.state('advocateSignup', {
				url: '/advocate/signup',
				templateUrl: 'modules/advocates/views/signup.client.view.html',
				controller: 'AdvocateSignupController',
				abstract: true,
				data: {
					disableBack: true
				}
			})
			.state('advocateSignup.info', {
				url: '',
				templateUrl: 'modules/advocates/partials/signup-info.client.view.html',
				globalStyles: 'white-bg'
			})
			.state('advocateSignup.details', {
				url: '/create',
				templateUrl: 'modules/advocates/partials/signup-details.client.view.html'
			})
			.state('advocateSignup.referral', {
				url: '/referral',
				templateUrl: 'modules/advocates/partials/signup-referral.client.view.html'
			})
			.state('advocateHome', {
				url: '/advocate',
				templateUrl: 'modules/advocates/views/home.client.view.html',
				controller: 'AdvocateController',
				data: {
					disableBack: true
				}
			});
	}
]);