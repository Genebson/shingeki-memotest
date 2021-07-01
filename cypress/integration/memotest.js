const URL = 'http://127.0.0.1:5500';

context('Memotest', () => {

  before(() => {
    cy.visit(URL)
  });

  describe('Comienza el juego', () => {
    const NUMERO_CARTAS = 16;

    it('Verifica que haya un tablero con cartas', () => {
      cy.get('#memotest').find('.cards').should('have.length', NUMERO_CARTAS)
    })

    it('Chequea que las cartas sean aleatorias', () => {
      cy.get('.cards').then((cartas) => {
        let idOriginales = [];
        cartas.each((i, carta) => {
          idOriginales.push(carta.dataset.id)
          cy.log(idOriginales[i]);
        })

        cy.visit(URL)

        cy.get('.cards').then((cartas) => {
          let idNuevos = [];
          cartas.each((i, carta) => {
            idNuevos.push(carta.dataset.id)
            cy.log(idNuevos[i]);
          })
          cy.wrap(idOriginales).should('not.deep.equal', idNuevos)
        })
      })
    })
  })

  describe('Resuelve el juego', () => {
    let mapaDePares, listaDePares
    it('Selecciona una carta errónea', () => {
      cy.get('.cards').then((cartas) => {
        mapaDePares = obtenerCartasIguales(cartas)
        // listaDePares[0][0].click();
        // listaDePares[1][0].click();

        cy.get('.cards').should('have.length', 16)
      })
    })
  })
})

function obtenerCartasIguales(cartas) {
  const cartasIguales = {}

  cartas.each((i, carta) => {
    cy.get(`[data-id=${carta.dataset.id}]`).then(($cartas) => {
      console.log(carta);
      if ($cartas[cartasIguales]) {
        $cartas[cartasIguales].push(carta)
        console.log('entro al if');
      } else {
        $cartas[cartasIguales] = [carta]
        console.log('entro al else');
      }
    })
  })
  console.log(cartasIguales);
  return cartasIguales
}