import { useMemo, useState } from "react";
import Table from "components/Table";
import ModalForm from "components/ModalForm";
import { useQuery } from "hooks";
import { fetchData, fetchGrid } from "data";
import { jsonToExel } from "helpers/jsonToExel";
import { Spin } from "antd";
import s from "./styles.module.css";

export const MainPage = () => {
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

  const methods = useMemo(
    () => ({
      refreshPage: () => {
        gridDataRefresh();
        dataRefresh();
      },
      exportData: () => {
        console.log("running", !!data, !!gridData);
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
          }))
        : [],
    [methods, gridData, data]
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

  const isLoading = !!(gridDataLoading || dataLoading);
  const isErrored = !!(dataError && gridDataError);
  const isReady = !!(data && gridData);

  if (isLoading)
    return (
      <div className={s.loaderContainer}>
        <Spin tip="Loading..." />
      </div>
    );
  else if (isErrored) return "some error";
  else if (isReady)
    return (
      <>
        <Table
          data={data}
          columns={gridData.columns}
          toolbarActions={toolbarActions}
          contextActions={contextActions}
          dblClickAction={methods.editObject}
        />
        <ModalForm
          data={modalForm.data}
          visible={modalForm.visible}
          close={() => setModalForm({ visible: false })}
        />
      </>
    );
  else return "smth went wrong";
};
