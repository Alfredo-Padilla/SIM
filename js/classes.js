// AUX FUNCTIONS
function inherit_from(obj, inherit) {
    for ( let i of inherit ) 
        for ( let key in i )
            obj[key] = i[key];
}


// CLASSES
let Object = function(id, w, h) {
    return {
        id : id,
        pos : {
            x : 0,
            y : 0
        },
        size : {
            w : w,
            h : h,
        },
    }
}

let Perception = function(pernt_body) {
    return {
        perc : {
            pernt_body : pernt_body,
            radius : 50,
            
            on_perception_radius : function () {
                
            },
            
            draw_perception_radius : function () {
                // Como targeteo el cuerpo del padre aqui?...
                this.pernt_body.innerHTML += '<div class="perception-r"></div>';
            }
        }
    }
}

let Animal = function(id, w, h) {
    return {
        body : document.createElement('div'),
        inherit : [Object( id, w, h ), Perception( this.body )],
        color : 'green',
        speed_mod : 20,
        
        needs : {
            food : .0,
            water : .0,
            sleep : .0,
            // ...
        },
        

        init : function() {
            console.log( '' );
            console.log( this.id+': init()' );

            // Inheritance
            inherit_from( this, this.inherit );
            
            // Body set-up
            this.body.innerHTML += '🦍';
            this.body.setAttribute( 'id', this.id );
            this.body.setAttribute( 'class', 'animal' );

            this.body.style.transitionDuration = MS_INTERVAL+'ms';
            
            // Size
            this.body.style.width  = this.size.w+'px';
            this.body.style.height = this.size.h+'px';
            
            // Position
            this.update_position();
            
            // Color
            this.body.style.background = this.color;
            
            document.querySelector( WORLD_QUERY ).appendChild( this.body );
            return this;
        },

        update : function() {
            console.log( '' );
            console.log( this.id+': update()' );

            this.perc.draw_perception_radius();

            this.random_move();
            this.update_position();
        },

        update_position : function() {
            console.log( this.id+': update_position()' );

            this.body.style.left = this.pos.y+'px';
            this.body.style.top  = this.pos.x+'px';
        },

        random_direction : function(start, end) {
            if ( Math.random() > .5 )
                return 0;
            else
                return Math.random() > .5 ? start : end;
        },

        random_move : function() {
            console.log( this.id+': random_move()' );

            let x_change = 0;
            let y_change = 0;
            let min = 0;
            let max = 0;

            // Check for horizontal bounds
            if ( this.pos.x < WORLD_W-this.speed_mod ) 
                max = 1;
            if ( this.pos.x > this.speed_mod ) 
                min = -1;

            // Randomize horizontal movement
            x_change = this.random_direction( min, max );
            this.pos.x += x_change * this.speed_mod;

            // Check for vertical bounds
            min = 0;
            max = 0;
            if ( this.pos.y < WORLD_H-this.speed_mod ) 
                max = 1;
            if ( this.pos.y > this.speed_mod ) 
                min = -1;

            // Randomize vertical movement
            y_change = this.random_direction( min, max );
            this.pos.y += y_change * this.speed_mod;
            
            console.log( '  this.pos.x = '+this.pos.x );
            console.log( '  this.pos.y = '+this.pos.y );
        }

    }
}

let Food = function(id, w, h) {
    return {
        inherit : [Object( id, w, h )],
        
        init : function() {
            // Inheritance
            inherit_from( this, this.inherit );
        }
    }
}