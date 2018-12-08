class Target{

    constructor(){
        this.pos = createVector( (width/2), 50 );
    }

    show(){
        push();
        fill( '#cddc39' );
        noStroke()
        ellipse( this.pos.x, this.pos.y, target_radius, target_radius);
        pop();
    }
}