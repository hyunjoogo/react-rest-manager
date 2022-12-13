import * as EventBus from './EventBus';

class EventBusHelper {
  constructor() {
    this.subscriptionList = [];
  }

  isEmpty() {
    return this.subscriptionList.length === 0;
  }

  publish = (eventType, arg) => {
    EventBus.publish(eventType, arg);
  };

  addListener = (eventType, callback) => {
    this.subscriptionList.push(EventBus.subscribe(eventType, callback));
  };

  removeAllListeners = () => {
    for (let subscription of this.subscriptionList) {
      subscription.remove();
    }
  };
}

export function createEventBusHelper() {
  return new EventBusHelper();
}
