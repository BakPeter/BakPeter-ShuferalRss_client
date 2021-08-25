import { Component, OnInit } from '@angular/core';
import { CommService } from '../app-services/comm-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private commServcie: CommService) {}

  ngOnInit(): void {}

  updateData() {
    this.commServcie.updateAndStoreFeeds();
  }
}
