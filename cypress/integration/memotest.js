const URL = 'http://127.0.0.1:5500';

context('Memotest', () => {

  before(() => {
    cy.visit(URL)
  });

  describe('Comienza el juego', () => {
    const NUMERO_CARTAS = 16;
    it('Verifica que haya un tablero con cartas', () => {
      cy.get('#memotest').find('.card-size').should('have.length', NUMERO_CARTAS)
    })

    it('Chequea que las cartas sean aleatorias', () => {
      cy.get('.card-size').then((cartas) => {
        let idOriginales = [];
        cartas.each((i, carta) => {
          idOriginales.push(carta.dataset.id)
        })

        cy.visit(URL)

        cy.get('.card-size').then((cartas) => {
          let idNuevos = [];
          cartas.each((i, carta) => {
            idNuevos.push(carta.dataset.id)
          })
          cy.wrap(idOriginales).should('not.deep.equal', idNuevos)
        })
      })
    })

    describe('Resuelve el juego', () => {
      let mapaDeCartas, arrCartasIguales
      it('Selecciona una carta errónea', () => {
        cy.get('.card-size').then((cartas) => {
          mapaDeCartas = obtenerCartasIguales(cartas)
          arrCartasIguales = Object.values(mapaDeCartas)
          arrCartasIguales[0][0].click();
          arrCartasIguales[1][0].click();
          cy.get('.card-size').should('have.length', NUMERO_CARTAS)
        })
      })

      it('Gana el juego', () => {
        arrCartasIguales.forEach((par) => {
          console.log(par);
          cy.get(par[0]).click()
          cy.get(par[1]).click()
        })

        cy.get('.card-size').should('not.be.visible')
        cy.get('#memotest').should('not.be.visible')
        cy.get('#jugadas').should('not.be.visible')
        cy.get('#github').should('not.be.visible')
        cy.get('body').should('have.css', 'background-image', `url("${URL}/src/imgs/victoria.gif")`)
        cy.get('#mensaje').should('have.text', '¡GANASTE! 🥳')
        cy.wait(1900)
        cy.get('#mensaje').should('not.be.visible')
        cy.wait(14000)
      })

      it('Pierde el juego', () => {
        arrCartasIguales.forEach((par) => {
          Cypress.dom.isAttached(par)
          console.log(par[0]);
          cy.get(par[0]).click()
          cy.get(par[0]).click()
        })

        cy.get('.card-size').should('not.be.visible')
        cy.get('#memotest').should('not.be.visible')
        cy.get('#jugadas').should('not.be.visible')
        cy.get('#github').should('not.be.visible')
        cy.get('body').should('have.css', 'background-image', `url("${URL}/src/imgs/derrota.gif")`)
        cy.get('#mensaje').should('have.text', '¡PERDISTE! 👎🏻')
        cy.wait(1900)
        cy.get('#mensaje').should('not.be.visible')
        cy.wait(14000)
        cy.visit(URL)
      })
    })
  })
})

function obtenerCartasIguales(cartas) {
  const cartasIguales = {}

  cartas.each((i, carta) => {
    if (!cartasIguales[carta.dataset.id]) {
      cartasIguales[carta.dataset.id] = [];
    }
    cartasIguales[carta.dataset.id].push(carta);
  })
  console.log(cartasIguales);
  return cartasIguales;
}