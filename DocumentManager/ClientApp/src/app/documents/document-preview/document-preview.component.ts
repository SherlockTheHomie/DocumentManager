import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';

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
  name: string;
  path: string;
  category: string;

  pdfSrc: string = "";
  docPath: string = "";



  
  

  constructor(
    private documentsService: DocumentService,
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.document = this.documentsService.getDocument(this.id);
        // this.document.name = this.document.name;
        // this.path = this.document.path;
        // this.category = this.document.category;
        // this.document.id = this.documentsService.getDocument(this.id);
        this.pdfSrc = 'https://localhost:7185/assets/' + this.document.path;
      }
    )
  }


  deleteDoc() {
    this.http
    .delete(
      'https://localhost:7185/api/docs/' + this.document.id
      ).subscribe(response => {
        console.log(response)
      })
    setTimeout(() => {
      this.documentsService.getAllDocuments();
      this.onBack();
    }, 2000);
  }

  // loadPreview(document: Document) {
  //   this.docPreviewSub = this.documentsService.documentsUpdate
  //   .subscribe(
  //     this.docPath = document.path;
  //     this.pdfSrc = 'https://localhost:7185/assets/' + this.docPath;
  //   )

  // }
  
  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy() {
  }
}
