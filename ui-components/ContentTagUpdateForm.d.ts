/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ContentTag } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContentTagUpdateFormInputValues = {
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    comment?: string;
};
export declare type ContentTagUpdateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContentTagUpdateFormOverridesProps = {
    ContentTagUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContentTagUpdateFormProps = React.PropsWithChildren<{
    overrides?: ContentTagUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    contentTag?: ContentTag;
    onSubmit?: (fields: ContentTagUpdateFormInputValues) => ContentTagUpdateFormInputValues;
    onSuccess?: (fields: ContentTagUpdateFormInputValues) => void;
    onError?: (fields: ContentTagUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContentTagUpdateFormInputValues) => ContentTagUpdateFormInputValues;
    onValidate?: ContentTagUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ContentTagUpdateForm(props: ContentTagUpdateFormProps): React.ReactElement;
