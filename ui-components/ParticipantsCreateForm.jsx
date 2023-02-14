/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Participants } from "../models";
import { fetchByPath, validateField } from "./utils";
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
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
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
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
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
  const arraySection = (
    <React.Fragment>
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
                {getBadgeText ? getBadgeText(value) : value.toString()}
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
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
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
      {arraySection}
    </React.Fragment>
  );
}
export default function ParticipantsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    createdAt: "",
    updatedAt: "",
    discordId: "",
    discordName: "",
    role: [],
    file: "",
  };
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [discordId, setDiscordId] = React.useState(initialValues.discordId);
  const [discordName, setDiscordName] = React.useState(
    initialValues.discordName
  );
  const [role, setRole] = React.useState(initialValues.role);
  const [file, setFile] = React.useState(initialValues.file);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setDiscordId(initialValues.discordId);
    setDiscordName(initialValues.discordName);
    setRole(initialValues.role);
    setCurrentRoleValue(undefined);
    setFile(initialValues.file);
    setErrors({});
  };
  const [currentRoleValue, setCurrentRoleValue] = React.useState(undefined);
  const roleRef = React.createRef();
  const getDisplayValue = {
    role: (r) => {
      const enumDisplayValueMap = {
        EXHIBITOR: "Exhibitor",
        STAFF: "Staff",
        ADMINISTRATOR: "Administrator",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    createdAt: [{ type: "Required" }],
    updatedAt: [{ type: "Required" }],
    discordId: [{ type: "Required" }],
    discordName: [{ type: "Required" }],
    role: [{ type: "Required" }],
    file: [{ type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
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
          createdAt,
          updatedAt,
          discordId,
          discordName,
          role,
          file,
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
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Participants(modelFields));
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
      {...getOverrideProps(overrides, "ParticipantsCreateForm")}
      {...rest}
    >
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt: value,
              updatedAt,
              discordId,
              discordName,
              role,
              file,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={updatedAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt: value,
              discordId,
              discordName,
              role,
              file,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <TextField
        label="Discord id"
        isRequired={true}
        isReadOnly={false}
        value={discordId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              discordId: value,
              discordName,
              role,
              file,
            };
            const result = onChange(modelFields);
            value = result?.discordId ?? value;
          }
          if (errors.discordId?.hasError) {
            runValidationTasks("discordId", value);
          }
          setDiscordId(value);
        }}
        onBlur={() => runValidationTasks("discordId", discordId)}
        errorMessage={errors.discordId?.errorMessage}
        hasError={errors.discordId?.hasError}
        {...getOverrideProps(overrides, "discordId")}
      ></TextField>
      <TextField
        label="Discord name"
        isRequired={true}
        isReadOnly={false}
        value={discordName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              discordId,
              discordName: value,
              role,
              file,
            };
            const result = onChange(modelFields);
            value = result?.discordName ?? value;
          }
          if (errors.discordName?.hasError) {
            runValidationTasks("discordName", value);
          }
          setDiscordName(value);
        }}
        onBlur={() => runValidationTasks("discordName", discordName)}
        errorMessage={errors.discordName?.errorMessage}
        hasError={errors.discordName?.hasError}
        {...getOverrideProps(overrides, "discordName")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              discordId,
              discordName,
              role: values,
              file,
            };
            const result = onChange(modelFields);
            values = result?.role ?? values;
          }
          setRole(values);
          setCurrentRoleValue(undefined);
        }}
        currentFieldValue={currentRoleValue}
        label={"Role"}
        items={role}
        hasError={errors.role?.hasError}
        getBadgeText={getDisplayValue.role}
        setFieldValue={setCurrentRoleValue}
        inputFieldRef={roleRef}
        defaultFieldValue={undefined}
      >
        <SelectField
          label="Role"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentRoleValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.role?.hasError) {
              runValidationTasks("role", value);
            }
            setCurrentRoleValue(value);
          }}
          onBlur={() => runValidationTasks("role", currentRoleValue)}
          errorMessage={errors.role?.errorMessage}
          hasError={errors.role?.hasError}
          ref={roleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "role")}
        >
          <option
            children="Exhibitor"
            value="EXHIBITOR"
            {...getOverrideProps(overrides, "roleoption0")}
          ></option>
          <option
            children="Staff"
            value="STAFF"
            {...getOverrideProps(overrides, "roleoption1")}
          ></option>
          <option
            children="Administrator"
            value="ADMINISTRATOR"
            {...getOverrideProps(overrides, "roleoption2")}
          ></option>
        </SelectField>
      </ArrayField>
      <TextField
        label="File"
        isRequired={false}
        isReadOnly={false}
        value={file}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              discordId,
              discordName,
              role,
              file: value,
            };
            const result = onChange(modelFields);
            value = result?.file ?? value;
          }
          if (errors.file?.hasError) {
            runValidationTasks("file", value);
          }
          setFile(value);
        }}
        onBlur={() => runValidationTasks("file", file)}
        errorMessage={errors.file?.errorMessage}
        hasError={errors.file?.hasError}
        {...getOverrideProps(overrides, "file")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
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
