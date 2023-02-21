// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Shape = {
  "SQUARE": "SQUARE",
  "PORTRAIT": "PORTRAIT",
  "LANDSCAPE": "LANDSCAPE"
};

const Role = {
  "EXHIBITOR": "EXHIBITOR",
  "STAFF": "STAFF",
  "ADMINISTRATOR": "ADMINISTRATOR"
};

const { Submission, Content, Tag, Collection, Session, User, ContentTag } = initSchema(schema);

export {
  Submission,
  Content,
  Tag,
  Collection,
  Session,
  User,
  ContentTag,
  Shape,
  Role
};