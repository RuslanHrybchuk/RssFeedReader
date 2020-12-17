import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../model/feed';
import {FeedService} from '../../services/feed.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  feed: Feed;
  feedList: Feed[] = [];

  private currentUser;
  private dataUpdateSubscription: Subscription;

  public password: string;
  public username: string;
  public showLoginScreen = true;
  public showMainScreen = false;
  public view = 'card';
  public currentFeed: string;

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

  private logOut(): void {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }

  private checkIfLogged(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.showLoginScreen = false;
      this.showMainScreen = true;

      this.getFeedList();
    } else {
      this.showLoginScreen = true;
      this.showMainScreen = false;
    }
  }

  public listView(): void {
    this.view = 'list';

    // change flex flow and change to list component instead of card
  }

  public cardView(): void {
    this.view = 'card';
  }

  public async submitLogin(): Promise<any> {
    const usersArray = await this.feedService.getUserArray();

    const user = usersArray.find(x => x.username === this.username && x.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.getFeedList();

      this.showLoginScreen = false;
      this.showMainScreen = true;
    } else {
      alert('Username and/or password is incorrect');
    }
  }

  ngOnDestroy(): void {
    this.dataUpdateSubscription.unsubscribe();
  }

}
