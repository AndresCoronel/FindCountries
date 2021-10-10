import {Component, OnInit} from '@angular/core';
import {ServiceService} from "./_services/service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  listCountries: any[] = [];
  listCountriesInitial: any[] = [];
  listCountriesBusqueda: any[] = [];
  viewDetail = false;
  country: any;
  textSearch: any;
  optionSearch: any;

  tittles = ['Americas', 'Europe', 'Africa', 'Asia', 'Oceania' ]
  constructor( private service: ServiceService) {
  }
  title = 'Prueba Qrvey';

  ngOnInit() {
    this.service.getData().subscribe(res => {
      res.sort( function( a: any, b: any ) {
      return a.name.common > b.name.common ? 1 : -1;
    } );
      res.map((a: any) => {
        a.favorite = false;
      } )

      this.tittles = this.tittles.sort( function( a, b ) {
        return a > b ? 1 : -1;
      } );
      this.listCountries = res;
      this.listCountriesInitial = this.listCountries;

    })
  }

  search() {
    this.listCountries = this.listCountriesInitial;
    const busqueda = this.textSearch;
    const campo = this.optionSearch;
    if (campo){
      this.listCountries = this.listCountries.filter( x => campo === 'FAV' ? x.favorite : x.region === campo )
    }
    if ( busqueda ) {
        this.listCountries = this.listCountries.filter( (x: any) => x.name.common.toLowerCase().startsWith(busqueda.toLowerCase()) );
    }
  }

  filter (region?: string): any[] {
      return this.listCountries.filter( (x: any) => x.region === region );
  }

  viewDetailModal(country: any) {
    this.viewDetail = true;
    this.country = country;
  }

  favorite (){
    this.country.favorite = this.country.favorite ? false : !this.country.favorite;
  }
}
