module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/components/{{kebabCase name}}',
        base: 'plop-templates/component',
        templateFiles: 'plop-templates/component/*',
      },
    ],
  });
};
