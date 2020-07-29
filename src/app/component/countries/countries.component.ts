import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
@Component({  
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  dataGlobal : GlobalDataSummary[];
  countries : string[] = [];
  totalConfirmed=0;
  totalRecovered=0;
  totalDeaths=0;
  totalActive=0;
 
  constructor(private data_sirvice : DataServiceService) { }

  ngOnInit() {
    this.data_sirvice.getDateWiseData().subscribe(result=>{
      console.log(result);
      
    }) 
 
    this.data_sirvice.getGlobelData().subscribe(
      result =>{
        this.dataGlobal = result;
        this.dataGlobal.forEach(cs =>{
          this.countries.push (cs.country);
        })
      }
    )

  }
  updateValues(country){
    ///console.log(country)
    //console.log(this.dataGlobal);
     this.dataGlobal.forEach(
        cs => {
          
           
           if(cs.country == country)
                 {
                   this.totalConfirmed = cs.confirmed;
                   this.totalActive = cs.active;
                   this.totalDeaths = cs.deaths;
                   this.totalRecovered = cs.recovered;
                 }

               }


     )
  }

}
