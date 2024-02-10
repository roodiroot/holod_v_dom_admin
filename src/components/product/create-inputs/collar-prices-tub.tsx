import { ArrayInput, SimpleFormIterator, TextInput } from "react-admin";

const defaultValue = [
  { title: "Площадь помещения: м².", description: "" },
  { title: "Уровень шума: дб.", description: "" },
  { title: "Наличие WiFi:", description: "" },
  { title: "Тип компрессора:", description: "" },
  { title: "Класс энегроэффективности:", description: "" },
  { title: "Теплопроизводительность, kBTU", description: "" },
  { title: "Срок гарантии, мес.", description: "36" },
];

const CollarPricesTub = () => {
  return (
    <>
      Обязательные параметры фильтрации <br /> Площадь помещения: м². - число
      <br />
      Наличие WiFi: (да нет да(опция))
      <br />
      Серия
      <br />
      Срок гарантии, мес.
      <br />
      Теплопроизводительность, kBTU
      <br />
      <ArrayInput
        source='options'
        label='Характеристики'
        defaultValue={defaultValue}
      >
        <SimpleFormIterator sx={{ maxWidth: "40em" }} inline>
          <TextInput
            sx={{ width: "15rem" }}
            source='title'
            label='Параметр'
            helperText={false}
          />
          <TextInput source='description' label='Значение' helperText={false} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  );
};

export default CollarPricesTub;
