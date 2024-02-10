import { ArrayField, Datagrid, TextField } from "react-admin";
import { Box, Typography } from "@mui/material";

const OptionCollar = () => {
  return (
    <Box
      sx={{
        p: "0 1rem 1rem",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>
        Характеристики прибора:
      </Typography>
      <ArrayField source='options'>
        <Datagrid bulkActionButtons={false} sx={{ maxWidth: "40rem" }}>
          <TextField
            source='title'
            label='Параметр'
            sx={{ fontWeight: "medium" }}
          />
          <TextField source='description' label='Значение' />
        </Datagrid>
      </ArrayField>
    </Box>
  );
};

export default OptionCollar;
