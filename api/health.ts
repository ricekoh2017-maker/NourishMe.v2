import { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  endpoints: {
    nourishMeV2: string;
    foodDataCentral: string;
  };
}

const startTime = Date.now();

export default async function healthHandler(req: Request, res: Response) {
  const dataGovKeyPresent = Boolean(process.env.DATA_GOV_KEY);
  
  const payload: HealthResponse = {
    status: 'ok',
    service: 'SilverApron SG / NourishMe API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      nourishMeV2: '/api/NourishMev2',
      foodDataCentral: dataGovKeyPresent ? 'Active (Configured Key)' : 'Active (DEMO_KEY mode)',
    },
  };

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(payload);
}
