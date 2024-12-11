import pkg from '../../package.json';
import ip from "ip";

export function infoController() {
  return {
    version: pkg.version,
    name: pkg.name,
    title: pkg.title,
    description: pkg.description,
    owner: pkg.owner,
    authors: pkg.authors,
    host: ip.address()
  };
}
