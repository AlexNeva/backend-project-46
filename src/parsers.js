import yaml from 'js-yaml';

export const getParser = (fileExtention) => {
  if (fileExtention === '.yml' || fileExtention === '.yaml') {
    return yaml.load;
  }
  return JSON.parse;
};
