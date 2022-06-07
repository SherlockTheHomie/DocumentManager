import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { Document } from "../shared/document.model";
import { DocumentService } from "./documents.service";


@Injectable({ providedIn: 'root' })
export class DocumentResolverService implements Resolve<Document[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private documentsService: DocumentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const documents = this.documentsService.getDocuments();
        if (documents.length === 0) {
        return this.dataStorageService.fetchDocuments();
        } else {
            return documents;
        }
    }
}
