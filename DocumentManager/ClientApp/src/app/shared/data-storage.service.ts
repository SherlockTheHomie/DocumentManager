import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { DocumentService } from "../documents/documents.service";
import { Document } from "./document.model";



@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private documentService: DocumentService) {}

    // storeDocument() {
    //     const documentToStore = 
    // }
    
    storeDocuments() {
        const documents = this.documentService.getDocuments();
        this.http
            .put(
                'https://localhost:7185/api/docs',
                documents
            )
            .subscribe(response => {
                console.log(response)
            });
    }

    fetchDocuments() {
        return this.http.get<Document[]>(
            'https://localhost:7185/api/docs'
        )
        .pipe(
        map(documents => {
            return documents.map(document => {
                return {
                    ...document,
                };
            });
        }),
            tap(documents => {
                this.documentService.setDocuments(documents);
            }),
        )
    }
}