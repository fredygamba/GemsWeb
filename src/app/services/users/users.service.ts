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
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore) {
    this.usersCollection = firestore.collection<User>('users');
  }

  addUser(user: User) {
    var outUser: User = { firstName: user.firstName, lastName: user.lastName, email: user.email };
    return this.firestore.collection('users').doc(user.id).set(outUser);
  }

  editUser() { }


  getUser(id: string): any {
    return this.usersCollection.doc<User>(id).valueChanges();
  }

  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(map(
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
   * 
   * @param email 
   * @param password 
   * @returns Promise<User>
   */
  public login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(fbUser => {
          this.getUser(fbUser.user.uid).subscribe(user => {
            this.user = user;
            resolve(this.user);
          }, error => {
            reject(error)
          });
        }).catch(authError => {
          reject(authError);
        });
      });
    });
  }

  /**
   * Metodo para terminar "sesión"
   */
  logout() {
    this.user = null;
    localStorage.setItem("user", null);
    this.firebaseAuth.auth.signOut();
  }
  // Estaba vacio
  removeUser(id: string) {
    return this.usersCollection.doc(id).delete();
   }

  saveUserInStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  public async registerUser(email: string, password: string) {
    return await this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

}