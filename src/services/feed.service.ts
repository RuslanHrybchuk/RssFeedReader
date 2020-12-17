import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {
  }

  public dataChangeSubject = new Subject();

  public getFeedList(userId): Promise<any> {
    return this.http.get(`http://localhost:3000/userFeeds?userId=${userId}`).toPromise();
  }

  public getUserArray(): Promise<any> {
    return this.http.get('http://localhost:3000/users').toPromise();
  }

  public deleteFeed(feedId): Promise<any> {
    return this.http.delete(`http://localhost:3000/userFeeds/${feedId}`).toPromise();
  }

  public onDataChange(): void {
    this.dataChangeSubject.next(true);
  }
}
