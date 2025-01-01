import { it } from 'date-fns/locale';
import { format, isBefore, isWednesday, set } from 'date-fns';
import { FastifyReply, FastifyRequest } from "fastify";
import { EventService } from '../services/event';
import { EventEntity } from '../entities/event';

export function eventController(request:FastifyRequest, reply:FastifyReply) {

  const now = new Date();
  const date:string = format(now,'yyyy-MM-dd');
  const end:Date = set(now,{ hours: 23, minutes: 0, seconds: 0, milliseconds: 0 });

  if( ! isWednesday(now)){
    return reply.view('nothing');
  }

  const eventData:EventEntity = EventService.load(date);

  const query = request.query as { [ key:string ]:string };

  const viewData = {
    day: format(new Date(eventData.date),'EEEE',{ locale: it }),
    date: format(new Date(eventData.date),'dd-MM-yyyy'),
    event: eventData.event,
    subscribers: eventData.subscribers,
    open: ( isBefore(now,end) ),
    alert: query.alert || null,
    currentYear: new Date().getFullYear() 
  };

  return reply.view('event',viewData);

}
