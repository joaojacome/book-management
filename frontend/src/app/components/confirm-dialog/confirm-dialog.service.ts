import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfirmDialogService {

  private subject = new Subject();

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  display(title, contents, onConfirm, onCancel) {
      this.subject.next({ title: title, contents: contents, onConfirm: onConfirm, onCancel: onCancel });
  }
  clear() {
    this.subject.next();
  }
}
