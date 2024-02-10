import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ReferenceInput,
  SelectInput,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const SongFilterSidebar = () => (
  <Card>
    <CardContent>
      <FilterList label='Тип компрессора' icon={<LocalAtmIcon />}>
        <FilterListItem label='Инвертор' value={{ invertor: "инвертор" }} />
        <FilterListItem
          label='Не инвертор'
          value={{ invertor: "не инвертор" }}
        />
      </FilterList>
      <FilterList label='Управление WiFi' icon={<LocalAtmIcon />}>
        <FilterListItem label='Да' value={{ wifi: "да" }} />
        <FilterListItem label='Нет' value={{ wifi: "нет" }} />
        <FilterListItem label='Да(Опция)' value={{ wifi: "да(опция)" }} />
      </FilterList>
      {/* <FilterList label='Типы' icon={<LocalAtmIcon />}>
        <FilterListItem label='11,12' value={{ typeId: [11, 12] }} />
        <FilterListItem label='11' value={{ typeId: 11 }} />
        <FilterListItem label='12' value={{ typeId: 12 }} />
      </FilterList>
      <FilterList label='Бренды' icon={<LocalAtmIcon />}>
        <FilterListItem label='1,3' value={{ brandId: [1, 3] }} />
        <FilterListItem label='1' value={{ brandId: 1 }} />
        <FilterListItem label='3' value={{ brandId: 3 }} />
      </FilterList> */}
      <FilterList label='Площадь помещения' icon={<LocalAtmIcon />}>
        <FilterListItem label='20' value={{ square: ["20", "23"] }} />
        <FilterListItem label='23' value={{ square: "23" }} />
        <FilterListItem label='25' value={{ square: "25" }} />
        <FilterListItem label='30' value={{ square: "30" }} />
      </FilterList>
      <FilterList label='Класс энегроэффективности' icon={<LocalAtmIcon />}>
        <FilterListItem label='A, B' value={{ energy: ["A", "B"] }} />
        <FilterListItem label='A' value={{ energy: "A" }} />
        <FilterListItem label='B' value={{ energy: "B" }} />
      </FilterList>
    </CardContent>
  </Card>
);

const filters = [
  <ReferenceInput source='typeId' reference='type' alwaysOn>
    <SelectInput optionText='name' label='Типы' />
  </ReferenceInput>,
  <ReferenceInput source='brandId' reference='brand' alwaysOn>
    <SelectInput optionText='name' label='Бренды' />
  </ReferenceInput>,
];

const ProductList = () => (
  <List
    filters={filters}
    aside={<SongFilterSidebar />}
    component='div'
    sx={{
      mt: "1rem",
      borderRadius: "8px",
      p: " 0 1rem",
      bgcolor: (theme: any) => theme.palette.grey[100],
    }}
  >
    <Datagrid rowClick='show'>
      <TextField source='name' label='Название' />
      <TextField
        maxWidth={{
          xl: "700px",
          lg: "450px",
          md: "300px",
          sm: "200px",
          default: "200px",
        }}
        source='description'
        label='Описание'
      />
      <TextField source='price' label='Цена' />
      <TextField source='typeId' label='Тип' />
      <TextField source='brandId' label='Бренд' />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProductList;
