describe('Todos', () => {
  beforeEach(() => cy.visit('/'));

  describe('When the app is opened', () => {
    it('displays the title of the app', () => {
      cy.findByTestId('app-title').contains(/Todos/);
    });

    it('displays a todo', () => {
      cy.intercept('http://localhost:3000/api', [
        {
          id: '1',
          text: 'Buy 🥛',
          isComplete: true,
          isPinned: true,
        },
      ]);

      cy.findAllByTestId('todo-item').should('have.length', 1);
    });
  });

  describe('When the settings button is clicked', () => {
    it('opens the dialog', () => {
      cy.findByTestId('button-dialog-opener').click();
      cy.findByTestId('dialog-settings-title').contains(/Settings/);
    });
  });
});
