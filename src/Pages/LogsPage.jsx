import { useLoaderData } from "react-router-dom";
import { JsonToTable } from "react-json-to-table";

const LogsPage = () => {
  const data = useLoaderData();
  // console.log(data);
  return (
    <div>
      <JsonToTable json={data} />
    </div>
  );
};

export default LogsPage;
