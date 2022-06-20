import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit, OnDestroy {
  document: Document;
  path: string;

  pdfSrc: string = "";
  docPath: string = "";

  constructor(
    private documentsService: DocumentService,
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        let id = +params['id'];
        this.document = this.documentsService.getDocument(id);
        this.pdfSrc = 'https://localhost:7185/assets/' + this.document.path;
      }
    )
  }

  deleteDoc() {
    this.documentsService.removeDocument(this.document.id)
    setTimeout(() => {
      this.documentsService.getAllDocuments();
      this.onBack();
    }, 1000);
  }
  
  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy() {
  }
}
