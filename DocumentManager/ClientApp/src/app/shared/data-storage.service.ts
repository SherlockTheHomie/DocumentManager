import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { DocumentService } from "../documents/documents.service";
import { Document } from "./document.model";



@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private documentsService: DocumentService) {}

    // storeDocuments() {
    //     const documents = this.documentsService.getDocuments();
    //     this.http
    //         .put(
    //             'https://localhost:7185/api/docs',
    //             documents
    //         )
    //         .subscribe(response => {
    //             console.log(response)
    //         });
    // }

    // fetchDocuments() {
    //     return this.http.get<Document[]>(
    //         'https://localhost:7185/api/docs')
    //         .pipe(
    //             map(documents => {
    //                 return documents.map(document => {
    //                     return {
    //                         ...document,
    //                     };
    //                 });
    //             }),
    //             tap(documents => {
    //                 this.documentsService.setDocuments(documents);
    //             })
    //         )
   
    // }

    // getDocumentById(id: number) {
    //     return this.http.get<Document>(
    //         'https://localhost:7185/api/docs' + id
    //     )
    // }
}