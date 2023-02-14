/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Participants } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ParticipantsUpdateFormInputValues = {
    createdAt?: string;
    updatedAt?: string;
    discordId?: string;
    discordName?: string;
    role?: string[];
    file?: string;
};
export declare type ParticipantsUpdateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    discordId?: ValidationFunction<string>;
    discordName?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    file?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ParticipantsUpdateFormOverridesProps = {
    ParticipantsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    discordId?: PrimitiveOverrideProps<TextFieldProps>;
    discordName?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<SelectFieldProps>;
    file?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ParticipantsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ParticipantsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    participants?: Participants;
    onSubmit?: (fields: ParticipantsUpdateFormInputValues) => ParticipantsUpdateFormInputValues;
    onSuccess?: (fields: ParticipantsUpdateFormInputValues) => void;
    onError?: (fields: ParticipantsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ParticipantsUpdateFormInputValues) => ParticipantsUpdateFormInputValues;
    onValidate?: ParticipantsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ParticipantsUpdateForm(props: ParticipantsUpdateFormProps): React.ReactElement;
