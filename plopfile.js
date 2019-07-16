module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      },
      {
        type: 'confirm',
        default: false,
        name: 'useChannelsService',
        message: 'Will it use channels service?'
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
