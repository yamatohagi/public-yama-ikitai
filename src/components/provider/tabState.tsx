import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

type TabType = string;

export const useTabState = (initialTab?: TabType) => {
  const router = useRouter();

  // Fetch the initial tab from URL parameters if not provided
  const queryTab = (router.query.tab as TabType) || initialTab;

  const [activeTab, setActiveTabState] = useState<TabType | undefined>(queryTab);

  // Sync with URL when the tab changes
  const setActiveTab = (tabKey: TabType) => {
    setActiveTabState(tabKey);
    router.replace({query: {...router.query, tab: tabKey}});
  };

  // On initial render, ensure the query parameter is set correctly
  useEffect(() => {
    if (!router.isReady) return;
    if (activeTab && !router.query.tab) {
      router.replace({query: {...router.query, tab: activeTab}}, undefined, {shallow: true});
    }
  }, [router]);

  return {
    activeTab,
    setActiveTab,
  };
};
