// import React from "react";
// import { render, cleanup, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import Component from "./useRestoreState.component";

// afterEach(cleanup);

// it("should equal to 0", () => {
//   render(<Component />);
// });
// it("should be enabled", () => {
//   render(<Component />);
//   expect(screen.getByTestId("button-up")).not.toHaveAttribute("disabled");
// });

// it("should be disabled", () => {
//   const { getByTestId } = render(<Component />);
//   expect(getByTestId("button-down")).toBeDisabled();
// });