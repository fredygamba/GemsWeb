import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Icon } from 'src/app/entities/Icon';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private iconCollection: AngularFirestoreCollection<Icon>;

  constructor(private firestore: AngularFirestore) { 
    this.iconCollection = firestore.collection<Icon>('icons');
  }

  addIcon(icon: Icon) {
    return this.iconCollection.add(icon);
  }

  editIcon(id: string, icon: Icon) {
    return this.iconCollection.doc(id).update(icon);
  }

  getIcon(id: string) {
    return this.iconCollection.doc<Icon>(id).valueChanges();
  }

  getIcons() {
    return this.iconCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  removeIcon(id: string) {
    return this.iconCollection.doc(id).delete();
  }
}
