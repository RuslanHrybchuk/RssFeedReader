import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})

export class FeedListComponent implements OnInit {
  @Input() feedData;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
  }

  public async clickClose(event): Promise<any> {
    event.stopPropagation();
    await this.feedService.deleteFeed(this.feedData.id);
    this.feedService.onDataChange();
  }
}
