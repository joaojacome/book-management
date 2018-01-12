import { Injectable } from '@angular/core';
import BookInterface from '../../books/book.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import GetBooksQuery from './queries/getBooks';
import GetBookQuery from './queries/getBook';
import UpdateBookMutation from './mutations/updateBook';
import AddBookMutation from './mutations/addBook';
import DeleteBookMutation from './mutations/deleteBook';



@Injectable()
export class BookService {

  data: Observable<any>;
  
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:8080/0.0.1/books' }),
      cache: new InMemoryCache()
    });
  }

  public getBooks():Promise<BookInterface[]> {
    return new Promise((resolve, reject) => {
      this.apollo
        .watchQuery({
          query: GetBooksQuery,
          fetchPolicy: 'network-only'
        })
        .valueChanges
        .subscribe(({data}: any) => {
          resolve(data.getBooks);
        });
    });
  }

  public getBook(book_id: number):Promise<BookInterface> {
    return new Promise((resolve, reject) => {
      this.apollo
        .watchQuery({
          query: GetBookQuery,
          fetchPolicy: 'network-only',
          variables: {
            id: book_id
          }
        })
        .valueChanges
        .subscribe(({data}: any) => {
          resolve(data.getBook);
        });
    });
  }
  
  public updateBook(book: BookInterface):Promise<BookInterface> {
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: UpdateBookMutation,
          variables: book
        })
        .subscribe(({data}: any) => {
          resolve(data.updateBook);
        });
    });
  }

  public addBook(book: BookInterface):Promise<BookInterface> {
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: AddBookMutation,
          variables: book
        })
        .subscribe(({data}: any) => {
          resolve(data.updateBook);
        });
    });
  }

  public deleteBook(book: BookInterface):Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: DeleteBookMutation,
          variables: {
            id: book.id
          }
        })
        .subscribe(({data}: any) => {
          resolve(data.deleteBook);
        });
    });
  }
}
