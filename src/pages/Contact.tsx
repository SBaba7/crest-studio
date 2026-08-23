import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">Get in touch</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Whether you need a custom demo, have a support question, or want to explore enterprise pricing, our team is ready to help.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 sm:mt-20 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-x-4 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                <MessageSquare className="h-5 w-5 text-teal-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-foreground">Sales</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Talk to our security experts about your organization's needs. We typically respond within 2 hours.
                </p>
                <p className="mt-4 text-sm font-semibold text-teal-400">sales@crestsecurity.io</p>
              </div>
            </div>
            <div className="flex gap-x-4 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                <Mail className="h-5 w-5 text-teal-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-foreground">Support</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Current customers get 24/7 priority support.
                </p>
                <p className="mt-4 text-sm font-semibold text-teal-400">support@crestsecurity.io</p>
              </div>
            </div>
            <div className="flex gap-x-4 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                <MapPin className="h-5 w-5 text-teal-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-foreground">Headquarters</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  100 Security Plaza<br />
                  Suite 400<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form action="#" method="POST" className="bg-white/[0.02] p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-foreground">
                  First name
                </label>
                <div className="mt-2">
                  <Input type="text" name="first-name" id="first-name" autoComplete="given-name" />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-foreground">
                  Last name
                </label>
                <div className="mt-2">
                  <Input type="text" name="last-name" id="last-name" autoComplete="family-name" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium leading-6 text-foreground">
                Company
              </label>
              <div className="mt-2">
                <Input type="text" name="company" id="company" autoComplete="organization" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                Work Email
              </label>
              <div className="mt-2">
                <Input type="email" name="email" id="email" autoComplete="email" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-foreground">
                How can we help?
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  defaultValue={''}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-teal-500 text-gray-950 hover:bg-teal-400 font-semibold h-11">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
