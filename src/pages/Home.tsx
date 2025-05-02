import { FAQ } from "../shared/components/FAQ";
import { GreetingsHeader } from "../shared/components/GreetingsHeader";
import { ShowSlider } from "../shared/components/ShowSlider";
import { WhyUs } from "../shared/components/WhyUs";

export const Home = () => {
  return (
    <div>
      <GreetingsHeader />
      <ShowSlider />
      <WhyUs />
      <FAQ />
    </div>
  );
};
