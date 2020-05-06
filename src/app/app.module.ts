import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './components/categories/category/category.component';
import { UsersComponent } from './components/users/users/users.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { LoginComponent } from './components/users/login/login.component';
import { CategoryCreatorComponent } from './components/categories/category-creator/category-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProfileComponent,
    HomeComponent,
    CatalogueComponent,
    SettingsComponent,
    CategoriesComponent,
    CategoryComponent,
    UsersComponent,
    SignInComponent,
    LoginComponent,
    CategoryCreatorComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }