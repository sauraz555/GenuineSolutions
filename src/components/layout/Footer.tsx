import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="bg-slate text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo size="sm" showText={false} />
            <h3 className="text-lg font-semibold mt-4 mb-2">Genuine Solutions</h3>
            <p className="text-gray-300 text-sm">
              Connecting skilled workers with Australian employers for visa sponsorship
              and skilled employment opportunities. Your trusted partner for Australian
              immigration and employment solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/jobs" className="text-gray-300 hover:text-white transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/visa-guide" className="text-gray-300 hover:text-white transition-colors">
                  Visa Guide
                </a>
              </li>
              <li>
                <a href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Create Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/employer/signup" className="text-gray-300 hover:text-white transition-colors">
                  Register Company
                </a>
              </li>
              <li>
                <a href="/employer/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/sponsorship-info" className="text-gray-300 hover:text-white transition-colors">
                  Sponsorship Info
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; 2025 Genuine Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/about" className="hover:text-white transition-colors">
              About Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
