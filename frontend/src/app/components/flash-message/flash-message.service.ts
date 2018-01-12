import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessage, FlashMessageType } from './flash-message.interface';
import { NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlashMessageService {

  private subject = new Subject<FlashMessage>();

  private keepAfterRouteChange = false;
 
  constructor(private router: Router) {
    // clear messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
                this.keepAfterRouteChange = false;
            } else {
                this.clear();
            }
        }
    });
  }
  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.message(FlashMessageType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.message(FlashMessageType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.message(FlashMessageType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.message(FlashMessageType.Warning, message, keepAfterRouteChange);
  }

  messages: FlashMessage[] = [];
  message(type: FlashMessageType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    if (keepAfterRouteChange) {
      this.messages.push(<FlashMessage>{ type: type, message: message });
    } else {
      this.subject.next(<FlashMessage>{ type: type, message: message });

    }
  
  }

  clear() {
      this.messages = [];
      this.subject.next();
  }

}
