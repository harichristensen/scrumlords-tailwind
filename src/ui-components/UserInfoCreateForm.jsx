/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { UserInfo } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function UserInfoCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    currentBooks: undefined,
    bookHistory: undefined,
    fines: undefined,
    admin: false,
    selfID: undefined,
  };
  const [currentBooks, setCurrentBooks] = React.useState(
    initialValues.currentBooks
      ? JSON.stringify(initialValues.currentBooks)
      : undefined
  );
  const [bookHistory, setBookHistory] = React.useState(
    initialValues.bookHistory
      ? JSON.stringify(initialValues.bookHistory)
      : undefined
  );
  const [fines, setFines] = React.useState(
    initialValues.fines ? JSON.stringify(initialValues.fines) : undefined
  );
  const [admin, setAdmin] = React.useState(initialValues.admin);
  const [selfID, setSelfID] = React.useState(initialValues.selfID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCurrentBooks(initialValues.currentBooks);
    setBookHistory(initialValues.bookHistory);
    setFines(initialValues.fines);
    setAdmin(initialValues.admin);
    setSelfID(initialValues.selfID);
    setErrors({});
  };
  const validations = {
    currentBooks: [{ type: "JSON" }],
    bookHistory: [{ type: "JSON" }],
    fines: [{ type: "JSON" }],
    admin: [],
    selfID: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          currentBooks,
          bookHistory,
          fines,
          admin,
          selfID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(new UserInfo(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "UserInfoCreateForm")}
    >
      <TextAreaField
        label="Current books"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks: value,
              bookHistory,
              fines,
              admin,
              selfID,
            };
            const result = onChange(modelFields);
            value = result?.currentBooks ?? value;
          }
          if (errors.currentBooks?.hasError) {
            runValidationTasks("currentBooks", value);
          }
          setCurrentBooks(value);
        }}
        onBlur={() => runValidationTasks("currentBooks", currentBooks)}
        errorMessage={errors.currentBooks?.errorMessage}
        hasError={errors.currentBooks?.hasError}
        {...getOverrideProps(overrides, "currentBooks")}
      ></TextAreaField>
      <TextAreaField
        label="Book history"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              bookHistory: value,
              fines,
              admin,
              selfID,
            };
            const result = onChange(modelFields);
            value = result?.bookHistory ?? value;
          }
          if (errors.bookHistory?.hasError) {
            runValidationTasks("bookHistory", value);
          }
          setBookHistory(value);
        }}
        onBlur={() => runValidationTasks("bookHistory", bookHistory)}
        errorMessage={errors.bookHistory?.errorMessage}
        hasError={errors.bookHistory?.hasError}
        {...getOverrideProps(overrides, "bookHistory")}
      ></TextAreaField>
      <TextAreaField
        label="Fines"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              bookHistory,
              fines: value,
              admin,
              selfID,
            };
            const result = onChange(modelFields);
            value = result?.fines ?? value;
          }
          if (errors.fines?.hasError) {
            runValidationTasks("fines", value);
          }
          setFines(value);
        }}
        onBlur={() => runValidationTasks("fines", fines)}
        errorMessage={errors.fines?.errorMessage}
        hasError={errors.fines?.hasError}
        {...getOverrideProps(overrides, "fines")}
      ></TextAreaField>
      <SwitchField
        label="Admin"
        defaultChecked={false}
        isDisabled={false}
        isChecked={admin}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              currentBooks,
              bookHistory,
              fines,
              admin: value,
              selfID,
            };
            const result = onChange(modelFields);
            value = result?.admin ?? value;
          }
          if (errors.admin?.hasError) {
            runValidationTasks("admin", value);
          }
          setAdmin(value);
        }}
        onBlur={() => runValidationTasks("admin", admin)}
        errorMessage={errors.admin?.errorMessage}
        hasError={errors.admin?.hasError}
        {...getOverrideProps(overrides, "admin")}
      ></SwitchField>
      <TextField
        label="Self id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              bookHistory,
              fines,
              admin,
              selfID: value,
            };
            const result = onChange(modelFields);
            value = result?.selfID ?? value;
          }
          if (errors.selfID?.hasError) {
            runValidationTasks("selfID", value);
          }
          setSelfID(value);
        }}
        onBlur={() => runValidationTasks("selfID", selfID)}
        errorMessage={errors.selfID?.errorMessage}
        hasError={errors.selfID?.hasError}
        {...getOverrideProps(overrides, "selfID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex {...getOverrideProps(overrides, "RightAlignCTASubFlex")}>
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
