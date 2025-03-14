import React from "react";
import ArtistHero from "./ArtistHero";
import { render, screen } from "@testing-library/react";

describe("ArtistHero", () => {
  it("renders with background image", () => {
    const { container } = render(<ArtistHero title="Test Artist" />);

    const hero = screen.getByText("Test Artist");
    expect(hero).toBeInTheDocument();
  });
});
