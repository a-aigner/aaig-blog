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
    ["operator's name", "{contact.name}"],
    ["street", "Johannisweg 3"],
    ["postcode and city", "84030 Ergolding"],
    ["country", "Deutschland"],
    ["§ 18 MStV responsibility", "§ 18 Abs. 2 MStV"],
  ];

  for (const [label, needle] of required) {
    it(`states the ${label}`, () => {
      expect(src()).toContain(needle);
    });
  }

  it("does not present the company as the operator", () => {
    // The site is run by a natural person. A register entry, a VAT number or a
    // managing-director line would all say otherwise, and each is the kind of
    // thing that gets pasted back in from a template.
    const src = fs.readFileSync(PAGE, "utf8");
    for (const companyOnly of [
      "ARSoftware UG (haftungsbeschränkt)",
      "Geschäftsführer",
      "HRB 15048",
      "Amtsgericht Landshut",
      "DE459104738",
    ]) {
      expect(src, `${companyOnly} belongs to the UG, which does not operate this site`)
        .not.toContain(companyOnly);
    }
    const privacy = fs.readFileSync(path.resolve(__dirname, "../app/privacy/page.tsx"), "utf8");
    expect(privacy).not.toContain("HRB 15048");
  });

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
