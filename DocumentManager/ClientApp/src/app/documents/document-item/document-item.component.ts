import { Component, Input, OnInit } from '@angular/core';

import { Document } from 'src/app/shared/document.model';
import { DocumentService } from '../documents.service';



@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
 
  // @Input() name: string;
  // @Input() path: string;
  
  constructor() {
    
   }

  ngOnInit() {

  }

}
