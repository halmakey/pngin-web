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

const { Content, Tag, User, ContentTag } = initSchema(schema);

export {
  Content,
  Tag,
  User,
  ContentTag,
  Role,
  Shape
};