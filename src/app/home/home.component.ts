import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feed } from '../model/feed';
import { FeedService } from '../../services/feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  newFeed: Feed;
  feed: Feed;
  feedList: Feed[] = [];

  private currentUser;
  private dataUpdateSubscription: Subscription;

  public password: string;
  public username: string;
  public newFeedTitle: string;
  public newFeedUrl: string;
  public newFeedImg: string;

  public activeScreen = 'login';

  public feedItemsList;
  public view = 'card';
  public selectedFeedUrl: string;
  public selectedFeedItem;

  constructor(private http: HttpClient,
              private feedService: FeedService) {
  }

  ngOnChanges(): void {
    this.checkIfLogged();
  }

  ngOnInit(): void {
    this.checkIfLogged();
    this.dataUpdateSubscription = this.feedService.dataChangeSubject.subscribe(this.subscribeToDataChange.bind(this));
  }

  private subscribeToDataChange(): void {
    this.getFeedList();
  }

  private async getFeedList(): Promise<any> {
    this.feedList = await this.feedService.getFeedList(this.currentUser.id);
    this.feed = new Feed();
  }

  public async userAuth(): Promise<any> {
    const usersArray = await this.feedService.getUserArray();
    const user = usersArray.find(x => x.username === this.username && x.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
      this.getFeedList();
      this.activeScreen = 'feeds';
    } else {
      alert('Username and/or password is incorrect');
    }
  }

  public logOut(): void {
    localStorage.removeItem('currentUser');
    this.reloadWindow();
  }

  private reloadWindow(): void {
    window.location.reload();
  }

  private checkIfLogged(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.activeScreen = 'feeds';

      this.getFeedList();
    } else {
      this.activeScreen = 'login';
    }
  }

  public selectFeed(feedUrl): void {
    this.selectedFeedUrl = feedUrl;
    this.getFeedItems();
    this.activeScreen = 'feedItems';
  }

  public getBack(): void {
    const views = ['login',  'addFeed', 'feeds', 'feedItems', 'activeItem'];

    if (this.activeScreen === 'addFeed'){
      this.activeScreen = 'feeds';
    }

    if (this.activeScreen === 'feedItems' || this.activeScreen === 'activeItem') {
      this.activeScreen = views[views.indexOf(views.find(x => x === this.activeScreen)) - 1];
    }
  }

  public listView(): void {
    this.view = 'list';
  }

  public cardView(): void {
    this.view = 'card';
  }

  public async addNewFeed(): Promise<any> {
    this.newFeed = new Feed(this.newFeedTitle, this.newFeedUrl, this.newFeedImg);
    this.activeScreen = 'feeds';
    await this.feedService.addNewFeed(this.newFeed, this.currentUser.id);
    this.reloadWindow();
  }

  public openNewFeedForm(): void {
    this.activeScreen = 'addFeed';
  }

  public getFeedItems(): void {
   this.feedService.getFeedItemsList(this.selectedFeedUrl).subscribe((feed: any) => {
      this.feedItemsList = feed;
    }, err => {
     this.activeScreen = 'feeds';
     console.log(err);
   });
  }

  public selectFeedItem(item): void {
    this.selectedFeedItem = item;
    this.activeScreen = 'activeItem';
  }


  ngOnDestroy(): void {
    this.dataUpdateSubscription.unsubscribe();
  }
}
