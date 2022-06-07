import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { DocumentsComponent } from './documents.component';


const routes: Routes = [
    {
        path: '',
        component: DocumentsComponent,
        children: [
            { path: 'new', component: DocumentAddComponent},
            { path: ':id', component: DocumentPreviewComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocumentsRoutingModule { }