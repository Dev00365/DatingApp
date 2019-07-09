import {Routes} from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';


export const appRoute: Routes = [

    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
             { path: 'members', component: MemberListComponent},
             { path: 'Lists', component: ListComponent},
             { path: 'messages', component: MessagesComponent},
        ]


    },

    { path: '**', redirectTo: '' , pathMatch: 'full' },
];
