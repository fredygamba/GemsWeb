import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Category } from 'src/app/entities/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private firestore: AngularFirestore) {
    this.categoriesCollection = firestore.collection<Category>('categories', ref => ref.orderBy("name"));
  }

  addCategory(category: Category) {
    return this.categoriesCollection.add(category);
  }

  editCategory(id: string, category: Category) {
    return this.categoriesCollection.doc(id).update(category);
  }

  getCategory(id: string) {
    return this.categoriesCollection.doc<Category>(id).valueChanges();
  }

  getCategories() {
    return this.categoriesCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  removeCategory(id: string) {
    return this.categoriesCollection.doc(id).delete();
  }
  
}