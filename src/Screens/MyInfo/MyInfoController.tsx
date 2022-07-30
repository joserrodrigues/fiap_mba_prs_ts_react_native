import React, { useState, FC } from "react";
import MyInfoView from "./MyInfoView";
import * as ImagePicker from "expo-image-picker";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";

export type FormDataType = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
};

type IProps = StackScreenProps<RootStackParamList, "MyInfo">;

const MyInfoController:FC<IProps> = ({ navigation }) => {

  const [image, setImage] = useState<string | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState<boolean>(false);

  //State que roda ao montar o componente
  const checkPermissions = async ():Promise<boolean> => {
    //Checa Permissão para acessar a biblioteca de fotos
    let infoLibrary: ImagePicker.MediaLibraryPermissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (infoLibrary.status !== "granted") {
      alert("Desculpe, precisamos da permissão para acessar a galeria");
      return false;
    }

    //Checa Permissão para acessar a Câmera
    let infoCamera: ImagePicker.CameraPermissionResponse = await ImagePicker.requestCameraPermissionsAsync();
    if (infoCamera.status !== "granted") {
      alert("Desculpe, precisamos da permissão para acessar a câmera");
      return false;
    }

    return true;
  };

  //Função para controlar a busca da image,
  const pickImage = async (type: number) => {
    let resultPermission:boolean = await checkPermissions();
    if (!resultPermission) {
      return;
    }

    //Determina os parametros da imagem como tipo de imagem permitido,
    //se permite editar a image, o formato da imagem e a qualidade
    let objectParams: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    
    let result: ImagePicker.ExpandImagePickerResult<ImagePicker.ImagePickerOptions>;
    if (type === 1) {
      //Busca as imagens da galeria
      result = await ImagePicker.launchImageLibraryAsync(objectParams);
    } else {      
        //Busca a imagem da camera
        result = await ImagePicker.launchCameraAsync(objectParams);
    }

    if (!result.cancelled) {
      setImage(result.uri);
    }    
    setShowPhotoOptions(false);
  };

  const toggleCameraOptions = () => {
    console.log(showPhotoOptions);
    setShowPhotoOptions(!showPhotoOptions);
  };

    const signInSchema: ObjectSchema<
      ObjectShape,
      AnyObject,
      TypeOfShape<ObjectShape>,
      AssertsShape<ObjectShape>
    > = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string()
        .email("E-mail não válido")
        .required("E-mail é obrigatório"),

      password: Yup.string()
        .required("Senha é obrigatório")
        .min(4, "Senha é curta - deveria ter ao menos 4 caracteres"),
    });


  const onSubmit = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    console.log(values);
  };

  return (
    <MyInfoView       
      image={image}
      showPhotoOptions={showPhotoOptions}
      signInSchema={signInSchema}
      onSubmit={onSubmit}
      pickImage={pickImage}
      toggleCameraOptions={toggleCameraOptions}
    />
  );
};

export default MyInfoController;
