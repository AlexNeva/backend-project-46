import yaml from 'js-yaml';

const mapping = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const getParser = (type) => mapping[type];

export default getParser;
