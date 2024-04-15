import { TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Alert } from "../../Icons/alert";
import * as S from "../styles";

interface IMainInputDate {
  placeholder: string;
  tooltip?: string;
  error: any;
  register: any;
}

export const InputDate = ({
  placeholder,
  tooltip,
  register,
  error,
}: IMainInputDate) => {
  return (
    <Tooltip title={tooltip}>
      <S.Container>
        <TextField
          id="date"
          {...register}
          variant="standard"
          label={placeholder}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            color: "#000000",
            width: "100%",
          }}
        />
        {error && (
          <div className="error">
            <Alert />
            {tooltip}
          </div>
        )}
      </S.Container>
    </Tooltip>
  );
};
