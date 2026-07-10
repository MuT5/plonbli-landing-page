import { FormEvent, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle, Mail, TriangleAlert } from "lucide-react";

import type { WaitlistFormContent } from "@/types/landing";
import { joinWaitlist, WaitlistError } from "@/lib/waitlist";

type FormStatus = "idle" | "success" | "duplicate" | "error";

interface WaitlistFormProps {
  content: WaitlistFormContent;
}

export default function WaitlistForm({ content }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionLock = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLock.current) return;

    if (company) {
      setStatus("success");
      setEmail("");
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await joinWaitlist(email);
      setEmail("");
      setStatus("success");
    } catch (error) {
      setStatus(error instanceof WaitlistError && error.code === "duplicate" ? "duplicate" : "error");
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  };

  const feedback =
    status === "success"
      ? { title: content.successTitle, description: content.successDescription, icon: Check }
      : status === "duplicate"
        ? { title: content.duplicateTitle, description: content.duplicateDescription, icon: Mail }
        : status === "error"
          ? { title: content.errorTitle, description: content.errorDescription, icon: TriangleAlert }
          : null;

  return (
    <div className="waitlist-form-shell">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate={false} aria-busy={isSubmitting}>
        <div>
          <label className="mb-2 block text-sm font-bold text-[var(--color-olive)]" htmlFor="waitlist-email">
            {content.emailLabel}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-earth)]"
              />
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={254}
                disabled={isSubmitting}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder={content.emailPlaceholder}
                className="min-h-14 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory)] py-3 pl-12 pr-4 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-earth)]/60 focus:border-[var(--color-olive)] focus:ring-4 focus:ring-[var(--color-brand)]/20"
                aria-describedby="waitlist-privacy waitlist-feedback"
              />
            </div>
            <button className="button-primary min-h-14 justify-center px-6 sm:min-w-44" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : null}
              {isSubmitting ? content.submittingLabel : content.submitLabel}
              {!isSubmitting ? <ArrowRight aria-hidden="true" className="button-icon" /> : null}
            </button>
          </div>
        </div>

        <div hidden aria-hidden="true">
          <label htmlFor="company">Firma</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <p id="waitlist-privacy" className="text-xs leading-5 text-[var(--color-earth)]">
          {content.privacyNote}
        </p>
      </form>

      <div id="waitlist-feedback" aria-live="polite" aria-atomic="true" className="mt-4 min-h-6">
        {feedback ? (
          <div className={`waitlist-feedback waitlist-feedback--${status}`}>
            <feedback.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-bold">{feedback.title}</p>
              <p className="mt-0.5 text-sm leading-6">{feedback.description}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
