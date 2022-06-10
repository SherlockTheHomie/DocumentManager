import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../../shared/document.model';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit, OnDestroy {
  uploadProgress: number;
  statusMessage: String = "";
  file: File | null = null;
  fileName: string = "";
  // files: FileList | null = null;
  
  uploadSub = new Subscription;

  constructor(
    private http: HttpClient,
    private documentsService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.statusMessage = 'Are you trying to upload some Docs bro? Noice!';
     }


    uploadFile(newFile: File) {
      console.log("IS THIS THING ON???");
      let file = new FormData();
      file.append('file', newFile, newFile.name);
      console.log("SEND IT BOIIIIII!!");
      this.http.post('https://localhost:7185/api/docs/new', file, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total!);
          this.statusMessage = 'Wait for it... WAIT FOR IT';
          } else if (event.type === HttpEventType.Response) {
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
