import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: User;
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');
    afAuth.authState.subscribe(user => (console.log(user)));
  }

  addUser(user: User) {
    return this.userCollection.add(user);
  }
  
  editUser() { }
  getUser() { }
  getUsers() {
    return this.userCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  /**Cargar Usuario */
  loadStorageUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Metodo para terminar "sesión"
   */
  logOut() {
    this.user = null;
    localStorage.setItem("user", null);
  }

  removeUser() { }

  saveStorageUser(user: User) {
    this.user = user;
    /**Asignó a la variable una clave/valor */
    localStorage.setItem("user", JSON.stringify(user));
  }

  public async registerUser(email: string, password: string) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error on register", error);
    }
  }

}