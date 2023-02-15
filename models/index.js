// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ParticipantRole = {
  "EXHIBITOR": "EXHIBITOR",
  "STAFF": "STAFF",
  "ADMINISTRATOR": "ADMINISTRATOR"
};

const ContentShape = {
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
  ParticipantRole,
  ContentShape
};