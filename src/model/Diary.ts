import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

export default class Diary extends Model {
  static table = 'diaries';

  @text('title') title!: string;
  @text('content') content!: string;
  @field('date') date!: number;
}
