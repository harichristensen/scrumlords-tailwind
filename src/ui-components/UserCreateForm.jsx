/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { User } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
}) {
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
}
export default function UserCreateForm(props) {
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
    currentBooks: [],
    fines: [],
    firstName: undefined,
    lastName: undefined,
    admin: undefined,
    age: undefined,
    accountId: undefined,
    email: undefined,
  };
  const [currentBooks, setCurrentBooks] = React.useState(
    initialValues.currentBooks
  );
  const [fines, setFines] = React.useState(
    initialValues.fines ? JSON.stringify(initialValues.fines) : undefined
  );
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [admin, setAdmin] = React.useState(initialValues.admin);
  const [age, setAge] = React.useState(initialValues.age);
  const [accountId, setAccountId] = React.useState(initialValues.accountId);
  const [email, setEmail] = React.useState(initialValues.email);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCurrentBooks(initialValues.currentBooks);
    setCurrentCurrentBooksValue(undefined);
    setFines(initialValues.fines);
    setCurrentFinesValue(undefined);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setAdmin(initialValues.admin);
    setAge(initialValues.age);
    setAccountId(initialValues.accountId);
    setEmail(initialValues.email);
    setErrors({});
  };
  const [currentCurrentBooksValue, setCurrentCurrentBooksValue] =
    React.useState(undefined);
  const currentBooksRef = React.createRef();
  const [currentFinesValue, setCurrentFinesValue] = React.useState(undefined);
  const finesRef = React.createRef();
  const validations = {
    currentBooks: [{ type: "Required" }],
    fines: [{ type: "Required" }, { type: "JSON" }],
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    admin: [{ type: "Required" }],
    age: [{ type: "Required" }],
    accountId: [{ type: "Required" }],
    email: [],
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
          fines,
          firstName,
          lastName,
          admin,
          age,
          accountId,
          email,
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
          await DataStore.save(new User(modelFields));
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
      {...getOverrideProps(overrides, "UserCreateForm")}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              currentBooks: values,
              fines,
              firstName,
              lastName,
              admin,
              age,
              accountId,
              email,
            };
            const result = onChange(modelFields);
            values = result?.currentBooks ?? values;
          }
          setCurrentBooks(values);
          setCurrentCurrentBooksValue(undefined);
        }}
        currentFieldValue={currentCurrentBooksValue}
        label={"Current books"}
        items={currentBooks}
        hasError={errors.currentBooks?.hasError}
        setFieldValue={setCurrentCurrentBooksValue}
        inputFieldRef={currentBooksRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Current books"
          isRequired={true}
          isReadOnly={false}
          value={currentCurrentBooksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.currentBooks?.hasError) {
              runValidationTasks("currentBooks", value);
            }
            setCurrentCurrentBooksValue(value);
          }}
          onBlur={() =>
            runValidationTasks("currentBooks", currentCurrentBooksValue)
          }
          errorMessage={errors.currentBooks?.errorMessage}
          hasError={errors.currentBooks?.hasError}
          ref={currentBooksRef}
          {...getOverrideProps(overrides, "currentBooks")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines: values,
              firstName,
              lastName,
              admin,
              age,
              accountId,
              email,
            };
            const result = onChange(modelFields);
            values = result?.fines ?? values;
          }
          setFines(values);
          setCurrentFinesValue(undefined);
        }}
        currentFieldValue={currentFinesValue}
        label={"Fines"}
        items={fines}
        hasError={errors.fines?.hasError}
        setFieldValue={setCurrentFinesValue}
        inputFieldRef={finesRef}
        defaultFieldValue={undefined}
      >
        <TextAreaField
          label="Fines"
          isRequired={true}
          isReadOnly={false}
          value={currentFinesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.fines?.hasError) {
              runValidationTasks("fines", value);
            }
            setCurrentFinesValue(value);
          }}
          onBlur={() => runValidationTasks("fines", currentFinesValue)}
          errorMessage={errors.fines?.errorMessage}
          hasError={errors.fines?.hasError}
          ref={finesRef}
          {...getOverrideProps(overrides, "fines")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName: value,
              lastName,
              admin,
              age,
              accountId,
              email,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName,
              lastName: value,
              admin,
              age,
              accountId,
              email,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Admin"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName,
              lastName,
              admin: value,
              age,
              accountId,
              email,
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
      ></TextField>
      <TextField
        label="Age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              age: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName,
              lastName,
              admin,
              age: value,
              accountId,
              email,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <TextField
        label="Account id"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName,
              lastName,
              admin,
              age,
              accountId: value,
              email,
            };
            const result = onChange(modelFields);
            value = result?.accountId ?? value;
          }
          if (errors.accountId?.hasError) {
            runValidationTasks("accountId", value);
          }
          setAccountId(value);
        }}
        onBlur={() => runValidationTasks("accountId", accountId)}
        errorMessage={errors.accountId?.errorMessage}
        hasError={errors.accountId?.hasError}
        {...getOverrideProps(overrides, "accountId")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              currentBooks,
              fines,
              firstName,
              lastName,
              admin,
              age,
              accountId,
              email: value,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
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
