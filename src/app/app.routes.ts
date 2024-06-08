import { Routes } from '@angular/router';
import { BookComponent } from './components/pages/book/book.component';
import {HomeComponent} from './pages/home/home.component'

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path:'book',
        component:BookComponent
    }
];
