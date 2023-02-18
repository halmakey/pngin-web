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

const { Session, Content, Tag, User, TagContent } = initSchema(schema);

export {
  Session,
  Content,
  Tag,
  User,
  TagContent,
  Role,
  Shape
};