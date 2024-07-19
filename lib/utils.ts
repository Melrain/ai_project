import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};

export const formatTime = (isoTimeStr: string) => {
  const date = new Date(isoTimeStr);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const formattedTimeStr = `${month}-${day} ${hours}:${minutes}`;
  return formattedTimeStr;
};

export const formatDateToMonthDay = (dateString: string) => {
  // 创建一个Date对象
  const date = new Date(dateString);

  // 获取月份和日期
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，因此需要加1
  const day = date.getUTCDate().toString().padStart(2, '0'); // 日期

  // 返回格式化的字符串
  return `${month}-${day}`;
};

export function groupByDay(data: any[]) {
  const groupedData: { [key: string]: any[] } = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const day = date.toISOString().split('T')[0]; // 获取日期部分，格式为 YYYY-MM-DD

    if (!groupedData[day]) {
      groupedData[day] = [];
    }

    groupedData[day].push(item);
  });

  return groupedData;
}
