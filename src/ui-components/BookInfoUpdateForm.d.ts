/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { BookInfo } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookInfoUpdateFormInputValues = {
    over18?: boolean;
    title?: string;
    author?: string;
    description?: string;
    numberAvailable?: number;
    currentUsers?: string;
};
export declare type BookInfoUpdateFormValidationValues = {
    over18?: ValidationFunction<boolean>;
    title?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    numberAvailable?: ValidationFunction<number>;
    currentUsers?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookInfoUpdateFormOverridesProps = {
    BookInfoUpdateFormGrid?: FormProps<GridProps>;
    over18?: FormProps<SwitchFieldProps>;
    title?: FormProps<TextFieldProps>;
    author?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
    numberAvailable?: FormProps<TextFieldProps>;
    currentUsers?: FormProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type BookInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: BookInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bookInfo?: BookInfo;
    onSubmit?: (fields: BookInfoUpdateFormInputValues) => BookInfoUpdateFormInputValues;
    onSuccess?: (fields: BookInfoUpdateFormInputValues) => void;
    onError?: (fields: BookInfoUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: BookInfoUpdateFormInputValues) => BookInfoUpdateFormInputValues;
    onValidate?: BookInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BookInfoUpdateForm(props: BookInfoUpdateFormProps): React.ReactElement;
