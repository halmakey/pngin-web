/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubmission = /* GraphQL */ `
  query GetSubmission($id: ID!) {
    getSubmission(id: $id) {
      id
      file
      confirmed
      comment
      createdAt
      updatedAt
      Contents {
        nextToken
        startedAt
      }
      userID
      collectionID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSubmissions = /* GraphQL */ `
  query ListSubmissions(
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        file
        confirmed
        comment
        createdAt
        updatedAt
        userID
        collectionID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubmissions = /* GraphQL */ `
  query SyncSubmissions(
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubmissions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        file
        confirmed
        comment
        createdAt
        updatedAt
        userID
        collectionID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      name
      startCallAt
      endCallAt
      sequence
      Contents {
        nextToken
        startedAt
      }
      Submissions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        startCallAt
        endCallAt
        sequence
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCollections = /* GraphQL */ `
  query SyncCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCollections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        startCallAt
        endCallAt
        sequence
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      createdAt
      updatedAt
      expireAt
      nonce
      userID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        expireAt
        nonce
        userID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSessions = /* GraphQL */ `
  query SyncSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        expireAt
        nonce
        userID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      createdAt
      updatedAt
      file
      comment
      seq
      submissionID
      collectionID
      shape
      Tags {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        file
        comment
        seq
        submissionID
        collectionID
        shape
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncContents = /* GraphQL */ `
  query SyncContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        file
        comment
        seq
        submissionID
        collectionID
        shape
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      createdAt
      updatedAt
      name
      comment
      contents {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        name
        comment
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTags = /* GraphQL */ `
  query SyncTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        name
        comment
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      createdAt
      updatedAt
      name
      Submissions {
        nextToken
        startedAt
      }
      Sessions {
        nextToken
        startedAt
      }
      discordId
      avatarUrl
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        name
        discordId
        avatarUrl
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        name
        discordId
        avatarUrl
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getContentTag = /* GraphQL */ `
  query GetContentTag($id: ID!) {
    getContentTag(id: $id) {
      id
      contentId
      tagId
      content {
        id
        createdAt
        updatedAt
        file
        comment
        seq
        submissionID
        collectionID
        shape
        _version
        _deleted
        _lastChangedAt
      }
      tag {
        id
        createdAt
        updatedAt
        name
        comment
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listContentTags = /* GraphQL */ `
  query ListContentTags(
    $filter: ModelContentTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContentTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contentId
        tagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncContentTags = /* GraphQL */ `
  query SyncContentTags(
    $filter: ModelContentTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContentTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        contentId
        tagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const submissionsByUserID = /* GraphQL */ `
  query SubmissionsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    submissionsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        file
        confirmed
        comment
        createdAt
        updatedAt
        userID
        collectionID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const submissionsByCollectionID = /* GraphQL */ `
  query SubmissionsByCollectionID(
    $collectionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    submissionsByCollectionID(
      collectionID: $collectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        file
        confirmed
        comment
        createdAt
        updatedAt
        userID
        collectionID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const sessionsByUserID = /* GraphQL */ `
  query SessionsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        expireAt
        nonce
        userID
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const contentsBySubmissionID = /* GraphQL */ `
  query ContentsBySubmissionID(
    $submissionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contentsBySubmissionID(
      submissionID: $submissionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        file
        comment
        seq
        submissionID
        collectionID
        shape
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const contentsByCollectionID = /* GraphQL */ `
  query ContentsByCollectionID(
    $collectionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contentsByCollectionID(
      collectionID: $collectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        file
        comment
        seq
        submissionID
        collectionID
        shape
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const contentTagsByContentId = /* GraphQL */ `
  query ContentTagsByContentId(
    $contentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContentTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contentTagsByContentId(
      contentId: $contentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contentId
        tagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const contentTagsByTagId = /* GraphQL */ `
  query ContentTagsByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContentTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contentTagsByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contentId
        tagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
