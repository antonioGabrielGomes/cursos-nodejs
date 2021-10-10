import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { Routes } from '@angular/router';
import { ExtratoComponent } from "./extrato/extrato.component";
import { NovaTransferenciaCoponent } from "./nova-transferencia/nova-transferencia.component";

export const routes: Routes = [
    { path: '', redirectTo: 'extrato', pathMatch: 'full' },
    { path: 'extrato', component: ExtratoComponent },
    { path: 'nova-transferencia', component: NovaTransferenciaCoponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}