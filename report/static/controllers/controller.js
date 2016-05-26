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

function TableCtrl($scope, $http, $rootScope, $location) {
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

    $scope.person_click = function (index) {
        $rootScope.pass_data.user = $scope.userdata[index]

        $http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/profile/')
		.success(function(response) {
			$rootScope.pass_data.profile = response;
            $location.path('/index/profile')
		});
    }
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

function ProfileCtrl($scope, $http, $rootScope, $location) {
    /*$http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/users/')
		.success(function(response) {
			$scope.userdata = response
		});*/

        $scope.interests = [];
        for (var key in $rootScope.pass_data.profile.interests) {
          // do something with key
            $scope.interests.push([key, $rootScope.pass_data.profile.interests[key]])
        }

        $scope.energy = [];
        for (var key in $rootScope.pass_data.profile.energy) {
          // do something with key
            $scope.energy.push({'name': key, 'data':$rootScope.pass_data.profile.energy[key]})
        }
    angular.element(document).ready(function () {

        if($rootScope.pass_data.user == ''){

            $location.path('/index/users')
            return;
        }


        setTimeout(function(){

                 chart = Highcharts.chart('lead-score', {

                    chart: {
                        type: 'solidgauge',
                        marginTop: 40,
                        borderWidth: 1,

                    },

                    title: {
                        text: 'Lead Score<br/>' + $rootScope.pass_data.user.lead_score + "%",
                        style: {
                            fontSize: '24px'
                        }
                    },

                    tooltip: {
                        borderWidth: 0,
                        backgroundColor: 'none',
                        shadow: false,
                        style: {
                            fontSize: '14px'
                        },
                        pointFormat: '{series.name}<br><span style="font-size:1.5em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                        positioner: function (labelWidth, labelHeight) {
                            return {
                                x: 100 - labelWidth / 2,
                                y: 85
                            };
                        }
                    },

                    pane: {
                        startAngle: 0,
                        endAngle: 360,
                        background: [{ // Track for Move
                            outerRadius: '60%',
                            innerRadius: '40%',
                            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(1).get(),
                            borderWidth: 0
                        }]
                    },

                    yAxis: {
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        tickPositions: []
                    },

                    plotOptions: {
                        solidgauge: {
                            borderWidth: '12px',
                            dataLabels: {
                                enabled: false
                            },
                            stickyTracking: false
                        }
                    },

                    series: [{
                        name: 'Score',
                        borderColor: Highcharts.getOptions().colors[2],
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '50%',
                            innerRadius: '50%',
                            y: $rootScope.pass_data.user.lead_score
                        }]
                    }]
                },

                /**
                 * In the chart load callback, add icons on top of the circular shapes
                 */
                function callback() {

                    // Move icon
                    this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 26)


                    // Exercise icon
                    this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 61)

                    // Stand icon
                    this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 96)
                });


                $('#container').highcharts({
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ''
                    },

                    xAxis: {
                        allowDecimals: false,
                        labels: {
                            formatter: function () {
                                return this.value; // clean, unformatted number for year
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y:,.2f}</b>'
                    },
                    plotOptions: {
                        area: {
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: $scope.energy
                });

            $('#system-cost').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function() {
                            return '$' + this.value;
                        }
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Storage',
                    data: [5]
                }, {
                    name: 'Solar',
                    data: [2]
                }, {
                    name: 'Old Bill',
                    data: [3]
                }]
            });

            $('#interest').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
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
                    data: $scope.interests
                }]
            });
        }, 500);

    });
};

angular
    .module('dashboard')
    .controller('MainCtrl', MainCtrl)
    .controller('Login', Login)
    .controller('TableCtrl', TableCtrl)
    .controller('ReportCtrl', ReportCtrl)
    .controller('ProfileCtrl', ProfileCtrl)