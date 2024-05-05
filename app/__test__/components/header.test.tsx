import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/home/header";
import Modal from "@/components/home/modal";

describe("Header Component", () => {
  it("renders with transparent background initially", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveClass("bg-transparent");
  });

  it("changes background on scroll", () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByRole("banner")).toHaveClass("bg-black");
  });

  it("renders the logo with correct attributes", () => {
    render(<Header />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "160");
    expect(logo).toHaveAttribute("height", "40");
  });

  it("opens modal on button click", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes modal on close button click", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button")); // Open modal
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
