import React from 'react';
import loadable from '@loadable/component';
import ComponentErrorBoundary from './errorCatch';

//Loaders
const Example = loadable(() =>
  import(/* webpackChunkName: "example" */ '../components/organisms/Example')
);

//get functions
export const getExample = (data, extras) => {
  return <Example {...data} {...extras} />;
};

const BodyLoader = ({ data, index, extras }) => {
  let component;
  const { column_module, column_module_ignore } = data;
  if (column_module_ignore) {
    component = null;
  } else {
    switch (column_module) {
      case 'example':
        component = getExample(data, extras);
        break;
      default:
        component = (
          <TextComponentBlock title={'Placeholder for ' + column_module} />
        );
    }
  }

  return (
    <ComponentErrorBoundary columnModule={column_module} componentData={data}>
      {component}
    </ComponentErrorBoundary>
  );
};
export default BodyLoader;
