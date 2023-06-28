import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import {
  StreamArticlesResponse,
  UsingStreamResponse,
} from 'src/stubs/article/v1alpha/request';

@Injectable()
export class StreamsService {
  articleStream$: Subject<StreamArticlesResponse>;
  usageStream$: Subject<UsingStreamResponse>;
  constructor() {
    this.articleStream$ = new Subject<StreamArticlesResponse>();
    this.usageStream$ = new Subject<UsingStreamResponse>();
  }
}