/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubmission = /* GraphQL */ `
  mutation CreateSubmission(
    $input: CreateSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    createSubmission(input: $input, condition: $condition) {
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
export const updateSubmission = /* GraphQL */ `
  mutation UpdateSubmission(
    $input: UpdateSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    updateSubmission(input: $input, condition: $condition) {
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
export const deleteSubmission = /* GraphQL */ `
  mutation DeleteSubmission(
    $input: DeleteSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    deleteSubmission(input: $input, condition: $condition) {
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
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createContentTag = /* GraphQL */ `
  mutation CreateContentTag(
    $input: CreateContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    createContentTag(input: $input, condition: $condition) {
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
export const updateContentTag = /* GraphQL */ `
  mutation UpdateContentTag(
    $input: UpdateContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    updateContentTag(input: $input, condition: $condition) {
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
export const deleteContentTag = /* GraphQL */ `
  mutation DeleteContentTag(
    $input: DeleteContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    deleteContentTag(input: $input, condition: $condition) {
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
