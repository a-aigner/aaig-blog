import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PAGE = path.resolve(__dirname, "../app/impressum/page.tsx");
const src = () => fs.readFileSync(PAGE, "utf8");

describe("Impressum", () => {
  // Each of these is a field § 5 DDG or § 18 Abs. 2 MStV requires by name. A
  // missing one is the whole point of the page not being satisfied, and it is
  // the kind of omission nobody notices by reading the page.
  const required: [string, string][] = [
    ["legal form", "ARSoftware UG (haftungsbeschränkt)"],
    ["street", "Johannisweg 3"],
    ["postcode and city", "84030 Ergolding"],
    ["managing director", "Geschäftsführer: Andre Aigner"],
    ["register court", "Amtsgericht Landshut"],
    ["register number", "HRB 15048"],
    ["VAT id", "DE459104738"],
    ["§ 18 MStV responsibility", "§ 18 Abs. 2 MStV"],
  ];

  for (const [label, needle] of required) {
    it(`states the ${label}`, () => {
      expect(src()).toContain(needle);
    });
  }

  it("offers an email address that can actually be reached", () => {
    // § 5 DDG wants a route to rapid electronic contact. The site's own
    // address is used deliberately rather than the company one, because it is
    // the mailbox that gets read.
    expect(src()).toContain("mailto:${contact.email}");
  });

  it("links to the privacy notice, and the notice links back", () => {
    expect(src()).toContain('href="/privacy"');
    const privacy = fs.readFileSync(path.resolve(__dirname, "../app/privacy/page.tsx"), "utf8");
    expect(privacy).toContain('href="/impressum"');
  });
});
