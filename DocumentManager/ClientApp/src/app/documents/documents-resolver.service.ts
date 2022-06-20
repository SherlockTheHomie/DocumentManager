// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

// import { DataStorageService } from "../shared/data-storage.service";
// import { Document } from "../shared/document.model";
// import { DocumentService } from "./documents.service";


// @Injectable({ providedIn: 'root' })
// export class DocumentsResolverService implements Resolve<Document[]> {
//   constructor(
//     private dataStorageService: DataStorageService,
//     private documentsService: DocumentService) { }

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const localDocuments = this.documentsService.getDocuments();
//         if (localDocuments.length === 0) {
//         return this.documentsService.getAllDocuments();
//         } else {
//             return this.documentsService.getAllDocuments();
//         }
//     }


// }
