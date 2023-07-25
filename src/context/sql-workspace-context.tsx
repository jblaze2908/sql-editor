import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  // useMemo,
  useState,
} from "react";
import { executeQueryApi } from "@/api/api";
import {
  generateRandomId,
  getDefaultActiveTabs,
  getDefaultSavedQueries,
  getNewTab,
} from "@/utils/helperFunc";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import {
  QueryHistoryItem,
  QueryResult,
  ResultsActiveTab,
  SavedQueryItem,
  TabData,
} from "@/utils/schemas/SqlWorkspace.types";
import { showToastMessage } from "@/components/lib/ToastMessage";

interface SqlWorkspaceContextData {
  activeTabs: TabData[];
  isLoading: boolean;
  editorValue: string;
  updateEditorValue: (val: string) => void;
  queryHistory: QueryHistoryItem[];
  executeQuery: (queryFromArgs?: string) => void;
  savedQueries: SavedQueryItem[];
  saveQuery: (title: string) => void;
  createNewTab: () => void;
  deleteTab: (id: string) => void;
  switchToTab: (id: string) => void;
  restoreSavedQuery: (id: string) => void;
  queryResults?: QueryResult;
  queryResultsFilterValue: string;
  queryResultsActiveTab: ResultsActiveTab;
  setQueryResultsFilterValue: (val: string) => void;
  setQueryResultsActiveTab: (val: ResultsActiveTab) => void;
}
interface SqlWorkspaceProviderProps {
  children: React.ReactNode;
}

const SqlWorkspaceContext = createContext<SqlWorkspaceContextData>({
  activeTabs: [],
  isLoading: false,
  editorValue: "",
  updateEditorValue: () => {},
  queryHistory: [],
  executeQuery: () => {},
  savedQueries: [],
  saveQuery: () => {},
  createNewTab: () => {},
  deleteTab: () => {},
  switchToTab: () => {},
  restoreSavedQuery: () => {},
  queryResults: undefined,
  queryResultsFilterValue: "",
  queryResultsActiveTab: "RESULTS",
  setQueryResultsFilterValue: () => {},
  setQueryResultsActiveTab: () => {},
});

const SqlWorkspaceProvider = ({ children }: SqlWorkspaceProviderProps) => {
  const [editorValue, setEditorValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<QueryResult>();
  const [queryResultsActiveTab, setQueryResultsActiveTab] =
    useState<ResultsActiveTab>("RESULTS");
  const [queryResultsFilterValue, setQueryResultsFilterValue] = useState("");
  const [activeTabs, setActiveTabs] = useState<TabData[]>(
    getDefaultActiveTabs()
  );
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  const {
    storedValue: savedQueries,
    setValueBasedOnPreviousValue: setSavedQueries,
  } = useLocalStorage<SavedQueryItem[]>(
    "savedQueries",
    getDefaultSavedQueries()
  );

  const addQueryToHistory = useCallback(
    (query: string, success: boolean, response?: QueryResult) => {
      const historyItem: QueryHistoryItem = {
        Action: query.replace(/\s+/g, " ").trim(),
        Result:
          success && response
            ? `${response.rows.length} row(s) fetched`
            : "Failed to fetch",
      };
      startTransition(() => {
        setQueryHistory((prev) => [...prev, historyItem]);
      });
    },
    []
  );
  const executeQuery = useCallback(
    async (queryFromArgs?: string) => {
      try {
        const query = queryFromArgs || editorValue;
        if (!query || isLoading) return;
        setIsLoading(true);
        const response = await executeQueryApi(query);
        addQueryToHistory(query, true, response);
        setQueryResults(response);
      } catch (err) {
        addQueryToHistory(editorValue, false, undefined);
        setQueryResults(undefined);
        showToastMessage("error", "There was some issue while fetching.");
      } finally {
        setIsLoading(false);
      }
    },
    [editorValue, isLoading]
  );

  const updateEditorValue = setEditorValue;

  const updateStateAccordingToTab = (tab: TabData) => {
    setEditorValue(tab.editorValue);
    setQueryResults(tab.queryResult);
    setQueryResultsActiveTab(tab.resultsActiveTab);
    setQueryResultsFilterValue(tab.filterValue);
  };

  const saveCurrentTabDataToObject = (tabData: TabData) => {
    tabData.queryResult = queryResults;
    tabData.editorValue = editorValue;
    tabData.filterValue = queryResultsFilterValue;
    tabData.resultsActiveTab = queryResultsActiveTab;
  };
  const deleteTab = useCallback(
    (id: string) => {
      const updatedTabs = activeTabs.filter((tab) => tab.id !== id);
      setActiveTabs(updatedTabs);
    },
    [activeTabs]
  );

  useEffect(() => {
    if (activeTabs.length) {
      const activeTab = activeTabs.find((item) => item.isActive);
      if (!activeTab) {
        switchToTab(activeTabs[0].id);
      }
    } else {
      createNewTab();
    }
  }, [activeTabs.length]);
  const createNewTab = useCallback(
    (initialEditorValue: string = "") => {
      if (isLoading) return;
      if (activeTabs.length >= 8) {
        showToastMessage("error", "You can only create upto 8 tabs.");
        return;
      }
      const updatedTabs = activeTabs.map((tab) => {
        if (tab.isActive) saveCurrentTabDataToObject(tab);
        return { ...tab, isActive: false };
      });
      const newTab: TabData = getNewTab(
        initialEditorValue,
        updatedTabs.length + 1
      );
      setActiveTabs([...updatedTabs, newTab]);
      updateStateAccordingToTab(newTab);
    },
    [isLoading, activeTabs]
  );
  const switchToTab = useCallback(
    (id: string) => {
      if (isLoading) return;
      const updatedTabs = activeTabs.map((tab) => {
        if (tab.isActive) saveCurrentTabDataToObject(tab);
        return { ...tab, isActive: tab.id === id };
      });
      const activeTab = updatedTabs.find((tab) => tab.isActive);
      setActiveTabs(updatedTabs);
      if (activeTab) updateStateAccordingToTab(activeTab);
    },
    [isLoading, activeTabs]
  );
  const saveQuery = (title: string) => {
    setSavedQueries((prev: SavedQueryItem[]) => [
      ...prev,
      { id: generateRandomId(10), title, query: editorValue },
    ]);
  };
  const restoreSavedQuery = (id: string) => {
    const savedQuery = savedQueries.find(
      (query: SavedQueryItem) => query.id === id
    );
    if (savedQuery) createNewTab(savedQuery.query);
  };
  const sqlWorkspaceData = {
    activeTabs,
    isLoading,
    editorValue,
    updateEditorValue,
    queryHistory,
    executeQuery,
    savedQueries,
    saveQuery,
    createNewTab,
    deleteTab,
    switchToTab,
    restoreSavedQuery,
    queryResults,
    queryResultsFilterValue,
    setQueryResultsFilterValue,
    queryResultsActiveTab,
    setQueryResultsActiveTab,
  };

  return (
    <SqlWorkspaceContext.Provider value={sqlWorkspaceData}>
      {children}
    </SqlWorkspaceContext.Provider>
  );
};

const useSqlWorkspace = () => {
  const context = useContext(SqlWorkspaceContext);
  if (!context) {
    throw new Error(
      "useSqlWorkspace must be used within an SqlWorkspaceProvider"
    );
  }
  return context;
};

export { SqlWorkspaceProvider, useSqlWorkspace };
