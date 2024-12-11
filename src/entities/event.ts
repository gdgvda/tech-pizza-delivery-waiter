export type EventEntity = {
  date: string;
  event: string;
  subscribers: EventSubscriberEntity[];
}

export type EventSubscriberEntity = {
  name: string;
  choose: string;
}

export type EventSubscribeRequest = {
  pin: string;
  name: string;
  choose: string;
}
