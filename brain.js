class Brain{

    constructor( otherbrain ){

        this.dna = [];
        this.force = 0.2;

        if( otherbrain ){

            for( var ind = 0; ind < otherbrain.dna.length; ind++ ){
                this.dna.push( otherbrain.dna[ind] );
            }

        } else {

            for( var idx = 0; idx < lifespan; idx++ ){
                var gene = p5.Vector.random2D();
                gene.setMag( this.force );

                this.dna.push( gene );
            }
        }
    }

    gene( idx ){
        return this.dna[idx];
    }

    copy(){
        return new Brain( this );
    }

    crossover( otherbrain ){
        var rand_pos = Math.floor( random() * this.dna.length );
        for( var ind = 0; ind < this.dna.length; ind++ ){
            if( ind > rand_pos ){
                this.dna[ind] = otherbrain.dna[ind];
            }
        }
    }

    mutate(){
        var rand_pos = Math.floor( random() * this.dna.length );
        this.dna[rand_pos] = p5.Vector.random2D();
    }
}