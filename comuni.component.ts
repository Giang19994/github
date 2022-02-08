import { ComuniResponse } from './../../model/Comuni/comuni-response';
import { Province } from './../../model/Province/province';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxFileUploaderComponent } from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested';
import { locale } from 'devextreme/localization';
import { Helpers } from 'src/app/Models/helpers';
import { WindowWrapper } from 'src/app/Services/WindowWrapperService';
import { Configuration, EnvConfigurationService, Environment } from '../../env-configuration.service';


import { AddComuniRequest } from '../../Model/Comuni/add-comuni-request';

import { DeleteComuniRequest } from '../../model/Comuni/delete-comuni-request';
import { EditComuniRequest } from '../../model/Comuni/edit-comuni-request';
import { AppoggiBancari, ComuniService, Indirizzi, Servizio} from '../../servizi/Comuni/comuni.service';
import { Comuni } from '../../model/Comuni/comuni';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comuni',
  templateUrl: './comuni.component.html',
  styleUrls: ['./comuni.component.css']
})
export class ComuniComponent implements AfterViewInit{

  public Environment: Environment;

  nextColumn: any;
  comune : Comuni;

  indirizzi: Indirizzi[];
  appoggibancari: AppoggiBancari[];
  servizi : Servizio[];
  editMode: boolean = true;
  public comuniResponse: ComuniResponse[];
  itemVisible : boolean = true;
  comuneDataResponse :ComuniResponse;
  @ViewChild('ComuniResponseDataGrid', { static: false })
  ComuniResponseDataGrid: DxDataGridComponent;
  _gridIndirizziValue:number;
  _gridAppBancariValue:number;

  events: Array<string> = [];


  get gridAppBancariValue(): number {
    return this._gridAppBancariValue;
}
set gridAppBancariValue(value: number) {
    this._gridAppBancariValue = value;
}




  get gridBoxValue(): number {
    return this._gridIndirizziValue;
}
set gridBoxValue(value: number) {
    this._gridIndirizziValue = value;
}

  constructor(private envConfigurationService: EnvConfigurationService,
    private _comuniService: ComuniService,private _route :Router,private _activateroute: ActivatedRoute,
  ) {
    this.servizi = _comuniService.getServizi();
    console.log("servizi",this.servizi);
    this.appoggibancari= _comuniService.getAppoggioBancario();
    this.indirizzi = _comuniService.getIndirizzi();
    console.log("indirizzi",this.indirizzi);
    console.log("valore del copia EnvironmentSerivice");
    console.log(this.envConfigurationService);
    this.envConfigurationService.load().subscribe(x => {
      let result = x as Configuration;
      console.log('result',result);
      this.Environment = result.environementData as Environment;
      console.log('Environment',this.Environment);
    });



    locale(navigator.language || 'it');

  }


  loadDataFromServer(): void {

      this.LoadData( );
      }
  LoadData()
  {
    debugger;
    if(this.Environment ){
       this._comuniService.GetAllComuni()
          .subscribe
             ((result:ComuniResponse[]) =>
               {
                this.comuniResponse = result;
                Helpers.WriteToLog(this.Environment,"Controllo se ci sono dati in DB",this.comuniResponse);
                this.ComuniResponseDataGrid.instance.endCustomLoading();
                Helpers.WriteToLog(this.Environment,"data from server load with success..",this.comuniResponse);
               },
              (error) => console.log(error));

                        }else{
      console.log('non e pieno');
      this.envConfigurationService.load().subscribe(x => {
      let result = x as Configuration;
      console.log('result',result);
      this.Environment = result.environementData as Environment;
      console.log('Environment',this.Environment);
      this._comuniService.GetAllComuni()
      .subscribe(
         (result) => {
            console.log("result result=>", result);
            this.comuniResponse = result;
            Helpers.WriteToLog(this.Environment,"Controllo se ci sono dati in DB");
            this.ComuniResponseDataGrid.instance.endCustomLoading();
            Helpers.WriteToLog(this.Environment,"data from server load with success..",this.comuniResponse);
                     },
      (error) => console.log(error)
    );
});
   }
  }
  ngAfterViewInit(): void {
    this.ComuniResponseDataGrid.instance.beginCustomLoading(
      'Caricamento...'
    );
    console.log(this.Environment);
 //  Helpers.WriteToLog(this.Environment,'inside ngAfterViewInit');
    this.loadDataFromServer();
   // this.IsEnableCrudOperation();
  }


