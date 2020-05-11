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
    this.categoriesCollection = firestore.collection<Category>('categories');
  }
  /**
   * Metodo para agregar una categoria a firebase
   * @param category 
   */
  addCategory(category: Category) {
    return this.categoriesCollection.add(category);
  }
  
  /**
   * Metodo para editar una categoriay actualizar los datos en firebase
   * @param id 
   * @param category 
   */
  editCategory(id: string, category: Category) {
    return this.categoriesCollection.doc(id).update(category);
  }

  /**
   * Metodo para obtener una categoria especificada por un identificador
   * @param id 
   */
  getCategory(id: string) {
    return this.categoriesCollection.doc<Category>(id).valueChanges();
  }

  /**
   * Metodo para obtener todas las categorias
   */
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
  /**
   * Metodo para eliminar una categoria por el identificador
   * @param id 
   */
  removeCategory(id: string) {
    return this.categoriesCollection.doc(id).delete();
  }
  
}