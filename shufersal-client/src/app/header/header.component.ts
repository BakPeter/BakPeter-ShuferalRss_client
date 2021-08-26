import { Component, OnInit } from '@angular/core';
import { CommService } from '../app-services/comm-service.service';
import { DataRepositoryService } from '../app-services/data-repository.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dateRepService: DataRepositoryService) {}

  ngOnInit(): void {}

  updateData() {
    this.dateRepService.updateData();
  }
}
