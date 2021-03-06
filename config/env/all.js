'use strict';

module.exports = {
	app: {
	  title: 'JustFix.nyc - Technology for Housing Justice',
	  description: 'JustFix.nyc is a tool for New Yorkers to document, organize, and take action in getting repairs made on their apartment.',
	  keywords: 'something'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
	  lib: {
		  css: [
		    'lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
				'public/lib/ui-select/dist/select.min.css',
				'public/lib/cartodb.js/themes/css/cartodb.css',
				'https://api.tiles.mapbox.com/mapbox-gl-js/v0.14.3/mapbox-gl.css',
		    'public/styles/vendor.css'
		  ],
		  js: [
		    'public/lib/angular/angular.js',
		    'public/lib/angular-resource/angular-resource.js',
		    'public/lib/angular-cookies/angular-cookies.js',
		   	'public/lib/angular-animate/angular-animate.js',
		    'public/lib/angular-ui-router/release/angular-ui-router.js',
		    'public/lib/angular-touch/angular-touch.min.js',
		    'public/lib/angular-ui-utils/ui-utils.js',
		    'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
		    'public/lib/ui-select/dist/select.min.js',
		    'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
		    'public/lib/angular-lazy-img/release/angular-lazy-img.min.js',
		    'public/lib/angular-scroll/angular-scroll.min.js',
		    'public/lib/re-tree/re-tree.min.js',
		    'public/lib/ng-device-detector/ng-device-detector.min.js',
		    'public/lib/ng-file-upload-shim/ng-file-upload-shim.min.js',
		    'public/lib/ng-file-upload/ng-file-upload.min.js',
		    'public/lib/fastclick/lib/fastclick.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-handler-log/angular-translate-handler-log.js',
				'public/lib/angular-dynamic-locale/src/tmhDynamicLocale.js',
				'public/lib/cartodb.js/cartodb.js',
				'public/external/mapbox-gl.js',
				'public/external/leaflet-mapbox-gl.js',
				'public/lib/deep-diff/releases/deep-diff-0.3.3.min.js',
		    'public/lib/angular-sanitize/angular-sanitize.min.js',
		    'public/lib/angular-filter/dist/angular-filter.js',
				'public/lib/angular-clipboard/angular-clipboard.js'
		  ]
	  },
	  css: [
	    'public/styles/style.css'
	  ],
	  js: [
		  'public/config.js',
		  'public/application.js',
		  'public/modules/*/*.js',
		  'public/modules/*/*[!tests]*/*.js'
	  ],
	  tests: [
	    'public/lib/angular-mocks/angular-mocks.js',
	    'public/modules/*/tests/*.js'
	  ]
	},
	geoclient: {
	  id: process.env.GEOCLIENT_APP_ID,
	  key: process.env.GEOCLIENT_APP_KEY,
	  url: process.env.GEOCLIENT_URL
	},
	aws: {
		id: process.env.AWS_ACCESS_KEY_ID,
		key: process.env.AWS_SECRET_ACCESS_KEY
	},
	rollbar: {
		servertoken: process.env.ROLLBAR_ACCESS_TOKEN,
		clienttoken: process.env.ROLLBAR_ACCESS_TOKEN_CLIENT,
		endpoint: process.env.ROLLBAR_ENDPOINT
	}
};
