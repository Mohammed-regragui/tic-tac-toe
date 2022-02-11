import { render} from "@testing-library/react";
import { GameProvider } from "../contexts/GameContext";

const customRender = (ui) => {
    return render(
      <GameProvider>{ui}</GameProvider>
    );
  };

  export {customRender as render} 