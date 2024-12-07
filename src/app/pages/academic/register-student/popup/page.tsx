interface AddItemPopupProps {
  onClose: () => void;
  isOpen: boolean;
  customerId: number;
  warehouseId: number;
  //   onSubmit: (newItem: ) => void;
}

export function RegisterPopUp() {
  return (
    <div className="fixed inset-0 bg-black  divide-y divide-gray-200 bg-opacity-50 flex justify-center items-center">
      <div>test</div>
    </div>
  );
}
