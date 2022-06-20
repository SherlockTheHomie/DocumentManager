import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../documents/documents.service";

@Component({
    selector: 'doc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

constructor(private documentsService: DocumentService) {

}

ngOnInit() {
    this.documentsService.getAllDocuments();
}

}