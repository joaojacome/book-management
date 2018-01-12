import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './graphql/books/books.service';
import { AppRoutingModule } from './/app-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ComponentsModule } from './components/components';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'books/add', component: BookDetailComponent },
  { path: 'books/:id', component: BookDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ComponentsModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({ uri: 'http://localhost:3000/books' }),
      cache: new InMemoryCache()
    });
  }*/
}
