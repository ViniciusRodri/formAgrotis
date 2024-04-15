import React, { useEffect } from "react";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import * as S from "./styles";
import Tooltip from "@mui/material/Tooltip";
import { Alert } from "../Icons/alert";

interface ISelectProps {
  isLaboratory?: boolean;
  error: any;
  tooltip?: string;
  register: any;
  options: any[];
  selectedValue: string;
  selectedCnpj: string | null;
  onSelectChange: (
    value: string,
    cnpj: string | null,
    isLaboratory?: boolean
  ) => void;
}

export const MainSelect = ({
  isLaboratory,
  error,
  tooltip,
  register,
  options,
  selectedValue,
  selectedCnpj,
  onSelectChange,
}: ISelectProps) => {
  useEffect(() => {
    const selectedData = options.find((item) => item.nome === selectedValue);
    const cnpj = selectedData ? selectedData.cnpj : null;
    onSelectChange(selectedValue, cnpj);
  }, [selectedValue, options]);

  return (
    <Tooltip title={tooltip}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="select-label">
          {isLaboratory ? "Laboratório *" : "Propriedade *"}
        </InputLabel>
        <MuiSelect
          {...register}
          value={selectedValue}
          label={isLaboratory ? "Laboratório *" : "Propriedade *"}
          onChange={(event) =>
            onSelectChange(event.target.value as string, null, isLaboratory)
          }
          sx={{
            width: "100%",
          }}
        >
          {options.map((item) => (
            <MenuItem key={item.id} value={item.nome}>
              {selectedValue === item.nome ? (
                item.nome
              ) : (
                <S.infoSelect>
                  {item.nome}
                  <p>{item.cnpj}</p>
                </S.infoSelect>
              )}
            </MenuItem>
          ))}
        </MuiSelect>

        {error && (
          <S.Error>
            <Alert />
            {tooltip}
          </S.Error>
        )}

        {selectedCnpj && !isLaboratory && (
          <Typography variant="caption" color="textSecondary">
            CNPJ: {selectedCnpj}
          </Typography>
        )}
      </FormControl>
    </Tooltip>
  );
};
