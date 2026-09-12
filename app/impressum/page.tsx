import { contact } from "@/content/cv";

export const metadata = {
  title: "Impressum — André Aigner",
  description: "Angaben gemäß § 5 DDG.",
};

/**
 * This site is operated by a natural person, not by ARSoftware UG. The company
 * is named in the writing where it is the subject, and nowhere in the legal
 * pages: it neither operates this site nor carries the data-protection
 * obligation for it. See /privacy for the same split.
 *
 * That removes the register entry, the VAT number and the managing-director
 * line, which are facts about a company and not about a person. What § 5 DDG
 * wants from a natural person is a name, a postal address and a route to
 * rapid electronic contact, which is what is left.
 *
 * The address is the one the company is registered at, because it is also the
 * operator's own. If that ever stops being true, this page and /privacy both
 * need the private one instead.
 */

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold tracking-tight">{children}</h2>;
}

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Impressum</h1>

      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(10_10_10/0.78)]">
        <H>Angaben gemäß § 5 DDG</H>
        <p>
          {contact.name}
          <br />
          Johannisweg 3
          <br />
          84030 Ergolding
          <br />
          Deutschland
        </p>


        <H>Kontakt</H>
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="underline underline-offset-2 hover:opacity-70"
          >
            {contact.email}
          </a>
        </p>



        <H>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H>
        <p>
          {contact.name}
          <br />
          Johannisweg 3
          <br />
          84030 Ergolding
          <br />
          Deutschland
        </p>

        <H>Verbraucherstreitbeilegung</H>
        <p>
          Ich bin weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <H>Haftung für Inhalte</H>
        <p>
          Die Inhalte dieser Seiten erstelle ich mit Sorgfalt. Soweit gesetzlich zulässig,
          übernehme ich keine Haftung für Schäden, die aus der Nutzung oder Nichtnutzung
          dieser Website entstehen.
        </p>

        <H>Haftung für Links</H>
        <p>
          Diese Website verlinkt auf externe Seiten, auf deren Inhalte ich keinen Einfluss
          habe. Für diese Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum
          Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
        </p>

        <H>Urheberrecht</H>
        <p>
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen
          Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors.
        </p>

        <p className="mt-10 text-sm text-secondary">
          Wie diese Website mit personenbezogenen Daten umgeht, steht in der{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:opacity-70">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    </section>
  );
}
