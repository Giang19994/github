import { DxDataGridModule, DxTooltipModule, DxLoadPanelModule, DxFileUploaderModule, DxButtonModule, DxTreeMapModule, DxTabPanelModule, DxTemplateModule, DxTemplateHost, DxDropDownBoxModule, DxFormModule } from 'devextreme-angular';
import { UploadCsvComponent } from './../Components/upload-csv/upload-csv.component';
import { HttpClientModule } from '@angular/common/http';
import { AnagraficaclientiService } from './servizi/Anagraficaclienti/anagraficaclienti.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestioneanagraficaRoutingModule } from './gestioneanagrafica-routing.module';
import { DistributoriComponent } from './componenti/distributori/distributori.component';
import { RegioniComponent } from './componenti/regioni/regioni.component';
import { AziendeComponent } from './componenti/aziende/aziende.component';
import { ProvinceComponent } from './componenti/province/province.component';
import { ComuniComponent } from './componenti/comuni/comuni.component';
import { AnagraficaclientiComponent } from './componenti/anagraficaclienti/anagraficaclienti.component';
import { RegioniService } from './servizi/Regioni/regioni.service';
import { ComuniService } from './servizi/Comuni/comuni.service';
import { DistributoriService } from './servizi/Distributori/distributori.service';
import { AziendeService } from './servizi/Aziende/aziende.service';
import { ProvinceService } from './servizi/Province/province.service';
import {  DxoPagingModule, DxoPagerModule, DxoEditingModule, DxiButtonModule, DxiColumnModule, DxiGroupItemModule,
   DxiValidationRuleModule, DxoExportModule, DxoFilterRowModule, DxoFormModule, DxoGroupingModule, DxoGroupPanelModule
   , DxoPopupModule, DxoSearchPanelModule, DxoSummaryModule, DxoTextsModule, DxoTooltipModule, DxiItemModule, DxoGroupModule, DxoLoadPanelModule, DxoLoadPanelComponent, DxoSearchPanelComponent } from 'devextreme-angular/ui/nested';
import { RouterModule } from '@angular/router';
import { TryComponent } from './componenti/try/try.component';
import { AppBancarioDetailComponent } from './componenti/app-bancario-detail/app-bancario-detail.component';


@NgModule({
  declarations: [
    DistributoriComponent,
    UploadCsvComponent,
    RegioniComponent,
    AziendeComponent,
    ProvinceComponent,
    ComuniComponent,
    AnagraficaclientiComponent,
    TryComponent,
    AppBancarioDetailComponent,
  ],
  imports: [
    CommonModule,
    GestioneanagraficaRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxoPagingModule,
    DxoPagerModule,
    DxoEditingModule,
    DxoTextsModule,
    DxoFormModule,
    DxTabPanelModule,
    DxDropDownBoxModule,
    DxoPopupModule,
    DxoFilterRowModule,
    DxoSearchPanelModule,
    DxFormModule,
    DxiColumnModule,
    DxoTooltipModule,
    DxoGroupingModule,
    DxoLoadPanelModule,
    DxTreeMapModule,
    DxiItemModule,
    DxoGroupPanelModule,
    DxButtonModule,
    DxiButtonModule,
    DxoSearchPanelModule,
    DxoGroupPanelModule,
    DxiValidationRuleModule,
    DxoExportModule,
    DxoSummaryModule,
    DxiGroupItemModule,
    DxTooltipModule,
    DxLoadPanelModule,
    DxFileUploaderModule,
    RouterModule.forChild([
    {
      path: "GestioneAnagrafica/Comuni", component: ComuniComponent
    },
    {
      path: "GestioneAnagrafica/Comuni/:CodComune", component: AppBancarioDetailComponent,
    },
    {
      path: "GestioneAnagrafica/Aziende", component: AziendeComponent, pathMatch: "full"
    },
    {
      path: "GestioneAnagrafica/Distributori", component: DistributoriComponent, pathMatch: "full"
    },
    {
      path: "GestioneAnagrafica/Province", component: ProvinceComponent, pathMatch: "full"
    },
    {
      path: "GestioneAnagrafica/Regioni", component: RegioniComponent, pathMatch: "full"
    },
    {
      path: "GestioneAnagrafica/Anagraficaclienti", component: AnagraficaclientiComponent, pathMatch: "full"
    },
    {
      path: "GestioneAnagrafica/Try", component: TryComponent, pathMatch: "full"
    }
  ]),
],
  providers:[

    RegioniService,
    ComuniService,
    DistributoriService,
    AziendeService,
    ProvinceService,
    AnagraficaclientiService,

  ]

})
export class GestioneanagraficaModule { }
