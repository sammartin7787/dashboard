angular
    .module('dashboard')
    .directive('chart', function() {
        var htmlTemplate = '<div style="width:100%; height: 300px;"></div>';
        return {
            restrict: 'E',
            template: htmlTemplate,
            replace: true,
            link: function(scope, elem, attrs) {

                $.plot(elem, [{
                    data: scope.d1_1,
                    label: "Chrome",
                    color: "#ffce54"
                },{
                    data: scope.d1_2,
                    label: "Firefox",
                    color: "#3DB9D3"
                },{
                    data: scope.d1_3,
                    label: "Safari",
                    color: "#df4782"
                }], {
                    series: {
                        lines: {
                            show: !0,
                            fill: .01
                        },
                        points: {
                            show: !0,
                            radius: 4
                        }
                    },
                    grid: {
                        borderColor: "#fafafa",
                        borderWidth: 1,
                        hoverable: !0
                    },
                    tooltip: !0,
                    tooltipOpts: {
                        content: "%x : %y",
                        defaultTheme: false
                    },
                    xaxis: {
                        tickColor: "#fafafa",
                        mode: "categories"
                    },
                    yaxis: {
                        tickColor: "#fafafa"
                    },
                    shadowSize: 0
                });

            }
        };
    });