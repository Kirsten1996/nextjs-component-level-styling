/* eslint no-console: 0 */

const fs = require('fs');

const path = 'src/components/organisms';
const filePath = 'src/BodyLoader/index.js';
let components = [];

function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

//fs functions
function readdirAsync(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(error, result) {
      console.log(result);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function deleteFile(path) {
  return new Promise(function(resolve, reject) {
    fs.unlink(path, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//constructs
const loaderString = i =>
  `
const ${i} = loadable(() =>
  import(/* webpackChunkName: "${camelCaseToDash(
    i
  )}" */ '../components/organisms/${i}')
);
`;

const getFunc = i =>
  `
export const get${i} = (data, extras) => {
  return <${i} {...data} {...extras} />;
};
`;

const switchF = i => `
  case '${camelCaseToDash(i)}':
        component = get${i}(data, extras);
        break;`;

const init = async () => {
  components = await readdirAsync(path);

  await deleteFile(filePath)
    .then(() => console.log(`${filePath} has been removed`))
    .catch(i => {
      if (i.code === 'ENOENT') {
        console.log(`${filePath} already deleted or not present`);
      }
    });

  const fileWrite = fs.createWriteStream(filePath, {});

  console.log('File created');

  fileWrite.write(`
    import React from 'react';
    import loadable from '@loadable/component'
    import ComponentErrorBoundary from './errorCatch';
    
    //Loaders ${components.map(i => loaderString(i).toString()).join('')}

    //get functions ${components.map(i => getFunc(i)).join('')}

    const BodyLoader = ({data, index, extras}) => {
      let component;
      const { column_module, column_module_ignore } = data;
      if (column_module_ignore) {
        component = null;
      } else {
        switch (column_module) {
          ${components.map(i => switchF(i)).join('')}
          default:
            component = (
              <TextComponentBlock
                title={"Placeholder for " + column_module}
              />
            );
        }
      }

      return (
        <ComponentErrorBoundary columnModule={column_module} componentData={data}>
          {component}
        </ComponentErrorBoundary>
      );
    }
    export default BodyLoader;
`);

  fileWrite.end(() => {
    console.log('Running prettier...');
  });

  const { exec } = require('child_process');
  exec(`prettier --write ${filePath}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`prettier completed: ${stdout}`);
  });
};

init()
  .then()
  .catch(err => {
    console.log(err);
  });
