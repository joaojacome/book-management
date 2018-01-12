import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FlashMessageService } from '../components/flash-message/flash-message.service';
import { ConfirmDialogService } from '../components/confirm-dialog/confirm-dialog.service';

import { BookService } from '../graphql/books/books.service';
import BookInterface from './book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  private books:BookInterface[] = [];
  constructor(
    private route: ActivatedRoute,
    private bookService:BookService,
    private flashMessageService: FlashMessageService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().then((books) => {
      this.books = books;
    });
  }

  deleteBook(book: BookInterface) {
    this.confirmDialogService.display('Confirm delete?', `Are you sure you want to remove the book '${book.title}'?`, () => {
      this.bookService.deleteBook(book)
        .then((result) => {
          this.flashMessageService.clear();
          this.flashMessageService.success("Book removed!");
          this.loadBooks();
        })
        .catch((error) => {
          this.flashMessageService.error("An error occurred while removing the book. Please, try again later.");
        });
    },() => {})
  }
}
