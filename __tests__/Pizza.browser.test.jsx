import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../src/Pizza.jsx";

test("alt test renders on image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="cool browser stuff" image={src} />,
  );

  const img = await screen.getByRole("img");
  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
