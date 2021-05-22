import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spline from "./interpolation/spline";
import Multi from "./least squares/multilinear";
test("spline", () => {
  render(<Spline />);
  const linkElement = screen.getByText("Spline");
  expect(linkElement).toBeInTheDocument();
});
test("Multiple-Linear", () => {
  render(<Multi />);
  expect(screen.getByText("Column")).toBeInTheDocument();
});
