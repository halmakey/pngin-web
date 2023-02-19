// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Role = {
  "EXHIBITOR": "EXHIBITOR",
  "STAFF": "STAFF",
  "ADMINISTRATOR": "ADMINISTRATOR"
};

const Shape = {
  "SQUARE": "SQUARE",
  "PORTRAIT": "PORTRAIT",
  "LANDSCAPE": "LANDSCAPE"
};

const { Submission, Content, Tag, Collection, Session, User, TagContent } = initSchema(schema);

export {
  Submission,
  Content,
  Tag,
  Collection,
  Session,
  User,
  TagContent,
  Role,
  Shape
};