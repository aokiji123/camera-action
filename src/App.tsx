import { FAQ } from "./shared/components/FAQ";
import { Footer } from "./shared/components/Footer";
import { GreetingsHeader } from "./shared/components/GreetingsHeader";
import { ShowSlider } from "./shared/components/ShowSlider";
import { WhyUs } from "./shared/components/WhyUs";

function App() {
  return (
    <div>
      <GreetingsHeader />
      <ShowSlider />
      <WhyUs />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
