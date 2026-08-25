import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const CONTENT = {
  "/privacy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This page explains how Crest may collect, use, retain, and protect information when you use our website and services.",
    sections: [
      ["Information we collect", "We may collect information you provide directly, such as your name, work email, company, job title, and information submitted through demo or contact forms. We may also collect basic technical information such as browser, device, and usage data."],
      ["How we use information", "We use information to provide and improve Crest, respond to requests, schedule demonstrations, communicate with you, maintain security, and understand how our website is used."],
      ["Sharing", "We do not sell personal information. Information may be shared with service providers that help us operate the website or provide requested services, subject to appropriate confidentiality and security obligations."],
      ["Data retention", "We retain information only for as long as reasonably necessary for the purposes described here, legal obligations, dispute resolution, and legitimate business needs."],
      ["Your choices", "Depending on your location, you may have rights to access, correct, delete, or restrict certain uses of your personal information. Contact us to make a request."],
      ["Contact", "For privacy questions or requests, email privacy@crestsecurity.io."],
    ],
  },
  "/terms": {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "These terms describe the basic rules for using the Crest website and services.",
    sections: [
      ["Use of the site", "You agree to use Crest lawfully and not to interfere with the operation, security, or availability of the website or services."],
      ["Accounts and access", "If an account is provided, you are responsible for keeping credentials secure and for activity performed through your account. Do not share access in a way that violates your agreement with Crest."],
      ["Product information", "Descriptions, availability, performance information, and product features may change as Crest develops. Product materials should not be treated as a guarantee of a particular security outcome."],
      ["Intellectual property", "Crest and its associated materials, software, branding, and content are protected by applicable intellectual-property laws. No ownership rights are transferred except as expressly agreed."],
      ["Disclaimer", "To the extent permitted by law, the website is provided on an as-is and as-available basis. Specific commercial or service commitments are governed by the applicable agreement with Crest."],
      ["Contact", "Questions about these terms can be sent to legal@crestsecurity.io."],
    ],
  },
  "/cookies": {
    eyebrow: "Legal",
    title: "Cookie Policy",
    intro: "Crest may use cookies and similar technologies to keep the website functional, secure, and useful.",
    sections: [
      ["Essential cookies", "Some cookies are necessary for core functionality, security, preferences, or session management. These cannot always be disabled without affecting the site."],
      ["Analytics", "Where analytics are enabled, they may help us understand aggregate traffic, page performance, and product usage. We aim to use this information to improve the experience rather than to sell personal information."],
      ["Your controls", "Most browsers let you view, block, or delete cookies through their privacy settings. Disabling some cookies may affect functionality."],
      ["Changes", "We may update this policy when our use of cookies or similar technologies changes. The latest version will be published on this page."],
      ["Contact", "Questions about cookies can be sent to privacy@crestsecurity.io."],
    ],
  },
  "/security": {
    eyebrow: "Trust Center",
    title: "Security at Crest",
    intro: "Security is part of the product and the way we operate. This page summarizes our security principles while avoiding claims that have not been independently verified.",
    sections: [
      ["Secure development", "We aim to follow secure software-development practices, review changes before release, and minimize unnecessary access to sensitive systems and data."],
      ["Access control", "Access to internal systems is limited according to role and operational need. Authentication and authorization controls are applied to protected resources."],
      ["Data protection", "We use appropriate technical and organizational safeguards designed to protect information against unauthorized access, alteration, disclosure, or loss."],
      ["Monitoring and response", "We monitor relevant systems for security issues and maintain processes for investigating and responding to suspected incidents."],
      ["Responsible disclosure", "If you believe you have discovered a security vulnerability affecting Crest, please contact security@crestsecurity.io with enough detail for our team to investigate. Please do not access, modify, or disclose other users' data."],
      ["Compliance", "Specific compliance certifications, attestations, or contractual security commitments should only be represented as available when formally established. Contact us for current security documentation."],
    ],
  },
} as const;

export function Legal() {
  const location = useLocation();
  const content = CONTENT[location.pathname as keyof typeof CONTENT] ?? CONTENT["/privacy"];

  return (
    <div className="min-h-full bg-background text-foreground px-6 pt-32 pb-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" />
          Back to Crest
        </Link>

        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <ShieldCheck className="h-3.5 w-3.5" />
            {content.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground font-light">{content.intro}</p>
          <p className="mt-4 text-xs text-muted-foreground/70">Last updated: August 23, 2026</p>
        </div>

        <div className="space-y-10">
          {content.sections.map(([title, body]) => (
            <section key={title} className="border-t border-border pt-8">
              <h2 className="text-xl font-display tracking-tight">{title}</h2>
              <p className="mt-3 text-sm sm:text-base leading-7 text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
