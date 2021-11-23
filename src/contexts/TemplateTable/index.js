import { jsonToExel } from "helpers";
import { useQuery } from "hooks";
import { createContext, useMemo, useState } from "react";

export const TemplateTableContext = createContext();
export const TemplateModalContext = createContext();

export const TemplateTableContextProvider = (props) => {
  const { children, fetchGrid, fetchData } = props;

  const [modalForm, setModalForm] = useState({
    visible: false,
    data: null,
  });

  const {
    data: gridData,
    loading: gridDataLoading,
    refresh: gridDataRefresh,
    error: gridDataError,
  } = useQuery(fetchGrid);

  const {
    data,
    loading: dataLoading,
    refresh: dataRefresh,
    error: dataError,
  } = useQuery(fetchData);

  const isLoading = !!(gridDataLoading || dataLoading);
  const isErrored = !!(dataError && gridDataError);
  const isReady = !!(data && gridData);

  const methods = useMemo(
    () => ({
      refreshPage: () => {
        // gridDataRefresh();
        dataRefresh();
      },
      exportData: () => {
        const str = jsonToExel(data, gridData?.columns);
        console.log(`exported data:\n`, str);
      },
      editObject: (recordKey) => {
        const record = data.find(({ key }) => key === recordKey);

        setModalForm({
          visible: true,
          data: gridData.columns.map(({ title, key }) => [title, record[key]]),
        });
      },
    }),
    [gridDataRefresh, dataRefresh, data, gridData]
  );

  const toolbarActions = useMemo(
    () =>
      gridData?.toolbar
        ? gridData.toolbar.map((action) => ({
            ...action,
            runMethod: methods[action.operationMethod] || (() => {}),
            disabled: isLoading,
          }))
        : [],
    [methods, gridData, data, isLoading]
  );
  const contextActions = useMemo(
    () =>
      gridData?.contextOperations
        ? gridData.contextOperations.map((action) => ({
            ...action,
            runMethod: methods[action.method] || (() => {}),
          }))
        : [],
    [methods, gridData]
  );

  const tableValue = {
    gridData,
    data,
    toolbarActions,
    contextActions,
    dblClickAction: methods.editObject,
    isLoading,
    isErrored,
    isReady,
  };
  const modalValue = {
    ...modalForm,
    close: () => setModalForm(false),
  };
  return (
    <TemplateTableContext.Provider value={tableValue}>
      <TemplateModalContext.Provider value={modalValue}>
        {children}
      </TemplateModalContext.Provider>
    </TemplateTableContext.Provider>
  );
};
