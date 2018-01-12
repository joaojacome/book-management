import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  message: any;

  _show: boolean = false;

  constructor(private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.subscription = this.confirmDialogService.getMessage().subscribe((message) => {
        if (!message) {
            this.message = {};
            return;
        }
        this.message = message;
        this.show();
    });
  }

  cancel() {
    this.hide();
    this.message.onCancel();
  }
  confirm() {
    this.hide();
    this.message.onConfirm();
  }
  hide() {
    this._show = false;
  }
  show() {
    this._show = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
