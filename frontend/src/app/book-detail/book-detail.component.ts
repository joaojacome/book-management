import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';

import { BookService } from '../graphql/books/books.service';
import BookInterface from '../books/book.interface';
import { DecimalPipe } from '@angular/common';
import { ComponentsModule } from '../components/components';
import { FlashMessageService } from '../components/flash-message/flash-message.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [ DecimalPipe ]
})
export class BookDetailComponent implements OnInit {

  book: FormGroup;
  create: boolean = true;
  @Input() cb:string;
  valid = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private decimalPipe: DecimalPipe,
    private fb: FormBuilder,
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit() {
    this.book = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('',[Validators.maxLength(255)]),
      author: new FormControl('',[Validators.maxLength(255)]),
      price: new FormControl('', [Validators.required, Validators.max(10000), Validators.min(0.01)]),
    }, {updateOn: 'submit'});
    
    if (this.route.snapshot.paramMap.get('id')) {
      this.create = false;
    }
    this.loadBook();
  }


  loadBook():void {
    if (!this.create) {
      const id = + this.route.snapshot.paramMap.get('id');
      this.bookService.getBook(id).then((book) => {
        this.book.patchValue(book);
      });
    }
  }
  
  onSubmit({ value, valid }: { value: BookInterface, valid: boolean }) {
    if (valid) {
      this.valid=true;
      let action = null;
      let message = '';
      if (this.create) {
        action = this.bookService.addBook(value);
        message = 'Book added!';
      } else {
        action = this.bookService.updateBook(value);
        message = 'Book updated!';
      }
      action
        .then((success) => {
          //return to list, show message
          this.flashMessageService.success(message, true);
          this.router.navigate(['/books']);
        })
        .catch((error) => {
          //display message
          this.flashMessageService.error("An error occurred. Please, try again later.");
        });
    } else {
      this.valid=false;
      this.flashMessageService.clear();
      this.flashMessageService.error('Fill all the required fields.');
      this.processErrors();
    }
  }

  processErrors(): void {
    Object.keys(this.book.controls).forEach(field => {
      console.log("marcar");
      const control = this.book.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  cancel():void {
    this.flashMessageService.clear();
    this.router.navigate(['/books']);
  }

  public validateField(field: string) {
    const formField = this.book.get(field);
    return (formField.touched || formField.dirty) && formField.invalid;
  }

  public errorRequired(field: string) {
    const formField = this.book.get(field);
    return formField.errors.required;
  }
  
  public errorMaxLength(field: string) {
    const formField = this.book.get(field);
    return formField.errors.maxLength;
  }

  public errorMaxValue(field: string) {
    const formField = this.book.get(field);
    return formField.errors.max;
  }

  public errorMinValue(field: string) {
    const formField = this.book.get(field);
    return formField.errors.min;
  }
}
