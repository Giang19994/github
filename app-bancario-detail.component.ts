import { OnDestroy } from '@angular/core';
import { ComuneData } from './../../../Models/comune-data';
import { ComuniResponse } from './../../model/Comuni/comuni-response';
import { Observable } from 'rxjs';
import { GetAppoggioBancariRequest } from './../../model/Comuni/get-appoggio-bancari-request';
import { Component, OnInit } from '@angular/core';
import { AppoggioBancariResponse } from '../../model/Comuni/appoggio-bancari-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ComuniService } from '../../servizi/Comuni/comuni.service';
import { Helpers } from 'src/app/Models/helpers';
import { Configuration, EnvConfigurationService, Environment } from '../../env-configuration.service';
import { Comuni } from '../../model/Comuni/comuni';

@Component({
  selector: 'app-app-bancario-detail',
  templateUrl: './app-bancario-detail.component.html',
  styleUrls: ['./app-bancario-detail.component.css']
})
export class AppBancarioDetailComponent implements OnInit,OnDestroy{

sub;codcomune;
codComune:any;
getappbancari: GetAppoggioBancariRequest;
getappbancariresp: AppoggioBancariResponse;
comuni:Comuni;

constructor(private _comuniservice:ComuniService,private router:Router,private _route:ActivatedRoute){


}
  ngOnInit() {
    debugger;
    this.sub=this._route.paramMap.subscribe(params => {

     this.codcomune = params.get('CodComune');
this.getappbancari.CodComune = this.codComune;
     let cod = this._comuniservice.GetAppoggioBancario(this.getappbancari);
     this.codComune = cod;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
