import Header from "./components/Header";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import About from "./components/About";
import Show from "./components/Show";
import Releases from "./components/Releases";
export default function Home() {
  const handleButtonClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Divider />
      <Show
        src="https://storage.googleapis.com/spracto-net-images/UpcomingShow/juush.JPG"
        alt="upcoming show!"
        buttonText="RSVP for free entry before 1030"
      />
      <Divider />
      <Releases />
    </>
  );
}
