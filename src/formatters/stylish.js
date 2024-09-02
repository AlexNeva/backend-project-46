import isPlainObject from 'lodash/isPlainObject.js';

const INDENT_SIZE = 4;

const formatValue = (value, depth) => {
  if (!isPlainObject(value)) {
    return value;
  }

  const indent = ' '.repeat(INDENT_SIZE * (depth + 1));
  const bracketIndent = ' '.repeat(INDENT_SIZE * depth);
  const entries = Object.entries(value).map(
    ([key, val]) => `\n${indent}${key}: ${formatValue(val, depth + 1)}`
  );

  return `{${entries.join('')}\n${bracketIndent}}`;
};

const stylish = (diff) => {
  const iter = (tree, depth = 1) => {
    const baseIndent = ' '.repeat(INDENT_SIZE * depth - 2);
    const bracketIndent = ' '.repeat(INDENT_SIZE * depth);

    const lines = tree.map((node) => {
      const { name, type, oldValue, newValue, children } = node;
      const hasChildren = !!children;

      if (hasChildren) {
        return `${baseIndent}  ${name}: {\n${iter(children, depth + 1)}\n${bracketIndent}}`;
      }

      switch (type) {
        case 'unchanged':
          return `${baseIndent}  ${name}: ${formatValue(oldValue, depth)}`;
        case 'added':
          return `${baseIndent}+ ${name}: ${formatValue(newValue, depth)}`;
        case 'removed':
          return `${baseIndent}- ${name}: ${formatValue(oldValue, depth)}`;
        case 'updated':
          return (
            `${baseIndent}- ${name}: ${formatValue(oldValue, depth)}` +
            `\n${baseIndent}+ ${name}: ${formatValue(newValue, depth)}`
          );
        default:
          throw new Error('Type is not defined');
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(diff)}\n}`;
};

export default stylish;
