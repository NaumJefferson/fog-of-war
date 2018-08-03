// init canvas
var     canvas = $( 'canvas' )               
  ,     ctxWorld = canvas[0].getContext( '2d' ) // mundo
  ,     ctxFog = canvas[1].getContext( '2d' ) // neblina
  ,     ctxChars = canvas[2].getContext( '2d' ) // jogadores
  ,     mDown = false
  ,     r1 = 50
  ,     r2 = 150
  ,     density = .4
  ,     hideOnMove = true
  ,     hideFill = 'rgba( 0, 0, 0, .75 )'
  ,     overlay = 'rgba( 0, 0, 0, 1 )'
  ;

if( !hideOnMove ){
  // Não deve ser assim, mas isso é apenas uma demostração
  canvas.get(1).remove();
}

//Escurecer a tela
ctxWorld.fillStyle = overlay;
ctxWorld.fillRect( 0, 0, 1280, 800 );

//Configurar borracha
ctxWorld.globalCompositeOperation = 'destination-out';

canvas.last()
  .on( 'mousemove', function( ev, ev2 ){
    ev2 && ( ev = ev2 );
    
    var pX = ev.pageX
      , pY = ev.pageY
      ;

    //Mostrar onde estamos apontando
    var radGrd = ctxWorld.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(       0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( density, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(       1, 'rgba( 0, 0, 0,  0 )' );
    
    ctxWorld.fillStyle = radGrd;
    ctxWorld.fillRect( pX - r2, pY - r2, r2*2, r2*2 );
    
    // Esconda parcialmente todo o mapa e mostre onde estamos agora
    ctxFog.globalCompositeOperation = 'source-over';
    ctxFog.clearRect( 0, 0, 1280, 800 );
    ctxFog.fillStyle = hideFill;
    ctxFog.fillRect ( 0, 0, 1280, 800 );

    var radGrd = ctxWorld.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( .8, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );

    ctxFog.globalCompositeOperation = 'destination-out';
    ctxFog.fillStyle = radGrd;
    ctxFog.fillRect( pX - r2, pY - r2, r2*2, r2*2 );
 
    // Esconda caracteres, exceto onde podemos ver. Isso pode ser feito no ctxFog?
    ctxChars.clearRect( 0, 0, 1280, 800 );
        
    //Desenhar jogadores
    ctxChars.globalCompositeOperation = 'source-over';
    ctxChars.fillStyle = '#F00';
    for( var i=0; i<20; i++ ){
      for( var j=0; j<20; j++ ){
        ctxChars.fillRect( i*100, j*100, 10, 10 );
      }
    }

    // ocultar jogadores, exceto na localização atual
    ctxChars.globalCompositeOperation = 'destination-in';
    ctxChars.fillStyle = radGrd;
    ctxChars.fillRect( 0, 0, 1280, 800 );
  })
  .trigger( 'mousemove', {pageX: 150, pageY:150 })
  .on('click', function(){

  });

// códigos de trapaças (cheat codes)
var keyHistory = '';
$( document.body )
    .on( 'keypress', function( ev ){
      keyHistory += String.fromCharCode( ev.keyCode ).toLowerCase();
      if( ~keyHistory.indexOf( 'show' ) ){
        //canvas.remove();
        canvas.get(0).remove();
        keyHistory = '';
      }
    } );