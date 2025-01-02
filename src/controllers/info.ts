import pkg from '../../package.json';
import getCurrentIP from '../helpers/getIP';

export function infoController() {
  return {
    version: pkg.version,
    name: pkg.name,
    title: pkg.title,
    description: pkg.description,
    owner: pkg.owner,
    authors: pkg.authors,
    host: getCurrentIP()
  };
}
