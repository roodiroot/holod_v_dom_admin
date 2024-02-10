import { Grid } from "@mui/material";
import {
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from "react-admin";

const BasicTub = () => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={4}>
        <TextInput
          label='Введите название'
          source='name'
          validate={req}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ReferenceInput source='brandId' reference='brand'>
          <SelectInput
            label='Бренд устройства'
            optionText='name'
            fullWidth
            validate={req}
          />
        </ReferenceInput>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ReferenceInput source='typeId' reference='type'>
          <SelectInput
            label='Типы устройств'
            optionText='name'
            fullWidth
            validate={req}
          />
        </ReferenceInput>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextInput
          source='description'
          multiline={true}
          label='Описание товара'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput source='price' label='Цена' fullWidth />
      </Grid>
    </Grid>
  );
};

export default BasicTub;

const req = [required()];
