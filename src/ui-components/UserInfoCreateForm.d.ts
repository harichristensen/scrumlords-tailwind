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
export declare type UserInfoCreateFormInputValues = {
    currentBooks?: string;
    bookHistory?: string;
    fines?: string;
    admin?: boolean;
    selfID?: string;
};
export declare type UserInfoCreateFormValidationValues = {
    currentBooks?: ValidationFunction<string>;
    bookHistory?: ValidationFunction<string>;
    fines?: ValidationFunction<string>;
    admin?: ValidationFunction<boolean>;
    selfID?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserInfoCreateFormOverridesProps = {
    UserInfoCreateFormGrid?: FormProps<GridProps>;
    currentBooks?: FormProps<TextAreaFieldProps>;
    bookHistory?: FormProps<TextAreaFieldProps>;
    fines?: FormProps<TextAreaFieldProps>;
    admin?: FormProps<SwitchFieldProps>;
    selfID?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: UserInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserInfoCreateFormInputValues) => UserInfoCreateFormInputValues;
    onSuccess?: (fields: UserInfoCreateFormInputValues) => void;
    onError?: (fields: UserInfoCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserInfoCreateFormInputValues) => UserInfoCreateFormInputValues;
    onValidate?: UserInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserInfoCreateForm(props: UserInfoCreateFormProps): React.ReactElement;
