const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a pages component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantStyling',
      default: true,
      message: 'Do you want styling',
    },
  ],

  actions: data => {
    const actions = [
      //Component
      {
        type: 'add',
        path: '../src/pages/{{properCase name}}/index.js',
        templateFile: './pages/templates/component.js.hbs',
        abortOnFail: true,
      },
      //test
      {
        type: 'add',
        path:
          '../src/pages/{{properCase name}}/{{properCase name }}.test.js',
        templateFile: './pages/templates/test.js.hbs',
        abortOnFail: true,
      },
    ];

    //styling
    if (data.wantStyling) {
      actions.push({
        type: 'add',
        path: '../src/pages/{{properCase name}}/{{properCase name }}.scss',
        templateFile: './pages/templates/styles.scss.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
