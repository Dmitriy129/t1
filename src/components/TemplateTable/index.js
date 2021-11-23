import Table from "components/Table";
import ModalForm from "components/ModalForm";
import { TemplateTableContextProvider } from "contexts/TemplateTable";

const TemplateTable = (props) => {
  const { fetchGrid, fetchData } = props;

  return (
    <TemplateTableContextProvider fetchGrid={fetchGrid} fetchData={fetchData}>
      <Table />
      <ModalForm />
    </TemplateTableContextProvider>
  );
};

export default TemplateTable;
