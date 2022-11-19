/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { UserInfo } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserInfoUpdateFormInputValues = {
    currentBooks?: string;
    bookHistory?: string;
    fines?: string;
    admin?: boolean;
    selfID?: string;
};
export declare type UserInfoUpdateFormValidationValues = {
    currentBooks?: ValidationFunction<string>;
    bookHistory?: ValidationFunction<string>;
    fines?: ValidationFunction<string>;
    admin?: ValidationFunction<boolean>;
    selfID?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserInfoUpdateFormOverridesProps = {
    UserInfoUpdateFormGrid?: FormProps<GridProps>;
    currentBooks?: FormProps<TextAreaFieldProps>;
    bookHistory?: FormProps<TextAreaFieldProps>;
    fines?: FormProps<TextAreaFieldProps>;
    admin?: FormProps<SwitchFieldProps>;
    selfID?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userInfo?: UserInfo;
    onSubmit?: (fields: UserInfoUpdateFormInputValues) => UserInfoUpdateFormInputValues;
    onSuccess?: (fields: UserInfoUpdateFormInputValues) => void;
    onError?: (fields: UserInfoUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserInfoUpdateFormInputValues) => UserInfoUpdateFormInputValues;
    onValidate?: UserInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserInfoUpdateForm(props: UserInfoUpdateFormProps): React.ReactElement;
