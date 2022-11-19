/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookInfoCreateFormInputValues = {
    title?: string;
    author?: string;
    description?: string;
    numberAvailable?: number;
    over18?: boolean;
};
export declare type BookInfoCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    numberAvailable?: ValidationFunction<number>;
    over18?: ValidationFunction<boolean>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookInfoCreateFormOverridesProps = {
    BookInfoCreateFormGrid?: FormProps<GridProps>;
    title?: FormProps<TextFieldProps>;
    author?: FormProps<TextFieldProps>;
    description?: FormProps<TextAreaFieldProps>;
    numberAvailable?: FormProps<TextFieldProps>;
    over18?: FormProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type BookInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: BookInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BookInfoCreateFormInputValues) => BookInfoCreateFormInputValues;
    onSuccess?: (fields: BookInfoCreateFormInputValues) => void;
    onError?: (fields: BookInfoCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: BookInfoCreateFormInputValues) => BookInfoCreateFormInputValues;
    onValidate?: BookInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function BookInfoCreateForm(props: BookInfoCreateFormProps): React.ReactElement;
