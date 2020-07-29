import { GlobalDataSummary } from './../models/global-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators"
import { RouterLinkWithHref } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globelDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-15-2020.csv"
  
  private dateWiseData = 'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
  constructor(private http: HttpClient) {}
    getDateWiseData(){
      return this.http.get( this.dateWiseData , {responseType : 'text'})
      
    }
    getGlobelData(){
     return this.http.get(this.globelDataUrl  , {responseType : 'text'}).pipe(map(result=>{
      let data : GlobalDataSummary[] = [];
      let raw = {};
      let rows =result.split('\n');
      rows.splice(0,1) 
      rows.forEach(row=>{
        
        let cols = row.split(/,(?=\S)/)
        let cs ={
          country : cols[3], 
          confirmed : +cols[7],
          deaths : +cols[8],
          recovered : +cols[9],
          active : +cols[10]
       };
       let temp : GlobalDataSummary = row[cs.country]
       //console.log(row);
       
       if(temp){
            temp.active= temp.active + cs.active ;
            temp.confirmed = temp.confirmed + cs.confirmed ;
            temp.deaths = temp.deaths + cs.deaths ;
            temp.recovered = temp.recovered + cs.recovered ;
          
            raw[cs.country]=temp ;
        }  
       else{
          raw[cs.country]=cs
       }      
      }) 
       
      return <GlobalDataSummary[]>Object.values(raw);

     }))
     }
}
