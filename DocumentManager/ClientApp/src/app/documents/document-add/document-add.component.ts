import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit, OnDestroy {
  uploadProgress: number;
  statusMessage: String = "";
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  
  uploadSub = new Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentsService: DocumentService,) {
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1000000 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>(); 
     }

  ngOnInit() {
    this.statusMessage = 'Are you trying to upload some Docs bro? Noice!';
     }

     onUploadOutput(output: UploadOutput): void {
      switch (output.type) {
        case 'allAddedToQueue':
          break;
        case 'addedToQueue':
          if (typeof output.file !== 'undefined') {
            this.files.push(output.file);
          }
          break;
        case 'uploading':
          if (typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => 
              typeof output.file !== 'undefined' 
              && file.id === output.file.id);
            this.files[index] = output.file;
          }
          break;
        case 'removed':
          // remove file from array when removed
          this.files = this.files.filter((file: UploadFile) => file !== output.file);
          break;
        case 'done':
          // The file is downloaded
          break;
      }
    }

    startUpload(): void {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'https://localhost:7185/api/docs/upload',
        method: 'POST',
        file: this.files[0],
        data: { FileName: this.files[0].name, FileType: this.files[0].type }
      };
  
      this.uploadInput.emit(event);
      this.statusMessage = "Your document has been saved";
      setTimeout(() => {
        this.documentsService.getAllDocuments();
        this.onBack();
      }, 2000);
    }
  
    cancelUpload(id: string): void {
      this.uploadInput.emit({ type: 'cancel', id: id });
    }
  
    removeFile(id: string): void {
      this.uploadInput.emit({ type: 'remove', id: id });
    }
  
    removeAllFiles(): void {
      this.uploadInput.emit({ type: 'removeAll' });
    }


  onCancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset()
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }

  ngOnDestroy() {
    
  }



}
