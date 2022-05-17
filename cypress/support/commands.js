
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('João Eduardo')
    cy.get('#lastName').type('Carvalho Blehm')
    cy.get('#email').type('joaoeduardoblehm@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})