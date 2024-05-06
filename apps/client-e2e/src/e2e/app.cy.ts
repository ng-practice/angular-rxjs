describe('Todos', () => {
  beforeEach(() => cy.visit('/'));

  describe('When the app is opened', () => {
    it('displays the title of the app', () => {
      cy.get('[data-testid="app-title"]').contains(/Todos/);
    });
  });
});
