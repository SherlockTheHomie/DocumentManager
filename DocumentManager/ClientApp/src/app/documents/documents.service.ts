import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Document } from "../shared/document.model";

@Injectable({providedIn: 'root'})
export class DocumentService {
    
    documentsChanged = new Subject<Document[]>();

    private localDocuments: Document[] = [];

    constructor(private http: HttpClient) {}

    get _documentsUpdate() {
        return this.documentsChanged;
    }

    setLocalDocuments(documents: Document[]) {
        this.localDocuments = documents; 
        this.documentsChanged.next(this.localDocuments.slice());
    }

    getAllDocuments() {  
        return this.http.get<Document[]>('https://localhost:7185/api/docs')
        .subscribe(response => {
            this.setLocalDocuments(response);
        })
    }

    getDocument(id: number) {
        let selectedDoc = this.localDocuments.find(doc => doc.id === id) || new Document(-1, "Not Real", "not found", "")
        return selectedDoc;
    }

    removeDocument(id: number) {
        this.http
        .delete(
          'https://localhost:7185/api/docs/' + id
          ).subscribe(response => {
            console.log(response)
          })
    }
}