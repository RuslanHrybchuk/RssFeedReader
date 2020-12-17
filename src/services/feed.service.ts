import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Feed} from '../app/model/feed';
import {FeedItems} from '../app/model/feedItems';
import Parser from 'rss-parser/dist/rss-parser.js';


@Injectable({
  providedIn: 'root'
})

export class FeedService {
  constructor(private http: HttpClient) {}

  private serverUrl = 'http://localhost:3000/';
  private cors = '';
  // private cors = 'https://cors-anywhere.herokuapp.com/';
  // private cors = 'https://yacdn.org/proxy/';

  public dataChangeSubject = new Subject();

  feed: Feed[] = [];
  feedItemList: FeedItems[] = [];

  public getFeedList(userId): Promise<any> {
    return this.http.get(`${this.serverUrl}userFeeds?userId=${userId}`).toPromise();
  }

  public getUserArray(): Promise<any> {
    return this.http.get(`${this.serverUrl}users`).toPromise();
  }

  public deleteFeed(feedId): Promise<any> {
    return this.http.delete(`${this.serverUrl}userFeeds/${feedId}`).toPromise();
  }

  public onDataChange(): void {
    this.dataChangeSubject.next(true);
  }

  public getFeedItemsList(url: string): Observable<any> {
    return this.http.get(this.cors + url, {responseType: 'text'})
      .pipe(
        map(this.extractFeedList),
        catchError(this.handlerError)
      );
  }


  private extractFeedList(xml: any): Array<any> {
    const parser = new Parser();

    const ZoneAwarePromise: any = parser.parseString(xml);

    // get list of feed items

    const FeedItemList = ZoneAwarePromise.__zone_symbol__value.items;

    const itemsArray = [];
    if (FeedItemList.length) {
      FeedItemList.forEach((feedItem: any) => {
        const content = feedItem['content:encoded'] || feedItem.content;

        const htmlParser = new DOMParser();
        const htmlDoc = htmlParser.parseFromString(content, 'text/html');

        /* Date from now + 30 days to expire */
        const expiryDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));

        let thumbnail = '';
        const img = htmlDoc.getElementsByTagName('img');
        if (img.length) {
          thumbnail = img[0].src;
        }

        const obj = {
          title: feedItem.title,
          link: feedItem.link,
          author: feedItem['dc:creator'] || feedItem.author,
          categories: feedItem.categories,
          pubDate: feedItem.pubDate,
          content,
          expiryDate,
          thumbnail
        };

        itemsArray.push(new FeedItems(obj));
      });
    }
    return itemsArray;
  }

  private  handlerError(error: Response | any): any {
    let errorMsg = '';
    if (error instanceof Response) {
      const err = error || '';
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }
    console.log(errorMsg);
    window.alert(errorMsg);
    return throwError(errorMsg);
  }
}
