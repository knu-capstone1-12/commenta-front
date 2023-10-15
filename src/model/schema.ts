import {appSchema, tableSchema} from '@nozbe/watermelondb';

const diarySchema = tableSchema({
  name: 'diaries',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'content', type: 'string'},
    {name: 'date', type: 'string'},
  ],
});

const emotionSchema = tableSchema({
  name: 'emotions',
  columns: [
    {name: 'emotionName', type: 'string'},
    {name: 'percentage', type: 'number'},
    {name: 'diary_id', type: 'string', isIndexed: true},
  ],
});

export default appSchema({
  version: 1,
  tables: [diarySchema, emotionSchema],
});
