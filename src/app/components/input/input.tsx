export function LabelInput(props: {
  label: string;
  type: string;
  htmlFor: string;
  className?: string;
  editData?: string;
  onEdit?: (edit: string) => void;
  maxLength?: number;
  isValid?: boolean;
  errorMessage?: string;
  editabled?: boolean;
}) {
  return (
    <div className="relative mt-6 w-full mx-4">
      <input
        type={props.type}
        id={props.htmlFor}
        placeholder=" "
        defaultValue={props.editData}
        onChange={(e) => props.onEdit?.(e.target.value)}
        maxLength={props.maxLength}
        disabled={!props.editabled}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={props.htmlFor}
        className="absolute text-sm ml-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {props.label}
      </label>
      {!props.isValid && (
        <span className="text-red-500 text-xs mt-1">{props.errorMessage}</span>
      )}
    </div>
  );
}
