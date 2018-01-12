import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { FlashMessageService } from './flash-message.service';
import { FlashMessage, FlashMessageType } from './flash-message.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() type: 'error' | 'success';

  typeMap = {
    'error': 'is-danger',
    'success': 'is-success',
  };
  messages: FlashMessage[] = [];
  subscription: Subscription;

  _show: boolean;

  constructor(private flashMessageService: FlashMessageService) {
  }

  ngOnInit() {
    this.messages = this.flashMessageService.messages;
    this.subscription = this.flashMessageService.getMessage().subscribe((message: FlashMessage) => {
      if (!message) {
        this.messages = [];
        return;
      }
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  removeMessage(message: FlashMessage) {
    this.messages = this.messages.filter(x => x !== message);
  }
  
  cssClass(message: FlashMessage) {
    if (!message) {
      return;
    }
    switch (message.type) {
      case FlashMessageType.Success:
        return 'is-success';
      case FlashMessageType.Error:
        return 'is-danger';
      case FlashMessageType.Info:
        return 'is-info';
      case FlashMessageType.Warning:
        return 'is-warning';
    }
  }
}
