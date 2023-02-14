/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ParticipantsCreateFormInputValues = {
    createdAt?: string;
    updatedAt?: string;
    discordId?: string;
    discordName?: string;
    role?: string[];
    file?: string;
};
export declare type ParticipantsCreateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    discordId?: ValidationFunction<string>;
    discordName?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    file?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ParticipantsCreateFormOverridesProps = {
    ParticipantsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    discordId?: PrimitiveOverrideProps<TextFieldProps>;
    discordName?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<SelectFieldProps>;
    file?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ParticipantsCreateFormProps = React.PropsWithChildren<{
    overrides?: ParticipantsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ParticipantsCreateFormInputValues) => ParticipantsCreateFormInputValues;
    onSuccess?: (fields: ParticipantsCreateFormInputValues) => void;
    onError?: (fields: ParticipantsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ParticipantsCreateFormInputValues) => ParticipantsCreateFormInputValues;
    onValidate?: ParticipantsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ParticipantsCreateForm(props: ParticipantsCreateFormProps): React.ReactElement;
