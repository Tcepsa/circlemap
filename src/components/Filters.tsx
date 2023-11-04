import { IFiltersProps } from "../types.tsx";

// Filter on the data to be displayed
export default function Filters( { setFilters }: IFiltersProps ) {

  return (
    <div>
      <button onClick={setFilters}>
        Apply Filters
      </button>
    </div>
  );
}
