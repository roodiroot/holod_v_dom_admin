import { Show, useShowController } from "react-admin";
import Box from "@mui/material/Box";
import Slider from "./show-product/slider";
import OptionCollar from "./show-product/option-collar";
import MainInfo from "./show-product/main-info";
import TitleChangePage from "../ui/title-change-page";

const ProductsShow = () => {
  const {
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isLoading, // boolean that is true until the record is available for the first time
    record, // record fetched via dataProvider.getOne() based on the id from the location
  } = useShowController();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }
  return (
    <Show
      component='div'
      title={record?.name}
      sx={{
        border: "none",
        boxShadow: "unset",
        mt: "1rem",
        borderRadius: "8px",
        bgcolor: (theme: any) => theme.palette.grey[100],
      }}
    >
      <Box sx={{ pl: "1rem" }}>
        <TitleChangePage title='Товар:' />
      </Box>
      <Box
        component='div'
        sx={{ p: "1rem", display: "flex", alignItems: "start", gap: "1rem" }}
      >
        {record?.logo && (
          <Box
            content='img'
            src={`${import.meta.env.VITE_APP_IMG}/${record.logo}`}
            title='green iguana'
            component={"img"}
            sx={{
              borderRadius: "4px",
              maxWidth: 150,
              objectFit: "cover",
              aspectRatio: "2/3",
              cursor: "pointer",
            }}
          />
        )}
        {record.img.length && <Slider imgs={record.img} />}
      </Box>
      <Box sx={{ p: "1rem" }}>
        <MainInfo />
      </Box>
      <Box sx={{ p: "1rem" }}>
        {record?.options?.length ? <OptionCollar /> : null}
      </Box>
    </Show>
  );
};

export default ProductsShow;
