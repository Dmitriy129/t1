import TemplateTable from "components/TemplateTable";
import { fetchData, fetchGrid } from "data";

export const MainPage = () => {
  return (
    <>
      Hello, I'm Main page!
      <TemplateTable fetchGrid={fetchGrid} fetchData={fetchData} />
    </>
  );
};
