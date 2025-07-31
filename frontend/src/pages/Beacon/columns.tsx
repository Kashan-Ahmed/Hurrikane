import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "beaconID",
      header: "Beacon ID",
    },
    {
      accessorKey: "plantID",
      header: "Plant ID",
    },
    {
      accessorKey: "machNo",
      header: "Machine No",
    },
    {
      accessorKey: "machIP",
      header: "Machine IP",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "shiftCode",
      header: "Shift Code",
    },
    {
      accessorKey: "event",
      header: "Event",
    },
    {
      accessorKey: "lifeTime",
      header: "Life Time",
    },
    {
      accessorKey: "length",
      header: "Length",
    },
    {
      accessorKey: "created",
      header: "Created",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            {new Date(row.original.created).toLocaleString()}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "action",
    //   header: "",
    //   size: 20,
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex justify-end">{rowActions(row.original)}</div>
    //     );
    //   },
    // },
  ];
};
