import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CoordenadasService } from '../servicios/coordenadas.service';
import { coor } from '../_modals/coordenadas';
import { AngularFirestore} from '@angular/fire/firestore';

import 'leaflet';
import 'leaflet-routing-machine';
import { GestureHandling } from "leaflet-gesture-handling";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map
  marker: any;


  constructor(private coordenadasService : CoordenadasService, private db: AngularFirestore) { }

  ngAfterViewInit(): void {

    this.map = L.map('map', {
      center: [ -0.2104022, -78.4910514 ],
      zoom: 100
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

tiles.addTo(this.map);

//this.marker = L.marker([-0.2104022, -78.4910514], {draggable:true});
//    this.marker.addTo(this.map).bindPopup('Estoy aqui');

  }

  marcador(lat : number, lng : number){
    this.marker = L.marker([lat, lng], {draggable:true});
    this.marker.addTo(this.map).bindPopup('Estoy aqui');

    this.marker.on('drag', () =>{
      console.log("aver " + this.marker.getLatLng())
      
      //for(let x of this.cor.coordenadas){
      //  console.log("sera " + x[0])
      //}
      //this.coordenadasService.registrar(this.cor.coordenadas);
      
      })

      /*

      let searchControl = L.esri.Geocoding.geosearch().addTo(this.map);
      let results = L.layerGroup().addTo(this.map);

      searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
      });
      */

    
  }

  registrar(){
    this.marcador(-0.2104022, -78.4910514 )
  }

  prueba(){

    let cords = new coor();

    let x = this.marker.getLatLng()
    
    return new Promise<any>((resolve, reject) =>{

      let coordeanadaID = this.db.createId();
      cords.id = coordeanadaID;
      this.db.collection('coordenadas').doc(coordeanadaID).set({
        id : cords.id,
        latitud : x.lat,
        longitud : x.lng
      }).then((res) => {
        resolve(res)
      }).catch(err => reject (err))
    })

  }


}
