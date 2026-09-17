<<<<<<< HEAD
import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CallToAction } from "@/components/site/CallToAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/components/site/nav-items";
=======
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { company } from "@/components/site/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/public.functions";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Contact | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Get in touch with Ebenezer Streaming House in Kigali, Rwanda for live streaming, event coverage and media production needs." },
=======
      { title: "Contact | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content: "Contact Ebenezer Streaming House LTD in Kigali, Rwanda for live streaming, event coverage and media production.",
      },
      { property: "og:title", content: "Contact ESH" },
      { property: "og:description", content: "Call, email or message our Kigali team about your next production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    ],
  }),
  component: ContactPage,
});

<<<<<<< HEAD
type ContactValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialValues: ContactValues = { name: "", email: "", phone: "", subject: "", message: "" };

const contactDetails = [
  { icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: "Address", value: company.address },
] as const;

function ContactPage() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof ContactValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Please enter your name";
    if (!values.email.trim()) next.email = "Please enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Please enter a valid email address";
    if (!values.message.trim()) next.message = "Please enter a message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await submitContact(values);
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong while sending your message. Please try again." });
    } finally {
      setSending(false);
=======
function ContactPage() {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError(null);
    try {
      await send({
        data: {
          name: values.name ?? "",
          email: values.email ?? "",
          phone: values.phone ?? "",
          subject: values.subject ?? "",
          message: values.message ?? "",
        },
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
      setError("Please check your details — name, a valid email and a message of at least 10 characters are required.");
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
<<<<<<< HEAD
        title="Let's make it live."
        copy="Tell us about your event and the production support you need. We respond quickly to every inquiry."
      />

      <section className="section-shell bg-surface">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="grid gap-px border border-border bg-border">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 bg-background p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block truncate text-sm font-semibold text-foreground hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words text-sm font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-muted-foreground">
              Based on <span className="text-foreground">KG 14 Ave, Kigali, Rwanda</span>, we serve clients across
              East Africa both on-site and remotely.
            </p>
          </div>

          <div className="border border-border bg-background p-8 lg:p-10">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-14 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  Message received
                </h2>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Thank you, {values.name.split(" ")[0] || "there"}. We&apos;ve received your message and will get back
                  to you shortly.
                </p>
                <Button
                  type="button"
                  variant="cinematic"
                  onClick={() => {
                    setValues(initialValues);
                    setSubmitted(false);
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="grid gap-6 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
                <div>
                  <Label htmlFor="contact-name" className="field-label">Name</Label>
                  <Input id="contact-name" value={values.name} onChange={(e) => update("name")(e.target.value)} placeholder="Your full name" autoComplete="name" />
                  {errors.name ? <p className="mt-1.5 text-xs text-destructive">{errors.name}</p> : null}
                </div>
                <div>
                  <Label htmlFor="contact-email" className="field-label">Email</Label>
                  <Input id="contact-email" type="email" value={values.email} onChange={(e) => update("email")(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                  {errors.email ? <p className="mt-1.5 text-xs text-destructive">{errors.email}</p> : null}
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="field-label">Phone</Label>
                  <Input id="contact-phone" type="tel" value={values.phone} onChange={(e) => update("phone")(e.target.value)} placeholder="+250 ..." autoComplete="tel" />
                </div>
                <div>
                  <Label htmlFor="contact-subject" className="field-label">Subject</Label>
                  <Input id="contact-subject" value={values.subject} onChange={(e) => update("subject")(e.target.value)} placeholder="How can we help?" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="contact-message" className="field-label">Message</Label>
                  <Textarea id="contact-message" rows={6} value={values.message} onChange={(e) => update("message")(e.target.value)} placeholder="Tell us about your event, audience and production requirements." />
                  {errors.message ? <p className="mt-1.5 text-xs text-destructive">{errors.message}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="gold" size="xl" disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <CallToAction />
    </SiteLayout>
  );
}

async function submitContact(_values: ContactValues): Promise<void> {
  // Wired to the Supabase contact_submissions table in phase 5/10.
  await new Promise((resolve) => setTimeout(resolve, 500));
}
=======
        title="Let's talk about your production"
        copy="Tell us about your event and our team will get back to you."
      />

      <section className="section-shell bg-background">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="space-y-6">
            <a href={company.phoneHref} className="flex items-start gap-4 border border-border bg-surface p-6">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Phone</span>
                <span className="mt-1 block text-sm text-foreground">{company.phone}</span>
              </span>
            </a>
            <a href={`mailto:${company.email}`} className="flex items-start gap-4 border border-border bg-surface p-6">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <span className="mt-1 block break-all text-sm text-foreground">{company.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-4 border border-border bg-surface p-6">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Address</span>
                <span className="mt-1 block text-sm text-foreground">{company.address}</span>
              </span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="border border-border bg-surface p-7 lg:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="name">Name</label>
                <Input id="name" name="name" required maxLength={120} />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" required maxLength={180} />
              </div>
              <div>
                <label className="field-label" htmlFor="phone">Phone</label>
                <Input id="phone" name="phone" maxLength={40} />
              </div>
              <div>
                <label className="field-label" htmlFor="subject">Subject</label>
                <Input id="subject" name="subject" maxLength={160} />
              </div>
            </div>
            <div className="mt-6">
              <label className="field-label" htmlFor="message">Message</label>
              <Textarea id="message" name="message" required rows={6} minLength={10} maxLength={4000} />
            </div>

            {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            {status === "sent" ? (
              <p className="mt-4 text-sm text-primary">Thank you — your message has been sent. We'll reply shortly.</p>
            ) : null}

            <Button type="submit" variant="gold" size="xl" className="mt-8" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
