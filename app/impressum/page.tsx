import { contact } from "@/content/cv";

export const metadata = {
  title: "Impressum — André Aigner",
  description: "Angaben gemäß § 5 DDG.",
};

/**
 * The company details here are taken from ARSoftware UG's own Impressum at
 * arsoftware.tech rather than retyped from memory, so the two pages cannot
 * disagree about a register number. The legal fields use the spelling the
 * register carries ("Andre Aigner"); the site's own prose keeps the accent.
 *
 * The contact address is deliberately the iCloud one this site already uses,
 * not the company address, because that is the mailbox that is actually read.
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
          ARSoftware UG (haftungsbeschränkt)
          <br />
          Johannisweg 3
          <br />
          84030 Ergolding
          <br />
          Deutschland
        </p>

        <H>Vertreten durch</H>
        <p>Geschäftsführer: Andre Aigner</p>

        <H>Kontakt</H>
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="underline underline-offset-2 hover:opacity-70"
          >
            {contact.email}
          </a>
        </p>

        <H>Registereintrag</H>
        <p>
          Registergericht: Amtsgericht Landshut
          <br />
          Registernummer: HRB 15048
        </p>

        <H>Umsatzsteuer-Identifikationsnummer</H>
        <p>
          Gemäß § 27 a Umsatzsteuergesetz: DE459104738
        </p>

        <H>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H>
        <p>
          Andre Aigner
          <br />
          Johannisweg 3
          <br />
          84030 Ergolding
          <br />
          Deutschland
        </p>

        <H>Verbraucherstreitbeilegung</H>
        <p>
          Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <H>Haftung für Inhalte</H>
        <p>
          Die Inhalte dieser Seiten werden mit Sorgfalt erstellt. Soweit gesetzlich
          zulässig, übernehmen wir keine Haftung für Schäden, die aus der Nutzung oder
          Nichtnutzung dieser Website entstehen.
        </p>

        <H>Haftung für Links</H>
        <p>
          Diese Website verlinkt auf externe Seiten, auf deren Inhalte wir keinen Einfluss
          haben. Für diese Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum
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
