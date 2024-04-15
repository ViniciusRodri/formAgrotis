import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import * as S from "./styles";

interface IBaseProps {
  children: ReactNode;
}

export const Base = ({ children }: IBaseProps): ReactElement => {
  return (
    <S.Base>
      <S.Header>
        <Image src="/Group.png" width={90} height={16} alt="agrotis logo" />
      </S.Header>
      {children}
    </S.Base>
  );
};
