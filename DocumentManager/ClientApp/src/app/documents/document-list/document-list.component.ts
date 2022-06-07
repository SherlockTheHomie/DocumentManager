import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentlistComponent implements OnInit, OnDestroy {


  documents!: Document[];
  subscription: Subscription = new Subscription;

  constructor(
    private documentsService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.subscription = this.documentsService.documentsUpdate
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
      this.documents = this.documentsService.getDocuments();
  }

  onAddDocument() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    console.log("ARE YOU DESTROYING ME????????????")
    this.subscription.unsubscribe();
  }
}
