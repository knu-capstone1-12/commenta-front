import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {field} from '@nozbe/watermelondb/decorators';

export default class Emotion extends Model {
  static table = 'emotions';
  static associations: Associations = {
    emotions: {type: 'belongs_to', key: 'diary_id'},
  };
  @field('emotionName') emotionName!: string;
  @field('percentage') percentage!: number;
  @field('diary_id') diary_id!: string;
}
