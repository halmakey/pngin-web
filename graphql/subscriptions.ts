/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubmission = /* GraphQL */ `
  subscription OnCreateSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onCreateSubmission(filter: $filter) {
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
export const onUpdateSubmission = /* GraphQL */ `
  subscription OnUpdateSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onUpdateSubmission(filter: $filter) {
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
export const onDeleteSubmission = /* GraphQL */ `
  subscription OnDeleteSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onDeleteSubmission(filter: $filter) {
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
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onCreateCollection(filter: $filter) {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onUpdateCollection(filter: $filter) {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onDeleteCollection(filter: $filter) {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($filter: ModelSubscriptionSessionFilterInput) {
    onCreateSession(filter: $filter) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($filter: ModelSubscriptionSessionFilterInput) {
    onUpdateSession(filter: $filter) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($filter: ModelSubscriptionSessionFilterInput) {
    onDeleteSession(filter: $filter) {
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
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent($filter: ModelSubscriptionContentFilterInput) {
    onCreateContent(filter: $filter) {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent($filter: ModelSubscriptionContentFilterInput) {
    onUpdateContent(filter: $filter) {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent($filter: ModelSubscriptionContentFilterInput) {
    onDeleteContent(filter: $filter) {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
    onCreateTag(filter: $filter) {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
    onUpdateTag(filter: $filter) {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
    onDeleteTag(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateContentTag = /* GraphQL */ `
  subscription OnCreateContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
  ) {
    onCreateContentTag(filter: $filter) {
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
export const onUpdateContentTag = /* GraphQL */ `
  subscription OnUpdateContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
  ) {
    onUpdateContentTag(filter: $filter) {
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
export const onDeleteContentTag = /* GraphQL */ `
  subscription OnDeleteContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
  ) {
    onDeleteContentTag(filter: $filter) {
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
