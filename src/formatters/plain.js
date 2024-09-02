import isPlainObject from 'lodash/isPlainObject.js';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (tree) => {
  const iter = (tree, path = '') => {
    const lines = tree
      .flatMap((node) => {
        const { name, type, oldValue, newValue, children } = node;
        const hasChildren = !!children;

        const currentPath = path ? `${path}.${name}` : name;

        if (hasChildren) {
          return iter(children, currentPath);
        }

        switch (type) {
          case 'unchanged':
            return '';
          case 'added':
            return `Property '${currentPath}' was added with value: ${formatValue(newValue)}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'updated':
            return `Property '${currentPath}' was updated. From ${formatValue(
              oldValue
            )} to ${formatValue(newValue)}`;
          default:
            throw new Error('Type is not defined');
        }
      })
      .filter((line) => line !== '');

    return lines.join('\n');
  };
  return iter(tree);
};

export default plain;
