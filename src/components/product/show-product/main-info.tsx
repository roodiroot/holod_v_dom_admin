import { ChipField, TextField } from "react-admin";
import Box from "@mui/material/Box";

const MainInfo = () => {
  return (
    <Box sx={{ maxWidth: "30rem" }}>
      <Box component='div' sx={{ display: "flex", gap: ".5rem" }}>
        <ChipField size='small' source='type.name' />
        <ChipField size='small' source='brand.name' />
      </Box>
      <TextField
        component='h3'
        sx={{ fontSize: "2rem", fontWeight: "bold" }}
        label='Название товара'
        source='name'
      />
      <TextField source='description' />
      <TextField source='id' />
    </Box>
  );
};

export default MainInfo;
