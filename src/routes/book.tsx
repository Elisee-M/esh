<<<<<<< HEAD
import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/components/site/data";
=======
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/components/site/data";
import { submitBooking } from "@/lib/public.functions";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Book a Service | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Request a service from Ebenezer Streaming House. Live streaming, event coverage, documentary and media production in Rwanda and East Africa." },
    ],
  }),
  component: BookServicePage,
});

const budgetRanges = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "Above $10,000",
  "I'm not sure yet",
] as const;

const eventTypes = [
  "Church Service",
  "Conference / Summit",
  "Corporate Event",
  "Wedding",
  "Concert / Performance",
  "Documentary / Film",
  "Podcast Recording",
  "National / Public Event",
  "Other",
] as const;

type BookValues = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  eventType: string;
  eventDate: string;
  location: string;
  audience: string;
  budget: string;
  requirements: string;
  message: string;
};

const initialValues: BookValues = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  eventType: "",
  eventDate: "",
  location: "",
  audience: "",
  budget: "",
  requirements: "",
  message: "",
};

function BookServicePage() {
  const [values, setValues] = useState<BookValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof BookValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof BookValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const labelFor = (field: keyof BookValues) => `book-${field}`;

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your full name";
    if (!values.email.trim()) next.email = "Please enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Please enter a valid email address";
    if (!values.phone.trim()) next.phone = "Please enter your phone number";
    if (!values.service) next.service = "Please select a service";
    if (!values.eventType) next.eventType = "Please select an event type";
    if (!values.eventDate) next.eventDate = "Please choose an event date";
    if (!values.location.trim()) next.location = "Please enter the event location";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await submitBooking(values);
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong while submitting your request. Please try again." });
    } finally {
      setSending(false);
=======
      { title: "Book a Service | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content: "Request live streaming, event coverage, podcast, documentary or production services from ESH in Kigali, Rwanda.",
      },
      { property: "og:title", content: "Book a Service | ESH" },
      { property: "og:description", content: "Send us your event details and we'll prepare a tailored production plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const budgets = ["Under 500,000 RWF", "500,000 – 1M RWF", "1M – 3M RWF", "3M – 10M RWF", "Above 10M RWF", "Not sure yet"];

export function BookPage() {
  const send = useServerFn(submitBooking);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const v = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError(null);
    try {
      await send({
        data: {
          full_name: v.full_name ?? "",
          company: v.company ?? "",
          email: v.email ?? "",
          phone: v.phone ?? "",
          service: v.service ?? "",
          event_type: v.event_type ?? "",
          event_date: v.event_date ?? "",
          event_location: v.event_location ?? "",
          audience_size: v.audience_size ?? "",
          budget_range: v.budget_range ?? "",
          requirements: v.requirements ?? "",
          message: v.message ?? "",
        },
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
      setError("Please check your details — full name, a valid email and a service are required.");
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Book Service"
<<<<<<< HEAD
        title="Request our services"
        copy="Tell us about your event and we will get back to you with a tailored production plan and quote."
      />

      <section className="section-shell bg-surface">
        <div className="mx-auto max-w-4xl border border-border bg-background p-8 lg:p-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                Request received
              </h2>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Thank you, {values.fullName.split(" ")[0] || "there"}. We&apos;ve received your service request for{" "}
                <span className="text-foreground">{values.service}</span> and will respond shortly with next steps.
              </p>
              <Button
                type="button"
                variant="cinematic"
                onClick={() => {
                  setValues(initialValues);
                  setSubmitted(false);
                }}
              >
                Submit another request
              </Button>
            </div>
          ) : (
            <form className="grid gap-7 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <div className="sm:col-span-2">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Your details</h2>
              </div>
              <div>
                <Label htmlFor={labelFor("fullName")} className="field-label">Full Name *</Label>
                <Input id={labelFor("fullName")} value={values.fullName} onChange={(e) => update("fullName")(e.target.value)} placeholder="Your full name" autoComplete="name" />
                {errors.fullName ? <p className="mt-1.5 text-xs text-destructive">{errors.fullName}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("company")} className="field-label">Company / Organization</Label>
                <Input id={labelFor("company")} value={values.company} onChange={(e) => update("company")(e.target.value)} placeholder="Organization name (optional)" autoComplete="organization" />
              </div>
              <div>
                <Label htmlFor={labelFor("email")} className="field-label">Email *</Label>
                <Input id={labelFor("email")} type="email" value={values.email} onChange={(e) => update("email")(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                {errors.email ? <p className="mt-1.5 text-xs text-destructive">{errors.email}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("phone")} className="field-label">Phone *</Label>
                <Input id={labelFor("phone")} type="tel" value={values.phone} onChange={(e) => update("phone")(e.target.value)} placeholder="+250 ..." autoComplete="tel" />
                {errors.phone ? <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p> : null}
              </div>

              <div className="sm:col-span-2 mt-4 border-t border-border pt-7">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Event details</h2>
              </div>
              <div>
                <Label htmlFor={labelFor("service")} className="field-label">Service Required *</Label>
                <select
                  id={labelFor("service")}
                  value={values.service}
                  onChange={(e) => update("service")(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="" className="bg-background">Select a service...</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title} className="bg-background">
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service ? <p className="mt-1.5 text-xs text-destructive">{errors.service}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("eventType")} className="field-label">Event / Project Type *</Label>
                <select
                  id={labelFor("eventType")}
                  value={values.eventType}
                  onChange={(e) => update("eventType")(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="" className="bg-background">Select event type...</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type} className="bg-background">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.eventType ? <p className="mt-1.5 text-xs text-destructive">{errors.eventType}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("eventDate")} className="field-label">Event Date *</Label>
                <Input id={labelFor("eventDate")} type="date" value={values.eventDate} onChange={(e) => update("eventDate")(e.target.value)} />
                {errors.eventDate ? <p className="mt-1.5 text-xs text-destructive">{errors.eventDate}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("location")} className="field-label">Event Location *</Label>
                <Input id={labelFor("location")} value={values.location} onChange={(e) => update("location")(e.target.value)} placeholder="Venue or city" />
                {errors.location ? <p className="mt-1.5 text-xs text-destructive">{errors.location}</p> : null}
              </div>
              <div>
                <Label htmlFor={labelFor("audience")} className="field-label">Expected Audience / Guests</Label>
                <Input id={labelFor("audience")} type="number" min={0} value={values.audience} onChange={(e) => update("audience")(e.target.value)} placeholder="Approximate count" />
              </div>
              <div>
                <Label htmlFor={labelFor("budget")} className="field-label">Budget Range</Label>
                <select
                  id={labelFor("budget")}
                  value={values.budget}
                  onChange={(e) => update("budget")(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="" className="bg-background">Select a range...</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range} className="bg-background">
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={labelFor("requirements")} className="field-label">Additional Requirements</Label>
                <Textarea id={labelFor("requirements")} rows={3} value={values.requirements} onChange={(e) => update("requirements")(e.target.value)} placeholder="Equipment, crew, streaming platform, deliverables..." />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={labelFor("message")} className="field-label">Message</Label>
                <Textarea id={labelFor("message")} rows={4} value={values.message} onChange={(e) => update("message")(e.target.value)} placeholder="Anything else we should know about your event?" />
                {errors.message ? <p className="mt-1.5 text-xs text-destructive">{errors.message}</p> : null}
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="gold" size="xl" className="w-full sm:w-auto" disabled={sending}>
                  {sending ? "Submitting..." : "Submit Request"}
                </Button>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  We&apos;ll review your request and respond with a tailored plan and quote within one business day.
                </p>
              </div>
            </form>
          )}
        </div>
=======
        title="Request a production"
        copy="Share your event details and our producers will come back with a tailored plan and quote."
      />

      <section className="section-shell bg-background">
        <form onSubmit={onSubmit} className="border border-border bg-surface p-7 lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="full_name">Full name</label>
              <Input id="full_name" name="full_name" required maxLength={120} />
            </div>
            <div>
              <label className="field-label" htmlFor="company">Company / organization</label>
              <Input id="company" name="company" maxLength={160} />
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
              <label className="field-label" htmlFor="service">Service required</label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground"
              >
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service.title} value={service.title}>{service.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="event_type">Event / project type</label>
              <Input id="event_type" name="event_type" maxLength={120} placeholder="Conference, wedding, service…" />
            </div>
            <div>
              <label className="field-label" htmlFor="event_date">Event date</label>
              <Input id="event_date" name="event_date" type="date" />
            </div>
            <div>
              <label className="field-label" htmlFor="event_location">Event location</label>
              <Input id="event_location" name="event_location" maxLength={200} />
            </div>
            <div>
              <label className="field-label" htmlFor="audience_size">Expected audience / guests</label>
              <Input id="audience_size" name="audience_size" maxLength={60} />
            </div>
            <div>
              <label className="field-label" htmlFor="budget_range">Budget range</label>
              <select
                id="budget_range"
                name="budget_range"
                defaultValue=""
                className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground"
              >
                <option value="">Select a range</option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            <div>
              <label className="field-label" htmlFor="requirements">Additional requirements</label>
              <Textarea id="requirements" name="requirements" rows={4} maxLength={3000} />
            </div>
            <div>
              <label className="field-label" htmlFor="message">Message</label>
              <Textarea id="message" name="message" rows={4} maxLength={3000} />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
          {status === "sent" ? (
            <p className="mt-4 text-sm text-primary">Request received — our team will contact you shortly.</p>
          ) : null}

          <Button type="submit" variant="gold" size="xl" className="mt-8" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit request"}
          </Button>
        </form>
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
      </section>
    </SiteLayout>
  );
}
<<<<<<< HEAD

async function submitBooking(_values: BookValues): Promise<void> {
  // Wired to the Supabase booking_requests table in phase 6/11.
  await new Promise((resolve) => setTimeout(resolve, 500));
}
=======
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
