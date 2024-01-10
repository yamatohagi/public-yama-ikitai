/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function useGtm() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || null;
  if (!gtmId) return undefined;

  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, []);
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return undefined;
}
