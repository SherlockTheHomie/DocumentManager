import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocumentsComponent } from "./documents.component";
import { DocumentItemComponent } from "./document-item/document-item.component";
import { DocumentlistComponent } from "./document-list/document-list.component";
import { DocumentPreviewComponent } from "./document-preview/document-preview.component";
import { DocumentAddComponent } from './document-add/document-add.component';

import { DocumentsRoutingModule } from "./documents-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        DocumentsComponent,
        DocumentlistComponent,
        DocumentPreviewComponent,
        DocumentItemComponent,
        DocumentAddComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        DocumentsRoutingModule,
        CommonModule
    ], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentsModule { }
