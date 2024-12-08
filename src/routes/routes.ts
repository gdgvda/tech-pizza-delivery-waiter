import ip from 'ip';
import pkg from '../../package.json';
import { FastifyInstance } from 'fastify';

module.exports = async function (fastify:FastifyInstance) {
  fastify.get('/',async(request,reply) => {
    const data = { name: 'World' };
    return reply.view('/hello-world',data);
  });

  fastify.get('/info',async(request,reply) => {
    return {
      version: pkg.version,
      name: pkg.name,
      title: pkg.title,
      description: pkg.description,
      owner: pkg.owner,
      authors: pkg.authors,
      host: ip.address()
    }
  });

}
