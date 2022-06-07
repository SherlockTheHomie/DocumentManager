import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DocumentService } from "./documents/documents.service";




@NgModule({
    providers: [
        DocumentService,
        
    ]
})

export class CoreModule {}
