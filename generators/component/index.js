const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a reusable component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: [
        { name: 'Stateless Function', value: 'Stateless Function' },
        { name: 'ES6 Class', value: 'ES6 Class' },
      ],
    },
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
      type: 'list',
      name: 'design',
      message: 'Atomic design Type',
      default: 'Atom',
      choices: [
        { name: 'Atom', value: 'Atoms' },
        { name: 'Molecule', value: 'Molecules' },
        { name: 'Organism', value: 'Organisms' },
      ],
    },
    {
      type: 'confirm',
      name: 'wantStyling',
      default: true,
      message: 'Do you want styling',
      when: i => i.type !== 'Styled Component',
    },
  ],
  actions: data => {
    let componentTemplate;

    switch (data.type) {
      case 'ES6 Class': {
        componentTemplate = './component/templates/component.js.hbs';
        break;
      }
      case 'Stateless Function': {
        componentTemplate = './component/templates/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/templates/component.js.hbs';
      }
    }

    let basePath = '../src/components/{{lowerCase design}}/{{properCase name}}';

    const actions = [
      //create component
      {
        type: 'add',
        path: `${basePath}/index.js`,
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      //create test
      {
        type: 'add',
        path: `${basePath}/{{properCase name }}.test.js`,
        templateFile: './component/templates/test.js.hbs',
        abortOnFail: true,
      },
      //add stories
      {
        type: 'add',
        path: `${basePath}/{{properCase name }}.stories.js`,
        templateFile: './component/templates/stories.js.hbs',
        abortOnFail: true,
      },
      //add readme
      {
        type: 'add',
        path: `${basePath}/README.md`,
        templateFile: './component/templates/readme.md.hbs',
        abortOnFail: true,
      },
      //add data
      {
        type: 'add',
        path: `${basePath}/__mocks__/{{camelCase name}}Data.js`,
        templateFile: './component/templates/data.js.hbs',
        abortOnFail: true,
      },
    ];
    //styling
    if (data.wantStyling) {
      actions.push({
        type: 'add',
        path: `${basePath}/{{properCase name }}.scss`,
        templateFile: './component/templates/styles.scss.hbs',
        abortOnFail: true,
      });
    }
    return actions;
  },
};
