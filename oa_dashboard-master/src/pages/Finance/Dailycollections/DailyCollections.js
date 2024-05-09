import React from "react";
import ReusableTable from "../../ReusableTable/ReusableTable";

const DailyCollections = () => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <div>
      <ReusableTable columns={columns} data={data} heading="Hello" />
    </div>
  );
};

export default DailyCollections;
