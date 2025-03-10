import { clsx, type ClassValue } from "clsx";
import querystring from 'querystring';
import { twMerge } from "tailwind-merge";

export const queryParamToString = (params?: Record<string, any>) => {
  const queryParams = querystring.stringify(
    Object.fromEntries(
      Object.entries(params ?? {}).filter(
        ([_, value]) => value !== '' && value !== undefined && value !== null
      )
    )
  );

  return queryParams;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
