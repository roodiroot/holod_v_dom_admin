import { ImageField, ImageInput } from "react-admin";

const ImagesTub = () => {
  return (
    <>
      <ImageInput
        source='logo'
        accept='image/*'
        label='Загрузите основное изображение'
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <ImageInput
        multiple
        source='img'
        accept='image/*'
        label='Загрузите до 5ти изображений'
      >
        <ImageField source='src' title='title' />
      </ImageInput>
    </>
  );
};

export default ImagesTub;
