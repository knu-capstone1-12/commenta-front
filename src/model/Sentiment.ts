import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {field} from '@nozbe/watermelondb/decorators';

export default class Sentiment extends Model {
  static table = 'sentiments';
  static associations: Associations = {
    sentiments: {type: 'belongs_to', key: 'diary_id'},
  };
  @field('score') score!: number;
  @field('diary_id') diary_id!: string;
}
