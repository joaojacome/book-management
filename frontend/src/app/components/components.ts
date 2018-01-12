import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageService } from './flash-message/flash-message.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FlashMessageComponent,
    ConfirmDialogComponent
  ],
  exports: [
    FlashMessageComponent,
    ConfirmDialogComponent
  ],
  providers: [
    FlashMessageService,
    ConfirmDialogService
  ]
})
export class ComponentsModule { }