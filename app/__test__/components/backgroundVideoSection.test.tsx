import { render, screen } from "@testing-library/react";
import BackgroundVideoSection from "@/components/home/backgroundVideoSection";

describe("BackgroundVideoSection", () => {
  it("renders without crashing", () => {
    render(<BackgroundVideoSection />);
    // Assuming you have a data-testid on the root element of your component
    expect(screen.getByTestId("background-video-section")).toBeInTheDocument();
  });

  //   it("renders video with correct attributes", () => {
  //     render(<BackgroundVideoSection />);
  //     // Assuming you have added data-testid="background-video" to your video element
  //     const video = screen.getByTestId("background-video");
  //     expect(video).toHaveAttribute("src", "/bgvideo.mp4");
  //     expect(video).toHaveAttribute("autoPlay");
  //     expect(video).toHaveAttribute("loop");
  //     expect(video).toHaveAttribute("muted");
  //   });

  //   it("renders poster image correctly", () => {
  //     render(<BackgroundVideoSection />);
  //     // Assuming you have added data-testid="background-video" to your video element
  //     const video = screen.getByTestId("background-video");
  //     expect(video).toHaveAttribute("poster", "/poster.png");
  //   });

  //   it("renders logo image with correct attributes", () => {
  //     render(<BackgroundVideoSection />);
  //     // Since Image from 'next/image' doesn't spread test attributes, we assume you're using 'alt' to query the image
  //     const image = screen.getByAltText("Logo");
  //     expect(image).toBeInTheDocument();
  //   });

  //   it("link to content section is correct", () => {
  //     render(<BackgroundVideoSection />);
  //     // Assuming you have added a data-testid or aria-label to the link for querying
  //     const link = screen.getByTestId("scroll-down-link");
  //     expect(link).toHaveAttribute("to", "content");
  //     expect(link).toHaveAttribute("offset", String(offsetValue));
  //   });
});
