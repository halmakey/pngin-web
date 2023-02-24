/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSubmissionInput = {
  id?: string | null,
  file?: string | null,
  confirmed?: boolean | null,
  comment?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userID: string,
  collectionID: string,
  _version?: number | null,
};

export type ModelSubmissionConditionInput = {
  file?: ModelStringInput | null,
  confirmed?: ModelBooleanInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  collectionID?: ModelIDInput | null,
  and?: Array< ModelSubmissionConditionInput | null > | null,
  or?: Array< ModelSubmissionConditionInput | null > | null,
  not?: ModelSubmissionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Submission = {
  __typename: "Submission",
  id: string,
  file?: string | null,
  confirmed?: boolean | null,
  comment?: string | null,
  createdAt: string,
  updatedAt: string,
  Contents?: ModelContentConnection | null,
  userID: string,
  collectionID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelContentConnection = {
  __typename: "ModelContentConnection",
  items:  Array<Content | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Content = {
  __typename: "Content",
  id: string,
  createdAt: string,
  updatedAt: string,
  file: string,
  comment: string,
  seq: number,
  submissionID: string,
  collectionID: string,
  shape: Shape,
  Tags?: ModelContentTagConnection | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export enum Shape {
  SQUARE = "SQUARE",
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE",
}


export type ModelContentTagConnection = {
  __typename: "ModelContentTagConnection",
  items:  Array<ContentTag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ContentTag = {
  __typename: "ContentTag",
  id: string,
  contentId: string,
  tagId: string,
  content: Content,
  tag: Tag,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  comment: string,
  contents?: ModelContentTagConnection | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSubmissionInput = {
  id: string,
  file?: string | null,
  confirmed?: boolean | null,
  comment?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userID?: string | null,
  collectionID?: string | null,
  _version?: number | null,
};

export type DeleteSubmissionInput = {
  id: string,
  _version?: number | null,
};

export type CreateCollectionInput = {
  id?: string | null,
  name: string,
  startCallAt?: string | null,
  endCallAt?: string | null,
  sequence?: number | null,
  _version?: number | null,
};

export type ModelCollectionConditionInput = {
  name?: ModelStringInput | null,
  startCallAt?: ModelStringInput | null,
  endCallAt?: ModelStringInput | null,
  sequence?: ModelFloatInput | null,
  and?: Array< ModelCollectionConditionInput | null > | null,
  or?: Array< ModelCollectionConditionInput | null > | null,
  not?: ModelCollectionConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Collection = {
  __typename: "Collection",
  id: string,
  name: string,
  startCallAt?: string | null,
  endCallAt?: string | null,
  sequence?: number | null,
  Contents?: ModelContentConnection | null,
  Submissions?: ModelSubmissionConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelSubmissionConnection = {
  __typename: "ModelSubmissionConnection",
  items:  Array<Submission | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateCollectionInput = {
  id: string,
  name?: string | null,
  startCallAt?: string | null,
  endCallAt?: string | null,
  sequence?: number | null,
  _version?: number | null,
};

export type DeleteCollectionInput = {
  id: string,
  _version?: number | null,
};

export type CreateSessionInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  expireAt: string,
  nonce: string,
  userID?: string | null,
  _version?: number | null,
};

export type ModelSessionConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  expireAt?: ModelStringInput | null,
  nonce?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
};

export type Session = {
  __typename: "Session",
  id: string,
  createdAt: string,
  updatedAt: string,
  expireAt: string,
  nonce: string,
  userID?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSessionInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  expireAt?: string | null,
  nonce?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteSessionInput = {
  id: string,
  _version?: number | null,
};

export type CreateContentInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  file: string,
  comment: string,
  seq: number,
  submissionID: string,
  collectionID: string,
  shape: Shape,
  _version?: number | null,
};

export type ModelContentConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  file?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  seq?: ModelIntInput | null,
  submissionID?: ModelIDInput | null,
  collectionID?: ModelIDInput | null,
  shape?: ModelShapeInput | null,
  and?: Array< ModelContentConditionInput | null > | null,
  or?: Array< ModelContentConditionInput | null > | null,
  not?: ModelContentConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelShapeInput = {
  eq?: Shape | null,
  ne?: Shape | null,
};

export type UpdateContentInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  file?: string | null,
  comment?: string | null,
  seq?: number | null,
  submissionID?: string | null,
  collectionID?: string | null,
  shape?: Shape | null,
  _version?: number | null,
};

export type DeleteContentInput = {
  id: string,
  _version?: number | null,
};

export type CreateTagInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  name: string,
  comment: string,
  _version?: number | null,
};

export type ModelTagConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  name?: string | null,
  comment?: string | null,
  _version?: number | null,
};

export type DeleteTagInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  name: string,
  discordId: string,
  avatarUrl: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  discordId?: ModelStringInput | null,
  avatarUrl?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  Submissions?: ModelSubmissionConnection | null,
  Sessions?: ModelSessionConnection | null,
  discordId: string,
  avatarUrl: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items:  Array<Session | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  name?: string | null,
  discordId?: string | null,
  avatarUrl?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateContentTagInput = {
  id?: string | null,
  contentId: string,
  tagId: string,
  _version?: number | null,
};

export type ModelContentTagConditionInput = {
  contentId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelContentTagConditionInput | null > | null,
  or?: Array< ModelContentTagConditionInput | null > | null,
  not?: ModelContentTagConditionInput | null,
};

export type UpdateContentTagInput = {
  id: string,
  contentId?: string | null,
  tagId?: string | null,
  _version?: number | null,
};

export type DeleteContentTagInput = {
  id: string,
  _version?: number | null,
};

export type ModelSubmissionFilterInput = {
  id?: ModelIDInput | null,
  file?: ModelStringInput | null,
  confirmed?: ModelBooleanInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  collectionID?: ModelIDInput | null,
  and?: Array< ModelSubmissionFilterInput | null > | null,
  or?: Array< ModelSubmissionFilterInput | null > | null,
  not?: ModelSubmissionFilterInput | null,
};

export type ModelCollectionFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  startCallAt?: ModelStringInput | null,
  endCallAt?: ModelStringInput | null,
  sequence?: ModelFloatInput | null,
  and?: Array< ModelCollectionFilterInput | null > | null,
  or?: Array< ModelCollectionFilterInput | null > | null,
  not?: ModelCollectionFilterInput | null,
};

export type ModelCollectionConnection = {
  __typename: "ModelCollectionConnection",
  items:  Array<Collection | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  expireAt?: ModelStringInput | null,
  nonce?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type ModelContentFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  file?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  seq?: ModelIntInput | null,
  submissionID?: ModelIDInput | null,
  collectionID?: ModelIDInput | null,
  shape?: ModelShapeInput | null,
  and?: Array< ModelContentFilterInput | null > | null,
  or?: Array< ModelContentFilterInput | null > | null,
  not?: ModelContentFilterInput | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  discordId?: ModelStringInput | null,
  avatarUrl?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelContentTagFilterInput = {
  id?: ModelIDInput | null,
  contentId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelContentTagFilterInput | null > | null,
  or?: Array< ModelContentTagFilterInput | null > | null,
  not?: ModelContentTagFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionSubmissionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  file?: ModelSubscriptionStringInput | null,
  confirmed?: ModelSubscriptionBooleanInput | null,
  comment?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  collectionID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionSubmissionFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubmissionFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionCollectionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  startCallAt?: ModelSubscriptionStringInput | null,
  endCallAt?: ModelSubscriptionStringInput | null,
  sequence?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionCollectionFilterInput | null > | null,
  or?: Array< ModelSubscriptionCollectionFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionStringInput | null,
  nonce?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionSessionFilterInput | null > | null,
};

export type ModelSubscriptionContentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  file?: ModelSubscriptionStringInput | null,
  comment?: ModelSubscriptionStringInput | null,
  seq?: ModelSubscriptionIntInput | null,
  submissionID?: ModelSubscriptionIDInput | null,
  collectionID?: ModelSubscriptionIDInput | null,
  shape?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContentFilterInput | null > | null,
  or?: Array< ModelSubscriptionContentFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  comment?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  discordId?: ModelSubscriptionStringInput | null,
  avatarUrl?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionContentTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  contentId?: ModelSubscriptionIDInput | null,
  tagId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionContentTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionContentTagFilterInput | null > | null,
};

export type CreateSubmissionMutationVariables = {
  input: CreateSubmissionInput,
  condition?: ModelSubmissionConditionInput | null,
};

export type CreateSubmissionMutation = {
  createSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSubmissionMutationVariables = {
  input: UpdateSubmissionInput,
  condition?: ModelSubmissionConditionInput | null,
};

export type UpdateSubmissionMutation = {
  updateSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSubmissionMutationVariables = {
  input: DeleteSubmissionInput,
  condition?: ModelSubmissionConditionInput | null,
};

export type DeleteSubmissionMutation = {
  deleteSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateCollectionMutationVariables = {
  input: CreateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type CreateCollectionMutation = {
  createCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCollectionMutationVariables = {
  input: UpdateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type UpdateCollectionMutation = {
  updateCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCollectionMutationVariables = {
  input: DeleteCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type DeleteCollectionMutation = {
  deleteCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateContentMutationVariables = {
  input: CreateContentInput,
  condition?: ModelContentConditionInput | null,
};

export type CreateContentMutation = {
  createContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateContentMutationVariables = {
  input: UpdateContentInput,
  condition?: ModelContentConditionInput | null,
};

export type UpdateContentMutation = {
  updateContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteContentMutationVariables = {
  input: DeleteContentInput,
  condition?: ModelContentConditionInput | null,
};

export type DeleteContentMutation = {
  deleteContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateContentTagMutationVariables = {
  input: CreateContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type CreateContentTagMutation = {
  createContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateContentTagMutationVariables = {
  input: UpdateContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type UpdateContentTagMutation = {
  updateContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteContentTagMutationVariables = {
  input: DeleteContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type DeleteContentTagMutation = {
  deleteContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetSubmissionQueryVariables = {
  id: string,
};

export type GetSubmissionQuery = {
  getSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSubmissionsQueryVariables = {
  filter?: ModelSubmissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubmissionsQuery = {
  listSubmissions?:  {
    __typename: "ModelSubmissionConnection",
    items:  Array< {
      __typename: "Submission",
      id: string,
      file?: string | null,
      confirmed?: boolean | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
      userID: string,
      collectionID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSubmissionsQueryVariables = {
  filter?: ModelSubmissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSubmissionsQuery = {
  syncSubmissions?:  {
    __typename: "ModelSubmissionConnection",
    items:  Array< {
      __typename: "Submission",
      id: string,
      file?: string | null,
      confirmed?: boolean | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
      userID: string,
      collectionID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCollectionQueryVariables = {
  id: string,
};

export type GetCollectionQuery = {
  getCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCollectionsQueryVariables = {
  filter?: ModelCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollectionsQuery = {
  listCollections?:  {
    __typename: "ModelCollectionConnection",
    items:  Array< {
      __typename: "Collection",
      id: string,
      name: string,
      startCallAt?: string | null,
      endCallAt?: string | null,
      sequence?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCollectionsQueryVariables = {
  filter?: ModelCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCollectionsQuery = {
  syncCollections?:  {
    __typename: "ModelCollectionConnection",
    items:  Array< {
      __typename: "Collection",
      id: string,
      name: string,
      startCallAt?: string | null,
      endCallAt?: string | null,
      sequence?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      createdAt: string,
      updatedAt: string,
      expireAt: string,
      nonce: string,
      userID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSessionsQuery = {
  syncSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      createdAt: string,
      updatedAt: string,
      expireAt: string,
      nonce: string,
      userID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetContentQueryVariables = {
  id: string,
};

export type GetContentQuery = {
  getContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListContentsQueryVariables = {
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentsQuery = {
  listContents?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncContentsQueryVariables = {
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncContentsQuery = {
  syncContents?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTagsQuery = {
  syncTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      discordId: string,
      avatarUrl: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      discordId: string,
      avatarUrl: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetContentTagQueryVariables = {
  id: string,
};

export type GetContentTagQuery = {
  getContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListContentTagsQueryVariables = {
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentTagsQuery = {
  listContentTags?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      id: string,
      contentId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncContentTagsQueryVariables = {
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncContentTagsQuery = {
  syncContentTags?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      id: string,
      contentId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SubmissionsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubmissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubmissionsByUserIDQuery = {
  submissionsByUserID?:  {
    __typename: "ModelSubmissionConnection",
    items:  Array< {
      __typename: "Submission",
      id: string,
      file?: string | null,
      confirmed?: boolean | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
      userID: string,
      collectionID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SubmissionsByCollectionIDQueryVariables = {
  collectionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubmissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubmissionsByCollectionIDQuery = {
  submissionsByCollectionID?:  {
    __typename: "ModelSubmissionConnection",
    items:  Array< {
      __typename: "Submission",
      id: string,
      file?: string | null,
      confirmed?: boolean | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
      userID: string,
      collectionID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SessionsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionsByUserIDQuery = {
  sessionsByUserID?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      createdAt: string,
      updatedAt: string,
      expireAt: string,
      nonce: string,
      userID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentsBySubmissionIDQueryVariables = {
  submissionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentsBySubmissionIDQuery = {
  contentsBySubmissionID?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentsByCollectionIDQueryVariables = {
  collectionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentsByCollectionIDQuery = {
  contentsByCollectionID?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentTagsByContentIdQueryVariables = {
  contentId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentTagsByContentIdQuery = {
  contentTagsByContentId?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      id: string,
      contentId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentTagsByTagIdQueryVariables = {
  tagId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentTagsByTagIdQuery = {
  contentTagsByTagId?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      id: string,
      contentId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateSubmissionSubscriptionVariables = {
  filter?: ModelSubscriptionSubmissionFilterInput | null,
};

export type OnCreateSubmissionSubscription = {
  onCreateSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateSubmissionSubscriptionVariables = {
  filter?: ModelSubscriptionSubmissionFilterInput | null,
};

export type OnUpdateSubmissionSubscription = {
  onUpdateSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteSubmissionSubscriptionVariables = {
  filter?: ModelSubscriptionSubmissionFilterInput | null,
};

export type OnDeleteSubmissionSubscription = {
  onDeleteSubmission?:  {
    __typename: "Submission",
    id: string,
    file?: string | null,
    confirmed?: boolean | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userID: string,
    collectionID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateCollectionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionFilterInput | null,
};

export type OnCreateCollectionSubscription = {
  onCreateCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCollectionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionFilterInput | null,
};

export type OnUpdateCollectionSubscription = {
  onUpdateCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCollectionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionFilterInput | null,
};

export type OnDeleteCollectionSubscription = {
  onDeleteCollection?:  {
    __typename: "Collection",
    id: string,
    name: string,
    startCallAt?: string | null,
    endCallAt?: string | null,
    sequence?: number | null,
    Contents?:  {
      __typename: "ModelContentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    createdAt: string,
    updatedAt: string,
    expireAt: string,
    nonce: string,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
};

export type OnCreateContentSubscription = {
  onCreateContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
};

export type OnUpdateContentSubscription = {
  onUpdateContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
};

export type OnDeleteContentSubscription = {
  onDeleteContent?:  {
    __typename: "Content",
    id: string,
    createdAt: string,
    updatedAt: string,
    file: string,
    comment: string,
    seq: number,
    submissionID: string,
    collectionID: string,
    shape: Shape,
    Tags?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    comment: string,
    contents?:  {
      __typename: "ModelContentTagConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    Submissions?:  {
      __typename: "ModelSubmissionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    discordId: string,
    avatarUrl: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
};

export type OnCreateContentTagSubscription = {
  onCreateContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
};

export type OnUpdateContentTagSubscription = {
  onUpdateContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
};

export type OnDeleteContentTagSubscription = {
  onDeleteContentTag?:  {
    __typename: "ContentTag",
    id: string,
    contentId: string,
    tagId: string,
    content:  {
      __typename: "Content",
      id: string,
      createdAt: string,
      updatedAt: string,
      file: string,
      comment: string,
      seq: number,
      submissionID: string,
      collectionID: string,
      shape: Shape,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt: string,
      updatedAt: string,
      name: string,
      comment: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
