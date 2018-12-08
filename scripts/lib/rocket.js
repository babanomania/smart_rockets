class Rocket{

    constructor( target, obstacles ){
        
        this.target = target;
        this.obstacles = obstacles;

        this.rwidth = 1;
        this.length = 20;

        this.pos = createVector( (width/2) - (this.rwidth/2), height - 2 );
        this.velocity = createVector();
        this.acc = createVector();
        
        if( this.velocity.y < 0 ){
            this.velocity.y *= -1;
        }

        this.brain = null;
        this.crashed = false;
        this.hasReached = false;

        this.score = 0;
    }

    addBrain( brain ){
        this.brain = brain;
    }

    show(displayStuff){
        push();
        
        var target_dist = dist( this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y );
        if( target_dist <= target_radius/2 ){
            this.crashed = true;

            if( !this.hasReached ){
                this.hasReached = true;
                this.score += 1000;
            }
        }

        if( !this.crashed ){
            for( var ind = 0; ind < this.obstacles.length; ind++ ){
                var this_obstacle = this.obstacles[ind];

                if( 
                    ( this.pos.x > this_obstacle.pos.x ) && 
                    ( this.pos.x < ( this_obstacle.pos.x + obstacle_width ) ) && 
                    ( this.pos.y > this_obstacle.pos.y ) && 
                    ( this.pos.y < ( this_obstacle.pos.y + obstacle_height ) )
                    
                ){
                    this.crashed = true;
                    this.score /= 10;
                }
            }
        }

        if( this.crashed ){

        } else if( this.pos.y < height ){
            this.score = 400 - ( frameCount % 400 );

            var gene = this.brain.gene( frameCount % 400 );
            if( ( this.pos.x <= 0 ) || ( this.pos.x >= width ) ){
                this.velocity.x *= -1
            }

            if( ( this.pos.y <= 0 ) || ( this.pos.y >= ( height - 1 ) ) ){
                this.velocity.y *= -1
            }
           
            this.acc.add(gene);
            this.velocity.add( this.acc )
            this.pos.add( this.velocity );
            this.acc.mult(0);
            this.velocity.limit(4);
        } 

        if( displayStuff ){
            translate( this.pos.x, this.pos.y );
            rotate( this.velocity.heading() );
            rectMode(CENTER);
            noStroke();
            fill( 255, 255 );
            rect( 0, 0, this.length, this.rwidth );
        }

        pop();
    }
}