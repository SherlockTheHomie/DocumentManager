import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentlistComponent implements OnInit, OnDestroy {



  documents: Document[];
  subscription: Subscription;


  constructor(
    private documentsService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.subscription = this.documentsService.documentsChanged
    .subscribe(
      (localDocuments: Document[]) => {
        this.documents = localDocuments;
        console.log(this.documents);
        console.log(localDocuments);
      }
    );
    this.documentsService.getDocuments();
  }

  onAddDocument() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    console.log("ARE YOU DESTROYING ME????????????")
  }
}
