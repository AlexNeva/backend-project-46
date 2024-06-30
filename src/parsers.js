import yaml from 'js-yaml';

const getParser = (fileExtention) => {
  if (fileExtention === '.yml' || fileExtention === '.yaml') {
    return yaml.load;
  }
  return JSON.parse;
};

export default getParser;
