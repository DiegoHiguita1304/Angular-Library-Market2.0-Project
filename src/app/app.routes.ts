import { RouterModule,Routes } from '@angular/router';
import { BookComponent } from './components/pages/book/book.component';
import {HomeComponent} from './pages/home/home.component'
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilteredBooksComponent } from './components/pages/book/filtered-books/filtered-books.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
// import { CategoriaComponent } from './categoria/categoria.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path:'book',
        component:BookComponent
    },
    { path: 'contact',
        component:ContactComponent
     },
     { path: 'login', 
        component: LoginComponent
     },
     { path: 'register', 
        component: RegisterComponent
     },
     {
        path: 'books/category/:category',
        component: FilteredBooksComponent
     },
     {
        path: 'shoppingCart',
        component: ShoppingCartComponent
     }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
