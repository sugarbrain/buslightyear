import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './frames/user/user.component';
import { SupervisorComponent } from './frames/supervisor/supervisor.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'supervisor', component: SupervisorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
