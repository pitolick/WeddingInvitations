import React from "react";
import { render, screen } from "@testing-library/react";
import Arrow from "../Arrow";

describe("Arrow", () => {
  it("renders with default props", () => {
    render(<Arrow />);
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  it("renders with custom width and height", () => {
    render(<Arrow width={32} height={32} />);
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("renders with custom direction", () => {
    render(<Arrow direction="up" />);
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toHaveStyle({ transform: "rotate(-90)" });
  });

  it("renders with custom color", () => {
    render(<Arrow color="#ff0000" />);
    const path = screen
      .getByRole("img", { hidden: true })
      .querySelector("path");
    expect(path).toHaveAttribute("stroke", "#ff0000");
  });

  it("renders with custom className", () => {
    render(<Arrow className="custom-class" />);
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toHaveClass("custom-class");
  });
});
