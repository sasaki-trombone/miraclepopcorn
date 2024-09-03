import { createClient } from 'microcms-js-sdk';

export const microcmsClient = ({serviceDomain, apiKey}:{serviceDomain: string, apiKey:string}) => createClient({
  serviceDomain,
  apiKey,
});
