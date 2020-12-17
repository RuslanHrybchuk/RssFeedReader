export class Feed {
  title: string;
  url: string;
  image: string;

  constructor(title?: string, url?: string, imageUrl?: string) {
    this.title = title;
    this.url = url;
    this.image = imageUrl;
  }
}
