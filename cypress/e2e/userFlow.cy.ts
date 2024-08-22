describe('Путь пользователя прохождения опроса', () => {
  it('Должны пройти квиз с выбранным количеством вопросов и увидеть результат', () => {
    cy.visit('/questionnaire');

    cy.get('input[name="questionCount"]').clear().type('3');
    cy.get('button[type="submit"]').click();

    for (let i = 1; i <= 3; i++) {
      cy.get('.question-option').first().click();

      cy.get('button[type="submit"]').click();
    }

    cy.get('.text-xl.font-semibold').should('contain.text', 'Results');

    cy.get('p').should('have.length.gte', 3);
    
    cy.get('p').each(($item) => {
      const text = $item.text().trim();
      expect(text).to.match(/✅|❌|👀/);
    });
  });
});
