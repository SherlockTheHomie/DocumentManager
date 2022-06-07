import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
    selector: 'doc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private activeUser: Subscription;

    constructor(private dataStorageService: DataStorageService) {
        
    }

ngOnInit() {
    this.dataStorageService.fetchDocuments().subscribe();
}

ngOnDestroy() {
    this.activeUser.unsubscribe();
  }

}