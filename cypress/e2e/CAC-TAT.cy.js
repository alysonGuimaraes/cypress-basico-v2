describe('Central de Atendimento ao Cliente TAT', () => {

    const THREE_SECONDS = 3000

    /*
        Aqui se inicia os exercícios da seção 3 do curso de cypress
    */

    beforeEach(() => {
        cy.visit("../../src/index.html")
    })

    it('verifica o título da aplicação', () => {
        cy.title().should(
            'eq',
            'Central de Atendimento ao Cliente TAT'
        )
    })

    it("Preenche os campos obrigatórios e envia o formulário", () => {

        const texto_grande = Cypress._.repeat([`teste teste teste teste `], [20])

        cy.get('#firstName').type("Alyson")
        cy.get('#lastName').type("Guimaraes")
        cy.get('#email').type("alysong@blabla.com.br")
        cy.get('#open-text-area').type(texto_grande, { delay: 0 })

        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS)

        cy.get('.success').should('not.be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type("Alyson")
        cy.get('#lastName').type("Guimaraes")
        cy.get('#email').type("alysong")
        cy.get('#open-text-area').type('É pra dar erro por causa do e-mail')

        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS)

        cy.get('.error').should('not.be.visible')
    })

    it('Campo telefone continua vazio ao ser preenchido com valor não-numérico', () => {
        cy.get('#phone').type('teste').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type("Alyson")
        cy.get('#lastName').type("Guimaraes")
        cy.get('#email').type("alysong@teste.com.br")
        cy.get('#open-text-area').type('É pra dar erro por causa do telefone')

        cy.get('#phone-checkbox').check().should('be.checked')

        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS)

        cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        // Forma feita no curso
        cy.get('#firstName')
            .type("Alyson")
            .should('have.value', 'Alyson')
            .clear()
            .should('have.value', '')

        // Forma que eu fiz ao resolver o exercício
        cy.get('#lastName').type("Guimaraes").should('have.value', 'Guimaraes')
        cy.get('#lastName').clear().should('have.value', '')

        cy.get('#email').type("alysong@teste.com.br").should('have.value', 'alysong@teste.com.br')
        cy.get('#email').clear().should('have.value', '')

        cy.get('#phone').type(912345678).should('have.value', '912345678')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS)

        cy.get('.error').should('not.be.visible')
    })


    Cypress._.times(5, () => {
        it('Envia o formuário com sucesso usando um comando customizado', () => {
            cy.fillMandatoryFieldsAndSubmit()
    
            cy.clock()
            
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')
            cy.tick(THREE_SECONDS)
    
            cy.get('.success').should('not.be.visible')
        })
    })

    /*
        Aqui se inicia os exercícios da seção 4 do curso de cypress
    */

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })


    /*
        Aqui se inicia os exercícios da seção 5 do curso de cypress
    */

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each((el) => {
                cy.wrap(el).check().should('be.checked')
            });
    })

    /*
        Aqui se inicia os exercícios da seção 6 do curso de cypress
    */

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
        
        // cy.get('input[type="checkbox"]')
        //     .last().uncheck().should('not.be.checked')
    })

    /*
        Aqui se inicia os exercícios da seção 7 do curso de cypress
    */

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                //console.log(input[0].files)
                const files = input[0].files
                expect(files[0].name).to.eq('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .then(input => {
                const files = input[0].files
                expect(files[0].name).to.eq('example.json')
            })            
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@exampleFile')
            .then(input => {
                const files = input[0].files
                expect(files[0].name).to.eq('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .should('not.have.attr', 'target')

        cy.get('a[href="privacy.html"]').click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})