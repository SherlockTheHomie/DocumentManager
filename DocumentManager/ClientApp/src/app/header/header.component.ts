import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DocumentService } from "../documents/documents.service";



@Component({
    selector: 'doc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private documentsService: DocumentService) {
        
    }

ngOnInit() {
    this.documentsService.getAllDocuments();
}

ngOnDestroy() {
    
  }

}