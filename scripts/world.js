
let width = 640;
let height = 480;

var target;
var rockets;
var obstacles = [];

var target_radius = 30;
var obstacle_width = 150;
var obstacle_height = 30;

var gen = 0;
var population = 100;
var lifespan = 400;

var top_score = 0;  
var top_generation = 0;
var selection_rate = 0.5;

var random_obstacles = false;
var max_obstacles = 5;

function setup() {
    var simuation = createCanvas(width, height);
    simuation.parent('simulation');

    target = new Target();

    if(! random_obstacles ){
        obstacles.push( new Obstacle( 0, height/2 ) );
        obstacles.push( new Obstacle( width/2 - (obstacle_width/2), height/2 ) );
        obstacles.push( new Obstacle( width - obstacle_width, height/2 ) );

    } else {
        for( var id = 0; id < max_obstacles; id++ ){
            obstacles.push( new Obstacle( 
                                            random( 0,                  ( width - obstacle_width ) ), 
                                            random( obstacle_height,    2 * ( height / 3 ) ),
                                        ) 
                            );
        }
    }

    rockets = [];

    for( var idx = 0; idx < population; idx++ ){
        var rocket = new Rocket( target, obstacles );
        rocket.addBrain( new Brain() );
        rockets.push( rocket );
    }


}
  
function draw() {
    clear();
    background('#009688');
    
    var speed = document.querySelector('#speed').value;
    var displayStuff = ( frameCount % speed ) == 0;

    for( var idx = 0; idx < rockets.length; idx++ ){
        rockets[idx].show(displayStuff);
    }

    if( frameCount % lifespan == 0 ){
        nextGeneration();
    }

    if( displayStuff ){
            
        for( var idx = 0; idx < this.obstacles.length; idx++ ){
            this.obstacles[idx].show();
        }

        target.show();
    }

    text( "Generation " + gen, 20, 20 );
    text( "Frame " + ( frameCount % lifespan ), 20, 40 );
    text( "Best Score " + top_score + ' G#' + top_generation, 20, 60 );
}

function nextGeneration(){

    updateScoreData( gen, "score_chart", top_score );

    for( var idx=0; idx < population; idx++ ){
        var this_rocket = rockets[idx];
        if( this_rocket.score > top_score ){
            top_score = Math.ceil(this_rocket.score);
            top_generation = gen;
        }
    }

    var gene_pool = [];
    for( var idx = 0; idx < population; idx++ ){
        var this_rocket = rockets[idx];
        var this_fitness = this_rocket.score/top_score;
        if( this_fitness > ( 1 - selection_rate ) ){
            for( var idd = 0; idd < ( this_rocket.score * 100 ); idd++ ){
                gene_pool.push( this_rocket );
            }
        }
    }

    rockets = [];
    for( var idx = 0; idx < population; idx++ ){
        
        var par1 = random(gene_pool);
        var par2 = random(gene_pool);

        var new_brain = par1.brain.copy();
        new_brain.crossover( par2.brain );
        new_brain.mutate();
        
        var new_rocket = new Rocket( target, obstacles );
        new_rocket.addBrain( new_brain );
        rockets.push( new_rocket );
    }

    gen++;
}
