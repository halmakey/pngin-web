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
  readonly tags?: (ContentTag | null)[] | null;
  readonly userID: string;
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
  readonly tags: AsyncCollection<ContentTag>;
  readonly userID: string;
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
  readonly comment?: string | null;
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
  readonly comment?: string | null;
  readonly contents: AsyncCollection<ContentTag>;
}

export declare type Tag = LazyLoading extends LazyLoadingDisabled ? EagerTag : LazyTag

export declare const Tag: (new (init: ModelInit<Tag>) => Tag) & {
  copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
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
  readonly file?: string | null;
  readonly contents?: (Content | null)[] | null;
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
  readonly file?: string | null;
  readonly contents: AsyncCollection<Content>;
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