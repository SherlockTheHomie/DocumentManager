import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentlistComponent implements OnInit {

  documents: Observable<Document[]>;

  constructor(
    private documentsService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.documents = documentsService.documentsChanged.asObservable();
     }

  ngOnInit() {
    this.documentsService.getDocuments();
  }

  onAddDocument() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
