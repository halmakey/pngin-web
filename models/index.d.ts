import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Shape {
  SQUARE = "SQUARE",
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE"
}

export enum Role {
  EXHIBITOR = "EXHIBITOR",
  STAFF = "STAFF",
  ADMINISTRATOR = "ADMINISTRATOR"
}



type EagerSubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
  };
  readonly id: string;
  readonly file?: string | null;
  readonly confirmed?: boolean | null;
  readonly comment?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly Contents?: (Content | null)[] | null;
  readonly userID: string;
  readonly collectionID: string;
}

type LazySubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
  };
  readonly id: string;
  readonly file?: string | null;
  readonly confirmed?: boolean | null;
  readonly comment?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly Contents: AsyncCollection<Content>;
  readonly userID: string;
  readonly collectionID: string;
}

export declare type Submission = LazyLoading extends LazyLoadingDisabled ? EagerSubmission : LazySubmission

export declare const Submission: (new (init: ModelInit<Submission>) => Submission) & {
  copyOf(source: Submission, mutator: (draft: MutableModel<Submission>) => MutableModel<Submission> | void): Submission;
}

type EagerContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly file: string;
  readonly comment: string;
  readonly seq: number;
  readonly submissionID: string;
  readonly collectionID: string;
  readonly shape: Shape | keyof typeof Shape;
  readonly Tags?: (ContentTag | null)[] | null;
}

type LazyContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly file: string;
  readonly comment: string;
  readonly seq: number;
  readonly submissionID: string;
  readonly collectionID: string;
  readonly shape: Shape | keyof typeof Shape;
  readonly Tags: AsyncCollection<ContentTag>;
}

export declare type Content = LazyLoading extends LazyLoadingDisabled ? EagerContent : LazyContent

export declare const Content: (new (init: ModelInit<Content>) => Content) & {
  copyOf(source: Content, mutator: (draft: MutableModel<Content>) => MutableModel<Content> | void): Content;
}

type EagerTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly comment: string;
  readonly contents?: (ContentTag | null)[] | null;
}

type LazyTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly comment: string;
  readonly contents: AsyncCollection<ContentTag>;
}

export declare type Tag = LazyLoading extends LazyLoadingDisabled ? EagerTag : LazyTag

export declare const Tag: (new (init: ModelInit<Tag>) => Tag) & {
  copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}

type EagerCollection = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Collection, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly startCallAt?: string | null;
  readonly endCallAt?: string | null;
  readonly sequence?: number | null;
  readonly Contents?: (Content | null)[] | null;
  readonly Submissions?: (Submission | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCollection = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Collection, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly startCallAt?: string | null;
  readonly endCallAt?: string | null;
  readonly sequence?: number | null;
  readonly Contents: AsyncCollection<Content>;
  readonly Submissions: AsyncCollection<Submission>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Collection = LazyLoading extends LazyLoadingDisabled ? EagerCollection : LazyCollection

export declare const Collection: (new (init: ModelInit<Collection>) => Collection) & {
  copyOf(source: Collection, mutator: (draft: MutableModel<Collection>) => MutableModel<Collection> | void): Collection;
}

type EagerSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Session, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expireAt: string;
  readonly nonce: string;
  readonly userID?: string | null;
}

type LazySession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Session, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expireAt: string;
  readonly nonce: string;
  readonly userID?: string | null;
}

export declare type Session = LazyLoading extends LazyLoadingDisabled ? EagerSession : LazySession

export declare const Session: (new (init: ModelInit<Session>) => Session) & {
  copyOf(source: Session, mutator: (draft: MutableModel<Session>) => MutableModel<Session> | void): Session;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly Submissions?: (Submission | null)[] | null;
  readonly Sessions?: (Session | null)[] | null;
  readonly discordId: string;
  readonly avatarUrl: string;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly Submissions: AsyncCollection<Submission>;
  readonly Sessions: AsyncCollection<Session>;
  readonly discordId: string;
  readonly avatarUrl: string;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly tagId?: string | null;
  readonly content: Content;
  readonly tag: Tag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly tagId?: string | null;
  readonly content: AsyncItem<Content>;
  readonly tag: AsyncItem<Tag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContentTag = LazyLoading extends LazyLoadingDisabled ? EagerContentTag : LazyContentTag

export declare const ContentTag: (new (init: ModelInit<ContentTag>) => ContentTag) & {
  copyOf(source: ContentTag, mutator: (draft: MutableModel<ContentTag>) => MutableModel<ContentTag> | void): ContentTag;
}