/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { BookInfo } from "../models";
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
export default function BookInfoUpdateForm(props) {
  const {
    id,
    bookInfo,
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
    over18: false,
    title: undefined,
    author: undefined,
    description: undefined,
    numberAvailable: undefined,
    currentUsers: undefined,
  };
  const [over18, setOver18] = React.useState(initialValues.over18);
  const [title, setTitle] = React.useState(initialValues.title);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [numberAvailable, setNumberAvailable] = React.useState(
    initialValues.numberAvailable
  );
  const [currentUsers, setCurrentUsers] = React.useState(
    initialValues.currentUsers
      ? JSON.stringify(initialValues.currentUsers)
      : undefined
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...bookInfoRecord };
    setOver18(cleanValues.over18);
    setTitle(cleanValues.title);
    setAuthor(cleanValues.author);
    setDescription(cleanValues.description);
    setNumberAvailable(cleanValues.numberAvailable);
    setCurrentUsers(cleanValues.currentUsers);
    setErrors({});
  };
  const [bookInfoRecord, setBookInfoRecord] = React.useState(bookInfo);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(BookInfo, id) : bookInfo;
      setBookInfoRecord(record);
    };
    queryData();
  }, [id, bookInfo]);
  React.useEffect(resetStateValues, [bookInfoRecord]);
  const validations = {
    over18: [],
    title: [],
    author: [],
    description: [],
    numberAvailable: [],
    currentUsers: [{ type: "JSON" }],
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
          over18,
          title,
          author,
          description,
          numberAvailable,
          currentUsers,
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
          const original = await DataStore.query(BookInfo, id);
          await DataStore.save(
            BookInfo.copyOf(original, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "BookInfoUpdateForm")}
    >
      <SwitchField
        label="Over18"
        defaultChecked={false}
        isDisabled={false}
        isChecked={over18}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              over18: value,
              title,
              author,
              description,
              numberAvailable,
              currentUsers,
            };
            const result = onChange(modelFields);
            value = result?.over18 ?? value;
          }
          if (errors.over18?.hasError) {
            runValidationTasks("over18", value);
          }
          setOver18(value);
        }}
        onBlur={() => runValidationTasks("over18", over18)}
        errorMessage={errors.over18?.errorMessage}
        hasError={errors.over18?.hasError}
        {...getOverrideProps(overrides, "over18")}
      ></SwitchField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        defaultValue={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              over18,
              title: value,
              author,
              description,
              numberAvailable,
              currentUsers,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Author"
        isRequired={false}
        isReadOnly={false}
        defaultValue={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              over18,
              title,
              author: value,
              description,
              numberAvailable,
              currentUsers,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        defaultValue={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              over18,
              title,
              author,
              description: value,
              numberAvailable,
              currentUsers,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Number available"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={numberAvailable}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              numberAvailable: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              over18,
              title,
              author,
              description,
              numberAvailable: value,
              currentUsers,
            };
            const result = onChange(modelFields);
            value = result?.numberAvailable ?? value;
          }
          if (errors.numberAvailable?.hasError) {
            runValidationTasks("numberAvailable", value);
          }
          setNumberAvailable(value);
        }}
        onBlur={() => runValidationTasks("numberAvailable", numberAvailable)}
        errorMessage={errors.numberAvailable?.errorMessage}
        hasError={errors.numberAvailable?.hasError}
        {...getOverrideProps(overrides, "numberAvailable")}
      ></TextField>
      <TextAreaField
        label="Current users"
        isRequired={false}
        isReadOnly={false}
        defaultValue={currentUsers}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              over18,
              title,
              author,
              description,
              numberAvailable,
              currentUsers: value,
            };
            const result = onChange(modelFields);
            value = result?.currentUsers ?? value;
          }
          if (errors.currentUsers?.hasError) {
            runValidationTasks("currentUsers", value);
          }
          setCurrentUsers(value);
        }}
        onBlur={() => runValidationTasks("currentUsers", currentUsers)}
        errorMessage={errors.currentUsers?.errorMessage}
        hasError={errors.currentUsers?.hasError}
        {...getOverrideProps(overrides, "currentUsers")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
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
