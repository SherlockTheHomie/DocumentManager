import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { Subscription } from 'rxjs';

import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit, OnDestroy {
  document: Document;
  id: number;
  pdfSource = "";


  
  

  constructor(
    private documentsService: DocumentService, 
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentsService.getDocument(this.id - 1);
        }
      )
  }


  deleteDoc() {
    this.http
    .delete(
      'https://localhost:7185/api/docs/' + this.id
      )
      .subscribe(response => {
        console.log(response)
      });
    this.router.navigate(['/documents'])
  }

  ngOnDestroy() {
  }
}
