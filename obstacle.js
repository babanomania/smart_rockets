class Obstacle{

    constructor( posx, posy ){
        this.pos = createVector( posx, posy );
    }

    show(){
        push();
        fill( 100, 200 );
        noStroke()
        rect( this.pos.x, this.pos.y, obstacle_width, obstacle_height );
        pop();
    }
}