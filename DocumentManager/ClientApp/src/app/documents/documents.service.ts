import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


import { Document } from "../shared/document.model";





@Injectable()
export class DocumentService {
    documentsUpdate = new Subject<Document[]>();
    private baseUrl = 'https://localhost:7185/api/docs/new';

    private documents: Document[] = [];

    constructor(private http: HttpClient) {}

    setDocuments(documents: Document[]) {
        this.documents = documents;
        this.documentsUpdate.next(this.documents.slice());
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: number) {
        return this.documents[id];
    }

    addDocument() {
        this.documentsUpdate.next(this.documents.slice());
    }

    uploadFile(file: File): Observable<HttpEvent<any>>{
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
          reportProgress: true,
          responseType: 'json'
        });
        return this.http.request(req);
      }
    }

    getPreview(id: number) {
        this.documents[id];
        return this.documents[id].path;
    }

    deleteDocument(id: number) {
        this.documents.splice(id, 1);
        this.documentsUpdate.next(this.documents.slice());
    }

}