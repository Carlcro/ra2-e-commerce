type Props = {
  titleFilter: string;
  setTitleFilter: (e: string) => void;
  priceFilter: string;
  setPriceFilter: (e: string) => void;
  setCategoryFilter: (e: string) => void;
  availableCategories: string[];
};

export const Filters = ({
  titleFilter,
  setTitleFilter,
  priceFilter,
  setPriceFilter,
  setCategoryFilter,
  availableCategories,
}: Props) => {
  return (
    <div className="flex  ml-5 gap-5">
      <div className="flex flex-col">
        <span>Search</span>
        <input
          className="b-grey border-2 p-2 rounded-md"
          type="text"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span>Price filter</span>
        <input
          className="b-grey border-2 p-2 rounded-md"
          type="number"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="categoryFilter">Category</label>
        <select
          className="b-grey border-2 p-2 rounded-md"
          name="categoryFilter"
          id="categoryFilter"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value=""></option>

          {availableCategories.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
