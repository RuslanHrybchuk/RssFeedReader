import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed-item-card',
  templateUrl: './feed-item-card.component.html',
  styleUrls: ['./feed-item-card.component.scss']
})
export class FeedItemCardComponent implements OnInit {
  @Input() feedItemData;

  constructor() { }

  ngOnInit(): void {
  }

}
