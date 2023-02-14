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

const { Content, ContentTag, Participants, ContentContentTag } = initSchema(schema);

export {
  Content,
  ContentTag,
  Participants,
  ContentContentTag,
  ParticipantRole,
  ContentShape
};