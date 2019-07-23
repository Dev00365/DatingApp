import {Routes} from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-datail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_gaurds/member-edit.guard';


export const appRoute: Routes = [

    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
             { path: 'members', component: MemberListComponent,
             resolve: {users : MemberListResolver}},
             { path: 'members/:id' , component: MemberDetailComponent,
            resolve: {user : MemberDetailResolver}},
            {path : 'member/edit' , component: MemberEditComponent, resolve: { user : MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges]},
             { path: 'Lists', component: ListComponent},
             { path: 'messages', component: MessagesComponent},
        ]


    },

    { path: '**', redirectTo: '' , pathMatch: 'full' },
];
