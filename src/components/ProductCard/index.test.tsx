import { render, screen } from "@testing-library/react";

import ProductCard from "./index";

describe("<ProductCard/>", () => {
  it("should render the product name, description, price and stock", () => {
    render(
      <ProductCard
        name="Walton TV"
        description="4k tv"
        price={1000}
        stock={20}
      />,
    );

    expect(screen.getAllByText(/Walton TV/)).toHaveLength(2);
    expect(screen.getByText(/4k tv/)).toBeInTheDocument();
    expect(screen.getByText(/1000\$/, { exact: true })).toBeInTheDocument();
    expect(screen.getByText(/20 qty/, { exact: true })).toBeInTheDocument();
  });
});
