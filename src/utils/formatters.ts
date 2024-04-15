import { DateTime } from 'luxon';

// ==============
// Moeda
// ==============
export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

// ==============
// Data e hora
// ==============
export const getDate = (): string => {
  return DateTime.local().toFormat('dd/LL/yyyy');
};

export const isFormatDate = (date: string): boolean => {
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexData.test(date);
};

export const isFormatDateTime = (date: string): boolean => {
  const regexData = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
  return regexData.test(date);
};

export const formatDate = (
  date: string | undefined | any,
  withYear: boolean = true,
): string => {
  if (withYear) {
    return DateTime.fromISO(date).plus({ hours: 3 }).toFormat('dd/LL/yyyy');
  } else {
    return DateTime.fromISO(date).plus({ hours: 3 }).toFormat('dd/LL');
  }
};

export const getDateDashboard = (): string => {
  return DateTime.local().setLocale('br').toFormat("EEE', 'dd' de 'MMMM' de 'yyyy'");
};

export const formatDateBRExtensive = (date: string, withHour?: boolean): string => {
  if (withHour) {
    return DateTime.fromISO(date)
      .setLocale('br')
      .toFormat("dd' de 'MMMM' de 'yyyy' ás 'HH:mm");
  } else {
    return DateTime.fromISO(date).setLocale('br').toFormat("dd' de 'MMMM' de 'yyyy'");
  }
};

export const difDateExpirationPlan = (date: string): number => {
  const newDate = new Date(date);
  const difDate = DateTime.fromJSDate(newDate).diffNow('days').toObject()?.days;
  return Number(difDate);
};

export const formatTime = (date: string): string => {
  return DateTime.fromISO(date).toFormat('HH:mm');
};

export const formatDateTime = (date: string | any): string => {
  if (!date) {
    return '';
  }
  return DateTime.fromISO(date).toFormat('dd/LL/yyyy HH:mm');
};

export const formatDateFromISO = (date: string | any): string => {
  return DateTime.fromISO(date).toFormat('yyyy-LL-dd');
};

export const formatDateTimeToDatabase = (date: string | any): string => {
  return DateTime.fromISO(date).toFormat("yyyy-LL-dd'T'HH:mm");
};

export const formatDateDatabase = (date?: string): string => {
  if (!date) {
    return '';
  }
  return DateTime.fromFormat(date, 'dd/LL/yyyy').toFormat('yyyy-LL-dd');
};

export const formatISODateDatabase = (date: string): string => {
  return DateTime.fromISO(date).setZone('UTC').toFormat('yyyy-LL-dd');
};

export const formatISODateInterface = (date: string): string => {
  return DateTime.fromISO(date).setZone('UTC').toFormat('dd/LL/yyyy');
};

export const formatDateDatabaseToInterface = (date: string): string => {
  return DateTime.fromFormat(date, 'yyyy-LL-dd').toFormat('dd/LL/yyyy');
};

export const formatDateTimeDatabase = (date: string): string => {
  return DateTime.fromFormat(date, 'dd/LL/yyyy HH:mm').toFormat('yyyy-LL-dd HH:mm');
};

export const formatPhoneAlternative = (value: string) => {
  return value.replaceAll('(', '').replaceAll(') ', '').replaceAll('-', '');
};

export const formatDateTimeNew = (date: string | any): string => {
  const formattedDate = DateTime.fromISO(date).toFormat('dd/LL/yyyy');
  const formattedTime = DateTime.fromISO(date).toFormat('HH:mm');

  return `${formattedDate} - ${formattedTime}`;
};

export const formatDateNew = (date: string | any): string => {
  const currentDate = DateTime.now().setZone('America/Sao_Paulo');
  const parsedDate = DateTime.fromISO(date).setZone('America/Sao_Paulo');

  if (currentDate.hasSame(parsedDate, 'day')) {
    // A data é igual à data de hoje
    return `Hoje ${parsedDate.toFormat('HH:mm')}`;
  } else if (currentDate.minus({ days: 1 }).hasSame(parsedDate, 'day')) {
    // A data é igual à data de ontem
    return `Ontem ${parsedDate.toFormat('HH:mm')}`;
  } else if (currentDate.minus({ days: 2 }).hasSame(parsedDate, 'day')) {
    // A data é igual à data de anteontem
    return `Anteontem ${parsedDate.toFormat('HH:mm')}`;
  } else {
    // Outros dias com nome do mês em português
    const formattedDate = parsedDate.setLocale('pt-BR');
    return formattedDate.toFormat('dd/LLLL');
  }
};

export const formatSpecialDateEnd = (date: string | undefined | any): string => {
  if (!date) return '';

  // Dividir a data em dia, mês e ano
  const dateParts = date?.split('/');
  if (dateParts.length !== 3) {
    return '-';
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const currentDate = DateTime.now().plus({ hours: 3 });
  const parsedDate = DateTime.fromObject({ year, month, day }).plus({ hours: 3 });

  if (!parsedDate.isValid) {
    return '-';
  }

  if (parsedDate.toISODate() === currentDate.toISODate()) {
    return 'Hoje';
  }

  const yesterday = currentDate.minus({ days: 1 });
  if (parsedDate.toISODate() === yesterday.toISODate()) {
    return 'Ontem';
  }

  const twoDaysAgo = currentDate.minus({ days: 2 });
  if (parsedDate.toISODate() === twoDaysAgo.toISODate()) {
    return 'Anteontem';
  }

  return parsedDate.toFormat('dd/LLLL', { locale: 'pt' });
};

// ==============
// Utilitários
// ==============
export const getRandomId = () => {
  return `${Math.random() * (100 - 2000) + 100}`;
};

export const formatCNPJ = (value: string) => {
  return value?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatCPF = (value: string) => {
  return value
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string) => {
  return value?.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
};

export const formatNumberRound = (value?: number) => {
  if (!value) {
    return 0;
  }
  const math = Number((Math.abs(value) * 100).toPrecision(15));
  return (Math.round(math) / 100) * Math.sign(value);
};

export const trimNumber = (param?: string): string | undefined => {
  return param?.replace(/[^0-9]/g, '');
};

export const formatPascalCase = (value?: string) => {
  return value
    ?.toLowerCase()
    ?.split(' ')
    ?.map((part) => part.replace(/^\D/g, (l) => l.toUpperCase()))
    ?.join(' ');
};

export const handleExpirationDate = (expirationDate: any, generateDays: any) => {
  if (generateDays && generateDays >= 0) {
    // Converte a data de texto para um objeto de data
    const dateParts = expirationDate?.split(' ');
    const day = parseInt(dateParts[0]);
    const month = dateParts[2];
    const year = parseInt(dateParts[4]);
    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const monthIndex = months.indexOf(month);
    const currentDate = new Date(year, monthIndex, day);

    // Subtrai os dias
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - generateDays);

    // Formata a nova data de volta para o formato de texto desejado
    const newDay = newDate.getDate();
    const newMonth = months[newDate.getMonth()];
    const newYear = newDate.getFullYear();
    const formattedDate = `${newDay} de ${newMonth} de ${newYear}`;

    return formattedDate;
  }
};

export const dateLessThanToday = (date: string) => {
  const today = DateTime.local().toFormat('dd/MM/yyyy');
  const formatedToday = DateTime.fromFormat(today, 'dd/MM/yyyy');
  const formatedDate = DateTime.fromFormat(date, 'dd/MM/yyyy');
  return formatedDate < formatedToday;
};

export const formatSecondsToDisplay = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
