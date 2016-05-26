/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/Login.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
            data: {
                requireLogin: true // this property will apply to all children of 'app'
              }
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/Charts.html",
            data: { pageTitle: 'Example view' },
            resolve: {
                loadPlugin: function ($ocLazyLoad, $rootScope) {

                    return $ocLazyLoad.load([
                        {
                            files: $rootScope.source
                        }
                    ]);
                }
            }
        })
        .state('index.users', {
            url: "/users",
            templateUrl: "views/Users.html",
            data: { pageTitle: 'Users' },
            resolve: {
                loadPlugin: function ($ocLazyLoad, $rootScope) {

                    return $ocLazyLoad.load([
                        {
                            files: $rootScope.source
                        },
												{
                            files: ['script/tables/dataTables/jquery.dataTables.min.js', 'script/tables/dataTables/jquery.dataTables.bootstrap.js']
                        }
                    ]);
                }
            }
        })

        .state('index.reports', {
                url: "/reports",
                templateUrl: "views/Reports.html",
                data: { pageTitle: 'Reports' },
                resolve: {
                    loadPlugin: function ($ocLazyLoad, $rootScope) {

                        return $ocLazyLoad.load([
                            {
                                files: $rootScope.source
                            },
                            {
                                files: ['script/jquery.flot.time.js', 'script/jquery.flot.axislabels.js','https://code.highcharts.com/highcharts.js']
                            }
                        ]);
                    }
                }
            })

        .state('index.settings', {
                url: "/settings",
                templateUrl: "views/Settings.html",
                data: { pageTitle: 'Settings' },
                resolve: {
                    loadPlugin: function ($ocLazyLoad, $rootScope) {

                        return $ocLazyLoad.load([
                            {
                                files: $rootScope.source
                            }
                        ]);
                    }
                }
            })
        .state('index.data', {
                url: "/data",
                templateUrl: "views/Data.html",
                data: { pageTitle: 'Data' },
                resolve: {
                    loadPlugin: function ($ocLazyLoad, $rootScope) {

                        return $ocLazyLoad.load([
                            {
                                files: $rootScope.source
                            }
                        ]);
                    }
                }
            })
        .state('index.profile', {
                url: "/profile",
                templateUrl: "views/Profile.html",
                data: { pageTitle: 'Profile' },
                resolve: {
                    loadPlugin: function ($ocLazyLoad, $rootScope) {

                        return $ocLazyLoad.load([
                            {
                                files: $rootScope.source
                            },
                            {
                                files: ['script/jquery.flot.time.js', 'script/jquery.flot.axislabels.js', 'script/highchart.js']
                            }
                        ]);
                    }
                }
            })

}
angular
    .module('dashboard')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.source = ['script/jquery-1.10.2.min.js', 'script/jquery-migrate-1.2.1.min.js', 'script/jquery-ui.js', 'script/bootstrap.min.js', 'script/bootstrap-hover-dropdown.js', 'script/html5shiv.js', 'script/respond.min.js', 'script/jquery.metisMenu.js', 'script/jquery.slimscroll.js', 'script/jquery.cookie.js', 'script/icheck.min.js', 'script/jquery.news-ticker.js', 'script/jquery.menu.js', 'script/pace.min.js', 'script/holder.js', 'script/responsive-tabs.js', 'script/jquery.flot.js', 'script/jquery.flot.categories.js', 'script/jquery.flot.pie.js', 'script/jquery.flot.tooltip.js', 'script/jquery.flot.resize.js', 'script/jquery.flot.fillbetween.js', 'script/jquery.flot.stack.js', 'script/jquery.flot.spline.js', 'script/zabuto_calendar.min.js']
    });