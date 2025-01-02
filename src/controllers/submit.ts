import { format, isAfter, isWednesday, set } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';
import { EventService } from '../services/event';
import { EventEntity, EventSubscribeRequest } from '../entities/event';

export function submitController(request:FastifyRequest, reply:FastifyReply) {

  const now = new Date();
  const date:string = format(now,'yyyy-MM-dd');
  const end:Date = set(now,{ hours: 18, minutes: 0, seconds: 0, milliseconds: 0 });
  const pin:string = format(now,'yyyyMMdd');
  const requestData:EventSubscribeRequest = request.body as EventSubscribeRequest;

  if( !isWednesday(now) || isAfter(now,end)){  // @todo fare service per evitare di avere tutto in due posti
    return reply.redirect('/event?alert=ISCRIZIONI%20CHIUSE..');
  }

  if(requestData.pin !== pin){
    return reply.redirect('/event?alert=PIN%20ERRATO!');
  }

  if( ! requestData.name || ! requestData.choose){
    return reply.redirect('/event?alert=COMPILA%20TUTTI%20I%20CAMPI!');
  }

  const eventData:EventEntity = EventService.load(date);

  eventData.subscribers.push({
    name: requestData.name,
    choose: requestData.choose
  });

  console.log('event data:',eventData);
  EventService.store(eventData);

  return reply.redirect('/event?thankyou=GRAZIE%20PER%20ESSERTI%20ISCRITTO!');

}
