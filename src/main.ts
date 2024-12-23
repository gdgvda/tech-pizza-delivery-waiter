import "dotenv/config";
import path from "path";
import mime from 'mime-types';
import handlebars from 'handlebars';
import view from '@fastify/view';
import AutoLoad from "@fastify/autoload";
import staticPlugin from '@fastify/static';
import fastifyFormBody from '@fastify/formbody';
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

const fastify:FastifyInstance = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  serializers: {
    res(reply:FastifyReply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(req:FastifyRequest) {
      return {
        method: req.method,
        url: req.url,
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.socket.remotePort,
        headers: req.headers,
      };
    },
  },
});

fastify.register(fastifyFormBody);

fastify.register(staticPlugin,{
  prefix: '/',
  root: path.join(__dirname,'../static'),
  serveDotFiles: false,
  decorateReply: false,
  cacheControl: true,
  setHeaders:(response,pathName:string):void => {
    const contentType:string|false = mime.lookup(pathName);
    if(contentType){ response.setHeader('Content-Type',contentType); }
  }
});
console.log(path.join(__dirname,'views'));

fastify.register(view,{
  engine: { handlebars },
  root: path.join(__dirname,'views'),
  layout: 'layout.hbs',
  options: {
    partials: {
      header: 'partials/header.hbs',
      footer: 'partials/footer.hbs'
    }
  }
});

fastify.register(AutoLoad,{
  dir: path.join(__dirname,"routes")
});

fastify
  .listen({
    host: process.env.HOST as unknown as string,
    port: process.env.PORT as unknown as number,
  })
  .then(async ():Promise<void> => {
    console.log('.env port:',process.env.PORT);
  })
  .catch((error:Error):void => {
    console.log(error);
  });
