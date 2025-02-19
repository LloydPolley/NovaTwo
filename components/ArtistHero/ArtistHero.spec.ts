import AritstHero from "./ArtistHero";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AritstHero", () => {
  it("renders a heading", () => {
    // render(<AritstHero />);

    const hero = screen.getByTestId("artist-hero");

    expect(hero).toBeInTheDocument();
  });
});
