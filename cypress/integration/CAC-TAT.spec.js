//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
    //Funcionalidade para encontrar a página
    cy.visit('./src/index.html')  
    })

    it('verifica o título da aplicação', function() {
      
        //verifica o título da aplicação
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
       
    })

    //preenche os campos obrigatórios e envia o formulário
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,'
        cy.get('#firstName').type('João Eduardo')
        cy.get('#lastName').type('Carvalho Blehm')
        cy.get('#email').type('joaoeduardoblehm@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    //exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
        cy.get('#firstName').type('João Eduardo')
        cy.get('#lastName').type('Carvalho Blehm')
        cy.get('#email').type('joaoeduardoblehm@gmail,com')
        cy.get('#open-text-area').type('texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //campo telefone continua vazio quando preenchido com valor não-númerico
    it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
       
        cy.get('#phone')
        .type('abcdeffasd')
        .should('have.value','')

    })

    //exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        
        cy.get('#firstName').type('João Eduardo')
        cy.get('#lastName').type('Carvalho Blehm')
        cy.get('#email').type('joaoeduardoblehm@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

     //preenche e limpa os campos nome, sobrenome, email e telefone
     it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        
        cy.get('#firstName')
        .type('João Eduardo')
        .should('have.value','João Eduardo')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Carvalho Blehm')
        .should('have.value','Carvalho Blehm')
        .clear()
        .should('have.value', '')
        
        cy.get('#email')
        .type('joaoeduardoblehm@gmail.com')
        .should('have.value','joaoeduardoblehm@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('51997405079')
        .should('have.value', '51997405079')
        .clear()
        .should('have.value','')

        cy.get('#open-text-area')
        .type('texto')
        .should('have.value','texto')
        .clear()
        .should('have.value', '')

      

       
    })

    //exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
        
    })

    //envia o formuário com sucesso usando um comando customizado
    it('envia o formuário com sucesso usando um comando customizado', function(){
    
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //seleciona um produto (YouTube) por seu texto
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    //seleciona um produto (Mentoria) por seu valor (value)
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    //seleciona um produto (Blog) por seu índice
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })

    //marca o tipo de atendimento "Feedback"
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')

    })

    //marca cada tipo de atendimento"
    it('marca cada tipo de atendimento"', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //marca ambos checkboxes, depois desmarca o último
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    
    })

    //seleciona um arquivo da pasta fixtures
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //seleciona um arquivo simulando um drag-and-drop
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json')
        })
    
    })

    //seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })


    //verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')


    })

    //acessa a página da política de privacidade removendo o target e então clicanco no link
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')


    })

  

  })
  