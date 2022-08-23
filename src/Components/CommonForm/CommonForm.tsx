import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactNode,
  ForwardRefRenderFunction,
  FormEvent,
} from "react";
import { Formik, ErrorMessage } from "formik";
import { TextInput, View } from "react-native";
import { MsgError, SpaceBottom } from "./CommonFormStyles";
import { Input } from "react-native-elements";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";

export type FormListInfo = {
  name: string;
  label: string;
  placeholder: string;
  icon: string;
  secure: boolean;
  type: string;
};

type FormItems = {
  keyboard: TextInput | null;
  key: string;
};

export type FormCommonRefs = {
  submitForm: () => void;
};

type IProps = {
  signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  >;
  onSubmit: (values: any, formikHelpers: any) => void | Promise<any>;
  listInfo: FormListInfo[];
  hideBottomSpace?: boolean;
};

const CommonForm: ForwardRefRenderFunction<FormCommonRefs, IProps> = (
  { signInSchema, onSubmit, listInfo, hideBottomSpace },
  ref
) => {
  const itemsRef = useRef<FormItems[]>([]);
  let testSubmit: (e?: FormEvent<HTMLFormElement>) => void | undefined;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (testSubmit) {
        testSubmit();
      }
    },
  }));

  const addNewKeyboard = (e: TextInput | null, name: string) => {
    for (let index = 0; index < itemsRef.current.length; index++) {
      if (itemsRef.current[index].key === name) {
        return;
      }
    }

    itemsRef.current.push({
      keyboard: e,
      key: name,
    });
  };
  const checkNextKeyboard = (name: string) => {
    let finalPosition = 0;
    for (let index = 0; index < itemsRef.current.length; index++) {
      if (itemsRef.current[index].key === name) {
        finalPosition = index;
        break;
      }
    }

    let totalItems = itemsRef.current.length;
    if (totalItems - 1 === finalPosition) {
      testSubmit();
    } else {
      itemsRef.current[finalPosition + 1].keyboard!.focus();
    }
  };

  let initialValues: any = {};
  listInfo.forEach((element) => {
    initialValues[element.name] = "";
  });

  let bottomBox: any = null;
  if (!hideBottomSpace) {
    bottomBox = <SpaceBottom />;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, setFieldValue, handleSubmit } = formik;
        testSubmit = handleSubmit;

        let arrayItems: ReactNode[] = [];
        let indPos = 0;
        let indItem = 0;
        listInfo.forEach((element) => {
          arrayItems.push(
            <Input
              key={indPos}
              label={element.label}
              ref={(e) => addNewKeyboard(e, element.name)}
              onSubmitEditing={(e) => {
                checkNextKeyboard(element.name);
              }}
              placeholder={element.placeholder}
              onChangeText={(text) => setFieldValue(element.name, text)}
              leftIcon={{
                type: "font-awesome",
                name: element.icon,
                size: 14,
              }}
              secureTextEntry={element.secure}
              autoCompleteType={element.type}
            />
          );
          indPos++;
          arrayItems.push(
            <ErrorMessage key={indPos} name={element.name}>
              {(msg) => <MsgError>{msg}</MsgError>}
            </ErrorMessage>
          );
          indPos++;
          indItem++;
        });
        return (
          <View>
            {arrayItems}
            {bottomBox}
          </View>
        );
      }}
    </Formik>
  );
};

export default forwardRef(CommonForm);
