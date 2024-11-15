import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface CustomAction<T> {
  label: string;
  onClick: (id: T[keyof T], actionType: string) => void;
  className?: string;
}

export function makeColumns<T extends { [key: string]: any }>(
  classType: T,
  idColumn: string,
  customHeaders?: { [K in keyof T]?: string },
  CustomAction?: CustomAction<T>[]
): ColumnDef<T>[] {
  const keys = Object.keys(classType) as (keyof T)[];
  const columns: ColumnDef<T>[] = keys.map((key) => ({
    accessorKey: key as string,
    header: customHeaders?.[key] || (key as string), // make a custom header
  }));
  // const { isDarkMode } = useTheme();

  if (Array.isArray(CustomAction) && CustomAction.length > 0) {
    columns.push({
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original[idColumn];
        return (
          <td className="flex justify-center gap-2 whitespace-nowrap px-6 py-4 text-center">
            {CustomAction?.map((action, index) => (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (id) {
                    action.onClick(id, action.label);
                  }
                }}
                key={index}
                className={`rounded-3xl px-4 py-2 ${action.className}`}
              >
                {action.label}
              </Button>
            ))}
          </td>
        );
      },
    });
  }

  return columns;
}
