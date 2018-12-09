
var score_data = [];
var chartPerGeneration = 1;

function updateScoreData( gen, id, score ){
    if (gen % chartPerGeneration == 0) {
        score_data.push(score);
        showScoreChart(id);
    }
}

function showScoreChart(id) {

    console.log( 'showing for id ', id );
    var ctx = document.getElementById(id).getContext('2d');
    var chart_labels = [];
    for( var idx=0; idx < score_data.length; idx++ ){
        chart_labels.push( idx * chartPerGeneration );
    }

    var chart_config = {
                            "type": "line",
                            "data": { 
                                "labels": chart_labels, 
                                "datasets": [{ 
                                    "label": "Score vs Generation", 
                                    "data": score_data, 
                                    "fill": false, 
                                    "borderColor": "rgb(75, 192, 192)", 
                                    "lineTension": 0.1 
                                }] },
                            "options": {
                                layout: {
                                    padding: {
                                        left: 50,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    }
                                },
                                elements: {
                                    line: {
                                        tension: 0, // disables bezier curves
                                    }
                                },
                                options: {
                                    showLines: false, // disable for all datasets
                                },
                                animation: {
                                    duration: 0, // general animation time
                                },
                                hover: {
                                    animationDuration: 0, // duration of animations when hovering an item
                                },
                                responsiveAnimationDuration: 0,
                                scales: {
                                    xAxes: [{
                                        gridLines: {
                                            display:false
                                        },
                                    }],
                                    yAxes: [{
                                        display: false,
                                        gridLines: {
                                            display:false
                                        }   
                                    }]
                                }
                            }
                        }

    new Chart( ctx, chart_config );

}