import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Role {
  EXHIBITOR = "EXHIBITOR",
  STAFF = "STAFF",
  ADMINISTRATOR = "ADMINISTRATOR"
}

export enum Shape {
  SQUARE = "SQUARE",
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE"
}



type EagerSubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
  };
  readonly id: string;
  readonly file?: string | null;
  readonly Contents?: (Content | null)[] | null;
  readonly confirmed?: boolean | null;
  readonly comment?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly collectionID: string;
  readonly userID: string;
}

type LazySubmission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Submission, 'id'>;
  };
  readonly id: string;
  readonly file?: string | null;
  readonly Contents: AsyncCollection<Content>;
  readonly confirmed?: boolean | null;
  readonly comment?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly collectionID: string;
  readonly userID: string;
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
  readonly Tags?: (TagContent | null)[] | null;
  readonly collectionID: string;
  readonly submissionID: string;
  readonly userID?: string | null;
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
  readonly Tags: AsyncCollection<TagContent>;
  readonly collectionID: string;
  readonly submissionID: string;
  readonly userID?: string | null;
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
  readonly Contents?: (TagContent | null)[] | null;
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
  readonly Contents: AsyncCollection<TagContent>;
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
  readonly Submissions?: (Submission | null)[] | null;
  readonly Contents?: (Content | null)[] | null;
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
  readonly Submissions: AsyncCollection<Submission>;
  readonly Contents: AsyncCollection<Content>;
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
  readonly userID?: string | null;
  readonly discordToken?: string | null;
}

type LazySession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Session, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expireAt: string;
  readonly userID?: string | null;
  readonly discordToken?: string | null;
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
  readonly discordId: string;
  readonly discordName: string;
  readonly roles: Role[] | keyof typeof Role;
  readonly Submissions?: (Submission | null)[] | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly discordId: string;
  readonly discordName: string;
  readonly roles: Role[] | keyof typeof Role;
  readonly Submissions: AsyncCollection<Submission>;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerTagContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TagContent, 'id'>;
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

type LazyTagContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TagContent, 'id'>;
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

export declare type TagContent = LazyLoading extends LazyLoadingDisabled ? EagerTagContent : LazyTagContent

export declare const TagContent: (new (init: ModelInit<TagContent>) => TagContent) & {
  copyOf(source: TagContent, mutator: (draft: MutableModel<TagContent>) => MutableModel<TagContent> | void): TagContent;
}