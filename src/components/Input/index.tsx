import { TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Alert } from "../Icons/alert";
import * as S from "./styles";

interface IMainInput {
  placeholder: string;
  tooltip?: string;
  error: any;
  register: any;
}

export const MainInput = ({
  placeholder,
  tooltip,
  error,
  register,
}: IMainInput) => {
  return (
    <Tooltip title={tooltip}>
      <S.Container>
        <TextField
          {...register}
          id="standard-basic"
          label={placeholder}
          variant="standard"
          sx={{
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
