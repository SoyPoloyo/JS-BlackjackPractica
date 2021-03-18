/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of spades
 */


const modulo = (() => {
    'use strict';

    console.log(`
sdsdsdssdsdsdsdsdsdsds
sdsdsdsdsdsdsdsdsdsdds
sdsdsd
sdsd
sdsds
sdsds
sdsd
sd
sdsdsdsdsd
sdsdsdsd
sdsd
sdsdsd
sdsds
sdsdsd
sdsdsdsdsdsdsdsdsdsdsd
sdsdsdsdsdsdsdsdsdsdsd`);



    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // Referencias
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    let puntosJugadores = [0];

    const CartasJugadores = document.querySelectorAll('.cartas-jugadores'),
        puntosTotales = document.querySelectorAll('small');

    // funciones
    const iniciliazarJuego = (numJugadores = 1) => {
        deck = crearDeck();
        puntosJugadores = [0];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosTotales.forEach(elem => elem.innerText = 0);
        CartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {

            for (const tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push(especial + tipo)
            }
        }

        return _.shuffle(deck);
    }


    const pedirCarta = () => (deck.length === 0) ? alert('No hay cartas en el deck') : deck.pop();

    const valorCarta = (carta) => (isNaN(carta.slice(0, -1))) ? carta.slice(0, -1) === 'A' ? 11 : 10 : carta.slice(0, -1) * 1;
    //  const valor = carta.substring(0, carta.length - 1);  -- opcion B


    /* Turno: 0 seria el primer jugador, el ultimo la pc, faltan cambios para que sea para mas jugadores
    por si le interesa agregarlos no los va encontrar en este codigo, al menos no de momento,
    sin embargo seria bastante basico, ya esta casi todo hecho para trabajar con varios */
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosTotales[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const mostrarCarta = (carta, turno) => {
        CartasJugadores[turno].innerHTML += `
        <img class="carta" src="assets/cartas/${carta}.png" alt="">
        `
    }

    const mostrarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('nadie gana');
            } else if (puntosComputadora > 21) {
                alert('jugador gana')
            } else if (puntosMinimos > 21) {
                alert('computador gana gana');
            } else {
                alert('computador gana gana');
            }
        }, 10);

    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            mostrarCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        mostrarGanador();
    }


    //Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        mostrarCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('perdio manco')
            turnoComputadora(puntosJugador);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        } else if (puntosJugador === 21) {
            console.warn('yei 21')
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }


    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    })

    btnNuevo.addEventListener('click', () => {

        iniciliazarJuego();

    })

    return {
        nuevoJuego: iniciliazarJuego
    }

})()




