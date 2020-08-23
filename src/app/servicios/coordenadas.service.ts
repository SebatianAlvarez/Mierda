import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { coor } from '../_modals/coordenadas'

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {

  constructor(private firestore: AngularFirestore) { }

  listar(){    
    return this.firestore.collection<coor>('coordenadas').valueChanges();
  }
  
  registrar(cordenadas: any) {
    return this.firestore.collection('coordenadas').add(cordenadas);
  }  
   
  leer(documentId: string) {
    return this.firestore.collection<coor>('coordenadas').doc(documentId).valueChanges();
  }
    
  actualizar(cordenadas: coor) {
    return this.firestore.collection('coordenadas').doc(cordenadas.id).set(cordenadas);
  }

  eliminar(cordenadas: coor){
    return this.firestore.collection('coordenadas').doc(cordenadas.id).delete();    
  }
}
