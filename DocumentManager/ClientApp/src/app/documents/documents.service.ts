import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";


import { Document } from "../shared/document.model";





@Injectable({providedIn: 'root'})
export class DocumentService {
    
    documentsChanged = new Subject<Document[]>();

    private localDocuments: Document[] = [];


    // documentsRefresh = new BehaviorSubject<Document[]>(this.documents);

    constructor(private http: HttpClient) {}

    get _documentsUpdate() {
        return this.documentsChanged;
    }

    setLocalDocuments(documents: Document[]) {
        this.localDocuments = documents; 
        this.documentsChanged.next(this.localDocuments.slice());
    }



    getDocuments() {
        return this.localDocuments.slice(); 
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


    
    // removeDocument(id: number) {
    //     return this.http.delete('https://localhost:7185/api/docs/' + id)
    //     .pipe(
    //         tap(() => {
    //         this.documentsUpdate.next();
    //     })
    // )
    //     .subscribe(response => {
    //         console.log(response)
    //     })

    // }

    // refreshDocuments() {
    //     this.documentsUpdate.pipe(switchMap(_ => this.dataStorageService.fetchDocuments()))
    // }

    // deleteDocument(id: number) {
    //     this.documents.find(doc => doc.id === id)
    //     this.documentsUpdate.next(this.documents.slice());
    // }

}