import { api } from '@/configs/api-client';

export type TCampaignStats = {
  published: number;
  pending: number;
  cancelled: number;
  overview: TCampaignOverview[];
};

export type TCampaignOverview = {
  month_num: number;
  published: number;
  pending: number;
  cancelled: number;
};

export type TDeviceStats = {
  total: number;
  active: number;
  available: number;
  offline: number;
};

export type TImpressionStats = {
  total: number;
  campaigns: number;
  month_num: number;
};

export type TRouteStats = {
  total: number;
  active: number;
};

export type TScreenStats = {
  total: number;
  active: number;
  available: number;
  offline: number;
};
export type TLogs = {
  count: number;
  results: {
    device_id: string;
    log_type: string;
    log: string;
    campaign: number;
    modified: string;
  }[];
};

export const getCampaignStats = async (): Promise<TCampaignStats> => {
  try {
    const response = await api.get(`/stats/camapaigns/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Campaign Stats!';
    throw new Error(errorMessage);
  }
};

export const getDeviceStats = async (): Promise<TDeviceStats> => {
  try {
    const response = await api.get(`/stats/devices/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Device Stats!';
    throw new Error(errorMessage);
  }
};
export const getImpressionStats = async (): Promise<TImpressionStats[]> => {
  try {
    const response = await api.get(`/stats/impressions/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Impressions Stats!';
    throw new Error(errorMessage);
  }
};

export const getRoutesStats = async (): Promise<TRouteStats> => {
  try {
    const response = await api.get(`/stats/routes/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Routes Stats!';
    throw new Error(errorMessage);
  }
};

export const getScreenStats = async (): Promise<TScreenStats> => {
  try {
    const response = await api.get(`/stats/screens/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Screen Stats!';
    throw new Error(errorMessage);
  }
};

export const getLogsStats = async (): Promise<TLogs> => {
  try {
    const response = await api.get(`/logs/`);
    return response.data;
  } catch {
    const errorMessage = 'Error Fetching Logs Data!';
    throw new Error(errorMessage);
  }
};
