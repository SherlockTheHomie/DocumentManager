import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


import { Document } from "../shared/document.model";





@Injectable()
export class DocumentService {
    documentsUpdate = new Subject<Document[]>();

    private documents: Document[] = [];

    constructor() {}

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

    getPreview(id: number) {
        this.documents[id];
        return this.documents[id].path;
    }

    deleteDocument(id: number) {
        this.documents.splice(id, 1);
        this.documentsUpdate.next(this.documents.slice());
    }

}