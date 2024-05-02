import { useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  availableCategories: string[];
};

export const Filters = ({ availableCategories }: Props) => {
  const navigate = useNavigate({ from: "/" });

  const { search, price, category } = useSearch({
    from: "/",
  });

  return (
    <div className="flex flex-col md:flex-row px-3 md:ml-14 gap-5">
      <div className="flex flex-col">
        <span>Search</span>
        <input
          className="b-grey border-2 p-2 rounded-md"
          type="text"
          value={search}
          onChange={(e) =>
            navigate({
              search: () => ({ search: e.target.value, price, category }),
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <span>Price filter</span>
        <input
          className="b-grey border-2 p-2 rounded-md"
          type="number"
          value={price}
          onChange={(e) =>
            navigate({
              search: () => ({
                price: Number(e.target.value) || "",
                search,
                category,
              }),
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="categoryFilter">Category</label>
        <select
          className="b-grey border-2 p-2 rounded-md"
          name="categoryFilter"
          id="categoryFilter"
          onChange={(e) =>
            navigate({
              search: () => ({
                category: e.target.value,
                search,
                price,
              }),
            })
          }
        >
          <option value=""></option>

          {availableCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
