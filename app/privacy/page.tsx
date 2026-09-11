import { contact } from "@/content/cv";

export const metadata = {
  title: "Privacy — André Aigner",
  description: "What this site processes, why, and what it does not do.",
};

/**
 * Four facts in this page were verified against the running site rather than
 * assumed, because a privacy notice that overstates is worse than none:
 *
 *  - no cookie is set, and nothing is written to localStorage or
 *    sessionStorage. Four page loads produced zero of each, and the analytics
 *    client bundle contains no reference to any of those APIs.
 *  - the analytics script is served from this site's own origin
 *    (`/_vercel/insights/script.js`), so the browser makes no request to a
 *    third-party host.
 *  - no third-party fonts, images or scripts are loaded. Typography is the
 *    visitor's own system fonts.
 *  - the only external hosts named anywhere are destinations of links a
 *    visitor may choose to click.
 *
 * What Vercel does with request data on its own servers cannot be verified
 * from here, so that part is attributed to Vercel rather than asserted.
 */

const FILL_IN = "TO BE COMPLETED";

function Fill({ what }: { what: string }) {
  return (
    <mark className="bg-[rgb(219_10_18/0.1)] px-1 font-medium text-[var(--color-active-red)]">
      [{FILL_IN}: {what}]
    </mark>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold tracking-tight">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Privacy</h1>
      <p className="mt-2 text-sm text-secondary">Last updated 11 September 2026</p>

      <div className="mt-6 space-y-4 leading-relaxed text-[rgb(10_10_10/0.78)]">
        <p>
          This is a personal site with no accounts, no sign-up, no newsletter and no
          comments. There is nothing to log in to and nothing to submit. What follows is
          the complete list of what happens to data when you read it.
        </p>

        <H>The short version</H>
        <p>
          <strong>This site sets no cookies and stores nothing on your device.</strong> Not
          a cookie, not a localStorage entry, not a session-storage entry. That is why
          there is no consent banner: German law requires consent for storing information
          on, or reading information from, your device, and this site does neither.
        </p>
        <p>
          It does still count page views, and counting involves your IP address reaching a
          server. That is data protection law rather than cookie law, so it needs no
          banner but it does need this page. The rest of it explains that.
        </p>
        <p>
          The site also loads no third-party fonts, images or scripts. The text you are
          reading is set in fonts already on your own computer.
        </p>

        <H>Who is responsible</H>
        <p>
          ARSoftware UG (haftungsbeschränkt)
          <br />
          Johannisweg 3
          <br />
          84030 Ergolding, Deutschland
          <br />
          Geschäftsführer: Andre Aigner
          <br />
          <a href={`mailto:${contact.email}`} className="underline underline-offset-2 hover:opacity-70">
            {contact.email}
          </a>
        </p>
        <p className="text-sm text-secondary">
          Amtsgericht Landshut, HRB 15048 · USt-IdNr. DE459104738. Full details on the{" "}
          <a href="/impressum" className="underline underline-offset-2 hover:opacity-70">
            Impressum
          </a>
          .
        </p>

        <H>Hosting</H>
        <p>
          The site is hosted by Vercel Inc. Serving a page necessarily means your browser
          sends a request, and that request carries your IP address, the page you asked
          for, your browser&rsquo;s user-agent string and, if you followed a link, the page
          you came from. Vercel processes that to deliver the page and to keep the service
          running and secure.
        </p>
        <p>
          The legal basis is Art. 6(1)(f) GDPR, my legitimate interest in operating a
          working and reasonably secure website. Vercel acts as a processor under a data
          processing agreement. Because Vercel Inc. is established in the United States,
          this data may be transferred there; that transfer relies on{" "}
          <Fill what="the transfer mechanism named in Vercel's current DPA, e.g. EU-US Data Privacy Framework certification or Standard Contractual Clauses; confirm which applies today" />.
        </p>

        <H>Counting page views</H>
        <p>
          I use Vercel Web Analytics, which tells me how many people opened which article.
          I would genuinely like to know whether anyone reads this; that is the whole
          purpose, and it is the only purpose.
        </p>
        <p>
          According to Vercel, it works without cookies: instead of tagging your browser,
          it derives a short-lived hash from the request itself, which lets it count a
          visitor twice in one day without keeping anything that identifies you
          afterwards. I have checked the part I can check, which is your side: loading
          this site produces no cookie and no stored data, and the script that does the
          counting is served from this domain rather than from anybody else&rsquo;s. What
          Vercel does on its own servers is Vercel&rsquo;s description, not my measurement.
        </p>
        <p>
          What I see is aggregate: page, count, country, browser, referrer. I cannot see
          individuals, cannot follow one person between pages, and there is no profile of
          you anywhere in this.
        </p>
        <p>
          Legal basis: Art. 6(1)(f) GDPR. My interest is knowing whether the writing is
          read; the intrusion is a page count without a cookie. Retention is{" "}
          <Fill what="the retention period for your Vercel plan's analytics data" />. You
          can object to this processing at any time under Art. 21 GDPR, by email, and I
          will act on it.
        </p>

        <H>If you email me</H>
        <p>
          Mail sent to the address above is processed to answer it, on the basis of
          Art. 6(1)(f) GDPR, or Art. 6(1)(b) where the message is about a contract. I keep
          correspondence for as long as the matter is live and as long as commercial or tax
          law requires, and then delete it. The mailbox is an iCloud
          mailbox, so it is hosted by Apple.
        </p>

        <H>Links off this site</H>
        <p>
          Some pages link to GitHub, LinkedIn, the App Store and a few other sites. Those
          are ordinary links: nothing is loaded from them until you click, and once you do,
          you are on their page under their privacy policy, not mine.
        </p>

        <H>Your rights</H>
        <p>
          You have the right to access the data concerning you (Art. 15), to have it
          corrected (Art. 16) or erased (Art. 17), to restrict its processing (Art. 18), to
          receive it in a portable form (Art. 20), and to object to processing based on
          legitimate interest (Art. 21). Email the address above and you do not need to
          explain why.
        </p>
        <p>
          Worth saying plainly: for the page counting there is almost certainly nothing to
          access, because nothing stored identifies you. An objection I can act on; a
          subject access request would mostly return &ldquo;there is no record of
          you&rdquo;.
        </p>

        <H>Complaints</H>
        <p>
          You can complain to a data protection authority. The competent one for me is the
          Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522
          Ansbach, Germany. You may also complain to the authority where you live.
        </p>

        <H>What this site does not do</H>
        <p>
          No advertising, no ad networks, no tracking pixels, no cross-site tracking, no
          profiling and no automated decision-making within the meaning of Art. 22 GDPR.
          Nothing here is sold or shared with anyone for their own purposes.
        </p>

        <H>Changes</H>
        <p>
          If what the site does changes, this page changes with it, and the date at the top
          moves. There is no version history; the current text is the current practice.
        </p>
      </div>
    </section>
  );
}
