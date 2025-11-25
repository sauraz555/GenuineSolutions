import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Talent Acquisition", href: "/services#talent-acquisition" },
    { name: "CV Preparation", href: "/services#cv-preparation" },
    { name: "407 Visa Training", href: "/services#407-visa" },
    { name: "Labour Market Testing", href: "/services#lmt" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">GS</span>
              </div>
              <span className="text-2xl font-bold">Genuine Solutions</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Premier recruitment and visa consultancy services in Australia.
              Trusted by 100+ clients with 5+ years of combined expertise.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@genuinesolutions.com.au"
                className="flex items-center space-x-3 text-slate-300 hover:text-wattle transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@genuinesolutions.com.au</span>
              </a>
              <a
                href="tel:+61283173775"
                className="flex items-center space-x-3 text-slate-300 hover:text-wattle transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+61 2 8317 3775</span>
              </a>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="h-5 w-5" />
                <span>Sydney, Australia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-wattle transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-wattle transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-wattle transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/genuinesolutions-au"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-eucalyptus flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/GenuineSolAU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-eucalyptus flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Genuine Solutions. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Premier Recruitment & Visa Services Provider in Australia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
