import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Sentiment extends Model {
  static table = 'sentiments';
  @field('score') score!: number;
  @field('date') date!: number;
}
