/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope) {
    //BEGIN LINE CHART
    $scope.d1_1 = [["Jan", 200],["Feb", 201],["Mar", 199],["Apr", 187],["May", 193],["Jun", 192],["Jul", 206],["Aug", 186],["Sep", 206]];
    $scope.d1_2 = [["Jan", 122],["Feb", 170],["Mar", 163],["Apr", 161],["May", 122],["Jun", 136],["Jul", 130],["Aug", 128],["Sep", 148]];
    $scope.d1_3 = [["Jan", 81],["Feb", 92],["Mar", 98],["Apr", 102],["May", 80],["Jun", 97],["Jul", 86],["Aug", 105],["Sep", 85]];
		
		angular.element(document).ready(function () {
				$('#side-menu li').click(function(){
					$('#side-menu li').each(function( index ) {
								$( this ).attr('class', '');
							});
							$( this ).attr('class', 'active');
				})
    });
};

function TableCtrl($scope, $http, $rootScope) {
    $http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/users/')
		.success(function(response) {
			$scope.userdata = response
		});

    angular.element(document).ready(function () {

        setTimeout(function(){
						$('#side-menu li').click(function(){
							$('#side-menu li').each(function( index ) {
								$( this ).attr('class', '');
							});
							$( this ).attr('class', 'active');
						})
            $('#user_table').dataTable({
                "bServerSide": false,
                "bProcessing": true
            });

						
        }, 3000);

    });
};


function drawBarChart(data, id)
{
    // get aggregated data by education
    temp = []
    for (var key in data) {
      temp.push([key, data[key]])
    }

    category = []
    for (var key in data) {
      category.push([key])
    }

    $("#"+id).highcharts({
        chart:{
            type: 'column'
        },
        title: {
            text: ''
        },

        xAxis: {
            categories: category
        },
         yAxis: {

            title: {
                text: 'Number of users'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            shared: true
        },
        legend: {
        },

        series: [{
            name: id,
            data: temp,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        }],
    });
}

function gd(time_str) {
    temp = time_str.split(' ')[0]
    temp = temp.split('-')

    return new Date(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2])).getTime();
}

function ReportCtrl($scope, $http, $rootScope) {
    $http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/reports/')
		.success(function(response) {
			$scope.leadscore = response.lead_score
					setTimeout(function(){
            $('#pie-chart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Lead Scores'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },

                series: [{
                    type: 'pie',
                    name: 'Percentage',
                    data: [
                        ['1-10',   $scope.leadscore['1-10']],
                        ['11-20',   $scope.leadscore['11-20']],
                        ['21-30',   $scope.leadscore['21-30']],
                        ['31-40',   $scope.leadscore['31-40']],
                        ['41-50',   $scope.leadscore['41-50']],
                        ['51-60',   $scope.leadscore['51-60']],
                        ['61-70',   $scope.leadscore['61-70']],
                        ['71-80',   $scope.leadscore['71-80']],
                        ['81-90',   $scope.leadscore['81-90']],
                        ['91-100',   $scope.leadscore['91-100']]
                    ]
                }]
            });

            drawBarChart(response.geo_city, 'geo-city');
            drawBarChart(response.salary, 'salary');
            drawBarChart(response.interests, 'interests');
            drawBarChart(response.home_owner_status, 'home_owner_status');
            drawBarChart(response.education, 'education');
            drawBarChart(response.occupation, 'occupation');


            pp = []
            for (var key in response.time_subscribed) {
              pp.push([gd(key), response.time_subscribed[key]])

            }

            $('#time_subscribed').highcharts({
                chart:{
                    type: 'column'
                },
                title: {
                    text: ''
                },

                xAxis: {
                    type: 'datetime'
                },

                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f})<br/>',
                    shared: true
                },
                legend: {
                },

                series: [{
                    name: 'Number of users by day',
                    data: pp,
                    marker: {
                        lineWidth: 2
                    }
                }],
            });
					}, 2000);
		});
		angular.element(document).ready(function () {
				$('#side-menu li').click(function(){
					$('#side-menu li').each(function( index ) {
								$( this ).attr('class', '');
							});
							$( this ).attr('class', 'active');
				})
    });
};


function Login($scope, $http, $filter, $rootScope, $location) {
    $scope.user = {
        username: '',
        password: '',
    };

    $scope.show = false;


    $scope.login = function () {
		url = 'http://' + $rootScope.IP + ':' + $rootScope.PORT + '/login/';

        if($scope.user.username == undefined || $scope.user.username == "" || $scope.user.password ==undefined || $scope.user.password =="")
				{

            return;
				}

        var parameter = JSON.stringify($scope.user);

        $http.post(url, parameter)
            .success(function(response) {
                if(response.login == 'success') {
                    $rootScope.user.username = $scope.user.username;
                    $rootScope.user.password = $scope.user.password;
                    $rootScope.is_authenticated = true;

                    $location.path('/index/users')

                    $scope.show = false;
                }
                else{
                    $scope.show = true;
                }


            });
	}

    $scope.logout = function () {

        $rootScope.user.username = undefined;
        $rootScope.user.password = undefined;
        $rootScope.is_authenticated = false;

        $location.path('/login')

	}
}

angular
    .module('dashboard')
    .controller('MainCtrl', MainCtrl)
    .controller('Login', Login)
    .controller('TableCtrl', TableCtrl)
    .controller('ReportCtrl', ReportCtrl)
