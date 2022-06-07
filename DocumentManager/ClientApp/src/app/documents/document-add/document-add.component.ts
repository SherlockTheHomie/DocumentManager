import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../../shared/document.model';
import { DocumentService } from '../documents.service';
import { Subject, Subscription } from "rxjs";



@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit, OnDestroy {
  documentForm!: FormGroup;
  file: File | null = null;
 
  uploadProgress: number;
  statusMessage: String = "";
  uploadSub: Subscription = new Subscription;

  constructor(
    private http: HttpClient,
    private documentsService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

     }


    uploadFile = (file: any) => {
      if (!file) {
        return;
      }
      let fileToUpload = <File>file[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.http.post('https://localhost:7185/api/docs', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
          this.uploadProgress = Math.round(100 * event.loaded / event.total!);
          else if (event.type === HttpEventType.Response) {
          this.statusMessage = 'That Doc has been uploaded boi!!';
          this.documentsService.addDocument();
          this.onCancel();
      }
    },
    error: (err: HttpErrorResponse) => {
      return console.log(err);
    }
  });
}

  onCancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }

  ngOnDestroy() {
    console.log("ARE YOU DESTROYING ME????????????")
  }



}
