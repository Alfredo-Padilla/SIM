// alert('🦍');

// MAIN
document.addEventListener("DOMContentLoaded", (event) => {
    let ANIMALS = [];

    function init() {
        document.querySelector( WORLD_QUERY ).setAttribute( 'style',
            'width:  '+WORLD_W+'px;'+
            'height: '+WORLD_W+'px;'
        );
        ANIMALS.push( Animal( 'test', 25, 25 ).init() );
    }
    init();
    
    function main() {
        console.clear();
        
        for ( let animal of ANIMALS )
            animal.update();

    }
    
    setInterval( () => {
        if ( !PAUSED ) 
            main();
    }, MS_INTERVAL );

});