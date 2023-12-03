import HelloWorld from "@/HelloWorld";

it("should show 'Hello World!'", () => {
  const hw = new HelloWorld();
  expect(hw.message("Hello World!")).toBe("Hello World!");
});
