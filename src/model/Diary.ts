import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {field, text} from '@nozbe/watermelondb/decorators';

export default class Diary extends Model {
  static table = 'diaries';
  static associations: Associations = {
    emotions: {type: 'has_many', foreignKey: 'diary_id'},
  };

  @text('title') title!: string;
  @text('content') content!: string;
  @field('date') date!: string;
}
