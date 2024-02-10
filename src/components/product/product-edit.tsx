import { Edit, TabbedForm, useRecordContext } from "react-admin";
import BasicTub from "./create-inputs/basic-tub";
import ImagesTubChange from "./create-inputs/images-tub-change";
import CollarPricesTub from "./create-inputs/collar-prices-tub";

const ProductTitle = () => {
  const record = useRecordContext();
  return record ? <span>Редактируем "{record?.name}"</span> : null;
};

const ProductEdit = () => (
  <Edit
    title={<ProductTitle />}
    component={"div"}
    sx={{
      mt: "1rem",
      borderRadius: "8px",
      bgcolor: (theme: any) => theme.palette.grey[100],
    }}
  >
    <TabbedForm>
      <TabbedForm.Tab label='Основные' sx={{ maxWidth: "40em" }}>
        <BasicTub />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label='Изображения'
        path='details'
        sx={{ maxWidth: "40em" }}
      >
        <ImagesTubChange />
      </TabbedForm.Tab>
      <TabbedForm.Tab label='Характеристики' sx={{ maxWidth: "70em" }}>
        <CollarPricesTub />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default ProductEdit;
