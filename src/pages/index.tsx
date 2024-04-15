import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as S from "../styles/Home/styles";
import { Base } from "../components/Base";
import { MainInput } from "../components/Input";
import { MainButton } from "../components/Button";
import { InputDate } from "../components/Input/InputDate";
import { MainSelect } from "../components/Select";
import { DateTime } from "luxon";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";

interface Property {
  id: string;
  nome: string;
  cnpj: string;
}

interface Laboratory {
  id: string;
  nome: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [properties, setProperties] = useState<Property[]>([]);
  const [laboratory, setLaboratory] = useState<Laboratory[]>([]);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/propriedades.json"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const fetchLaboratory = async () => {
      try {
        const response = await axios.get(
          "https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/laboratorios.json"
        );
        setLaboratory(response.data);
      } catch (error) {
        console.error("Error fetching laboratory:", error);
      }
    };

    fetchProperties();
    fetchLaboratory();
  }, []);

  const [selectedPropriedade, setSelectedPropriedade] = useState<string>("");
  const [selectedLaboratorio, setSelectedLaboratorio] = useState<string>("");
  const [selectedCnpj, setSelectedCnpj] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    if (
      !data.username ||
      !data.dataInicial ||
      !data.dataFinal ||
      !selectedPropriedade ||
      !selectedLaboratorio
    ) {
      setAlertMessage("Por favor, preencha todos os campos.");
      setAlertType("error");
      return;
    }
    const formData = {
      nome: data.username,
      dataInicial: DateTime.fromISO(data.dataInicial).toISO(),
      dataFinal: DateTime.fromISO(data.dataFinal).toISO(),
      infosPropriedade: {
        id: (
          properties.find((prop: any) => prop.nome === selectedPropriedade) || {
            id: null,
          }
        ).id,
        nome: selectedPropriedade,
      },
      cnpj: selectedCnpj,
      laboratorio: {
        id: (
          laboratory.find((lab: any) => lab.nome === selectedLaboratorio) || {
            id: null,
          }
        ).id,
        nome: selectedLaboratorio,
      },
      observacoes: data.observacoes,
    };

    console.log(formData);
    reset({
      username: "",
      dataInicial: "",
      dataFinal: "",
      observacoes: "",
    });

    setSelectedPropriedade("");
    setSelectedLaboratorio("");
    setSelectedCnpj(null);
    setAlertMessage("Formulário enviado, verifique o console.");
    setAlertType("success");
  };

  return (
    <Base>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.Container>
          <S.ContainerHeader>
            <h2 className="title">Teste front-end</h2>
            <MainButton />
          </S.ContainerHeader>
          <S.FormContainer>
            <div className="row">
              <MainInput
                register={register("username", { required: true })}
                placeholder={"Nome *"}
                tooltip="Insira o nome completo (Obrigatório)."
                error={errors.username}
              />
              <InputDate
                register={register("dataInicial", { required: true })}
                placeholder="Data Inicial *"
                tooltip="Insira a data inicial (Obrigatório)."
                error={errors.dataInicial}
              />

              <InputDate
                register={register("dataFinal", { required: true })}
                placeholder="Data Final *"
                tooltip="Insira a data final (Obrigatório)."
                error={errors.dataFinal}
              />
            </div>

            <div className="row">
              <MainSelect
                register={register("infosPropriedade", { required: true })}
                error={errors.infosPropriedade}
                tooltip="Selecione a propriedade (Obrigatório)."
                options={properties}
                selectedValue={selectedPropriedade}
                selectedCnpj={selectedCnpj}
                onSelectChange={(value, cnpj) => {
                  setSelectedPropriedade(value);
                  setSelectedCnpj(cnpj);
                }}
              />

              <MainSelect
                isLaboratory
                register={register("laboratorio", { required: true })}
                error={errors.laboratorio}
                tooltip="Selecione o laboratório (Obrigatório)."
                options={laboratory}
                selectedValue={selectedLaboratorio}
                selectedCnpj={selectedCnpj}
                onSelectChange={(value, cnpj) => {
                  setSelectedLaboratorio(value);
                }}
              />
            </div>
            <TextField
              {...register("observacoes")}
              id="standard-multiline-static"
              label="Observações"
              multiline
              rows={4}
              variant="standard"
              sx={{
                width: "100%",
              }}
            />
          </S.FormContainer>
        </S.Container>
      </form>

      {alertMessage && (
        <S.Alert>
          <Alert severity={alertType} onClose={() => setAlertMessage(null)}>
            {alertMessage}
          </Alert>
        </S.Alert>
      )}
    </Base>
  );
}
