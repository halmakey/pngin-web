/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContentTagCreateFormInputValues = {
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    comment?: string;
};
export declare type ContentTagCreateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContentTagCreateFormOverridesProps = {
    ContentTagCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContentTagCreateFormProps = React.PropsWithChildren<{
    overrides?: ContentTagCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContentTagCreateFormInputValues) => ContentTagCreateFormInputValues;
    onSuccess?: (fields: ContentTagCreateFormInputValues) => void;
    onError?: (fields: ContentTagCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContentTagCreateFormInputValues) => ContentTagCreateFormInputValues;
    onValidate?: ContentTagCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContentTagCreateForm(props: ContentTagCreateFormProps): React.ReactElement;
