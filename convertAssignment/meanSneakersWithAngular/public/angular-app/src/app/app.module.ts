import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SneakerListComponent } from './sneaker-list/sneaker-list.component';
import { SneakerDetailComponent } from './sneaker-detail/sneaker-detail.component';
import { SneakerEditComponent } from './sneaker-edit/sneaker-edit.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "sneakers",
    component: SneakerListComponent
  },
  {
    path: 'sneaker/:sneakerId', 
    component: SneakerDetailComponent 
  },
  {
    path: 'sneaker/edit/:sneakerId', 
    component: SneakerEditComponent 
  },
  {
    path: "**",
    component: NotFoundComponent
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SneakerListComponent,
    SneakerDetailComponent,
    SneakerEditComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
