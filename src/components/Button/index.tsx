import { Button, useTheme } from "@mui/material";

export const MainButton = () => {
  return (
    <Button
      type="submit"
      variant="text"
      size="medium"
      sx={{
        ":hover": {
          bgcolor: "#00A98E", 
          color: "#FFFF",
        },
        color: "#FFFF",
        width: "86px",
        height: "36px",
      }}
    >
      Salvar
    </Button>
  );
};
