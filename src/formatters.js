import isPlainObject from 'lodash/isPlainObject.js';

export const stylish = (diff) => {
  const iter = (obj, depth = 1) => {
    const indentSize = 4;
    const baseIndent = ' '.repeat(indentSize * depth);
    const specialIndent = ' '.repeat(indentSize * depth - 2);

    const lines = Object.entries(obj).map(([key, value]) => {
      const hasSpecialSymbol = key.startsWith('+') || key.startsWith('-');

      if (isPlainObject(value)) {
        const indent = hasSpecialSymbol ? specialIndent : baseIndent;
        const nestedDiff = iter(value, depth + 1);
        return `${indent}${key}: {\n${nestedDiff}\n${baseIndent}}`;
      }
      if (hasSpecialSymbol) {
        return `${specialIndent}${key}: ${value}`;
      }

      return `${baseIndent}${key}: ${value}`;
    });

    return lines.join('\n');
  };

  return `{\n${iter(diff)}\n}`;
};

export const plain = () => '';
