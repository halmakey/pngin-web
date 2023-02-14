import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum ParticipantRole {
  EXHIBITOR = "EXHIBITOR",
  STAFF = "STAFF",
  ADMINISTRATOR = "ADMINISTRATOR"
}

export enum ContentShape {
  SQUARE = "SQUARE",
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE"
}



type EagerContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly updatedAt: number;
  readonly contentTags?: ContentContentTag[] | null;
  readonly file: string;
  readonly comment: string;
  readonly seq: number;
  readonly createdAt?: string | null;
}

type LazyContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly updatedAt: number;
  readonly contentTags: AsyncCollection<ContentContentTag>;
  readonly file: string;
  readonly comment: string;
  readonly seq: number;
  readonly createdAt?: string | null;
}

export declare type Content = LazyLoading extends LazyLoadingDisabled ? EagerContent : LazyContent

export declare const Content: (new (init: ModelInit<Content>) => Content) & {
  copyOf(source: Content, mutator: (draft: MutableModel<Content>) => MutableModel<Content> | void): Content;
}

type EagerContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly comment?: string | null;
  readonly contents?: (ContentContentTag | null)[] | null;
}

type LazyContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly comment?: string | null;
  readonly contents: AsyncCollection<ContentContentTag>;
}

export declare type ContentTag = LazyLoading extends LazyLoadingDisabled ? EagerContentTag : LazyContentTag

export declare const ContentTag: (new (init: ModelInit<ContentTag>) => ContentTag) & {
  copyOf(source: ContentTag, mutator: (draft: MutableModel<ContentTag>) => MutableModel<ContentTag> | void): ContentTag;
}

type EagerParticipants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Participants, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly discordId: string;
  readonly discordName: string;
  readonly role?: ParticipantRole[] | keyof typeof ParticipantRole | null;
  readonly file?: string | null;
}

type LazyParticipants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Participants, 'id'>;
  };
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly discordId: string;
  readonly discordName: string;
  readonly role?: ParticipantRole[] | keyof typeof ParticipantRole | null;
  readonly file?: string | null;
}

export declare type Participants = LazyLoading extends LazyLoadingDisabled ? EagerParticipants : LazyParticipants

export declare const Participants: (new (init: ModelInit<Participants>) => Participants) & {
  copyOf(source: Participants, mutator: (draft: MutableModel<Participants>) => MutableModel<Participants> | void): Participants;
}

type EagerContentContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentContentTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly contentTagId?: string | null;
  readonly content: Content;
  readonly contentTag: ContentTag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContentContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentContentTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly contentTagId?: string | null;
  readonly content: AsyncItem<Content>;
  readonly contentTag: AsyncItem<ContentTag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContentContentTag = LazyLoading extends LazyLoadingDisabled ? EagerContentContentTag : LazyContentContentTag

export declare const ContentContentTag: (new (init: ModelInit<ContentContentTag>) => ContentContentTag) & {
  copyOf(source: ContentContentTag, mutator: (draft: MutableModel<ContentContentTag>) => MutableModel<ContentContentTag> | void): ContentContentTag;
}