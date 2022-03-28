import { render } from "@testing-library/react";
import { ActiveLink } from "./";

test("active link renders corrects ", () => {
 const {debug} = render(
    <ActiveLink activeClassName="active" href="/">
      <a>Home</a>
    </ActiveLink>
  );
  debug();
});