  showAllPagerGrid(e) {
    Helpers.showAllPagerGrid(e);
  }



  onInitNewRow(e: any) {

    this.itemVisible = true;
  }

  logEvent(eventName) {
    this.events.unshift(eventName);
  }

  onRowInserting(e) {

    Helpers.WriteToLog(this.Environment,'Dati da salvare in db onRowInserting',JSON.stringify(e.data));
    const comuneToBeAdd = Object.assign(e.data) as AddComuniRequest;

    // const utfEeQuadroAToBeAdd = e.data as AddUtfEeQuadroARequest;
    Helpers.WriteToLog(this.Environment,'dati da salvare in db castato onRowInserting',comuneToBeAdd);
    this._comuniService.AddComuni(comuneToBeAdd).subscribe(
      (result) => {
        this.comuneDataResponse = result;
        this.loadDataFromServer();
        Helpers.WriteToLog(this.Environment,'data added from Server',this.comuneDataResponse);
        e.cancel = false;
      },
      (error) =>
      Helpers.WriteToLog(this.Environment,"Errore",error)
      );
  }


  onRowUpdating(e) {
    Helpers.WriteToLog(this.Environment,'Dati da salvare in db onRowInserting',JSON.stringify(e.data));
    const comuneToBeUpdate = Object.assign(e.data) as EditComuniRequest;


    Helpers.WriteToLog(this.Environment,'dati da salvare in db castato onRowInserting',comuneToBeUpdate);
    this._comuniService.EditComunis(comuneToBeUpdate).subscribe(
      (result) => {
        this.comuneDataResponse = result;
        this.loadDataFromServer();
        Helpers.WriteToLog(this.Environment,'data added from Server',this.comuneDataResponse);
        e.cancel = false;
      },
      (error) =>
      Helpers.WriteToLog(this.Environment,"Errore",error)
      );
  }


goToLink(Cod:Comuni){
  debugger;

this._route.navigate(["GestioneAnagrafica/Comuni",Cod.CodComune])
console.log('verifica');
}

onRowRemoving(e){
  Helpers.WriteToLog(this.Environment,'Dati da salvare in db onRowInserting',JSON.stringify(e.data));
  const comuneToBeDelete = Object.assign(e.data) as DeleteComuniRequest;


  Helpers.WriteToLog(this.Environment,'dati da salvare in db castato onRowInserting',comuneToBeDelete);
  this._comuniService.DeleteComunis(comuneToBeDelete).subscribe(
    (result) => {
      this.comuneDataResponse= result;
      this.loadDataFromServer();
      Helpers.WriteToLog(this.Environment,'data added from Server',this.comuneDataResponse);
      e.cancel = false;
    },
    (error) =>
    Helpers.WriteToLog(this.Environment,"Errore",error)
    );
}

infoText(page: string, totPage: string, elements: string) {
  if (page !== undefined) {
    return Helpers.stampaTotaleTabella(page, totPage, elements);
  }
}






  onRowRemoved(e){
  this.refreshDataGrid(
    'Griglia refresh correttamente onRowInserted JPPPP',
    'error durante il refresh della griglia onRowInserted'
    );
  }


  onRowInserted(e) {

    this.refreshDataGrid(
      'Griglia refresh correttamente onRowInserted JPPPP',
      'error durante il refresh della griglia onRowInserted'
    );
  }

  onRowUpdated(e){

    this.refreshDataGrid(
      'Griglia refresh correttamente onRowInserted JPPPP',
      'error durante il refresh della griglia onRowInserted'
    );
  }





  refreshDataGrid=(successMessage: string, errorMessage: string) =>{
    this.ComuniResponseDataGrid.instance.refresh() // getDataSource

      .then(function () {

      })
      .catch(function (error) {

        console.log(error);
      });
  }

}


