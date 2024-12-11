import fs from 'node:fs';
import { EventEntity } from '../entities/event';


export class EventService {

  private static makePath(date:string):string {
    return 'datasets/' + date + '.json';
  }

  static load(date:string):EventEntity {
    let eventEntity:EventEntity|undefined;
    const file:string = EventService.makePath(date);
    if(fs.existsSync(file)) {
      try {
        const data:string = fs.readFileSync(file,'utf8');
        eventEntity = JSON.parse(data);
      } catch(err) {
        console.error('Error reading or parsing file:',file,err);
      }
    }
    if( ! eventEntity || eventEntity.date !== date) {
      eventEntity = {
        date: date,
        event: 'Pizzata',
        subscribers: []
      }
    }
    return eventEntity;
  }

  static store(eventEntity:EventEntity):void {
    const file:string = EventService.makePath(eventEntity.date);
    try {
      const data:string = JSON.stringify(eventEntity,null,2);
      fs.writeFileSync(file,data,'utf8');
    } catch(err) {
      console.error('Error writing file:',file,err);
    }
  }

}
