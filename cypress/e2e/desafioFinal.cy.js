describe('Desafio final do curso de cypress básico: encontrar o gato', () => {
    it('Provando que o gato está na página', () => {
        
        cy.visit("../../src/index.html")

        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')

        cy.get('#title')
            .invoke('text', 'CAT TAT')
    })
})