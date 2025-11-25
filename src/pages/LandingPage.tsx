import { ArrowRight, Briefcase, Globe, Shield, Users, CheckCircle2, Sparkles, Building2, Award, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center gradient-mesh">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-eucalyptus/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-ocean/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-eucalyptus/10 rounded-full text-eucalyptus-dark text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Australia's Premier Employment Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate leading-tight">
                Launch Your
                <span className="block text-gradient">Australian Career</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with verified employers offering genuine visa sponsorship and skilled employment opportunities across Australia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group shadow-lg shadow-eucalyptus/20 hover:shadow-xl hover:shadow-eucalyptus/30 transition-all"
                  onClick={() => window.location.href = '/signup'}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2"
                  onClick={() => window.location.href = '/employer/signup'}
                >
                  <Building2 className="mr-2 w-5 h-5" />
                  For Employers
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-eucalyptus">500+</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-ocean">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-slate">2000+</div>
                  <div className="text-sm text-gray-600">Placements</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in">
              <div className="relative z-10 space-y-4">
                <div className="glass-effect p-6 rounded-2xl border border-white/20 shadow-xl transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-eucalyptus rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate">Visa Sponsorship</div>
                      <div className="text-sm text-gray-600">482 & 186 Subclass</div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect p-6 rounded-2xl border border-white/20 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-ocean rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate">General Employment</div>
                      <div className="text-sm text-gray-600">All Australian States</div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect p-6 rounded-2xl border border-white/20 shadow-xl transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-wattle rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-wattle-dark" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate">Verified Employers</div>
                      <div className="text-sm text-gray-600">100% ABN Checked</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-ocean/10 rounded-full text-ocean font-medium text-sm mb-4">
              Dual-Stream Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate mb-4">
              Choose Your Path to Australia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you need sponsorship or have working rights, we've got you covered
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-eucalyptus">
              <div className="w-16 h-16 bg-eucalyptus/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-eucalyptus" />
              </div>
              <h3 className="text-2xl font-bold text-slate mb-4">Visa Sponsorship</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access verified employers with genuine sponsorship licenses. We facilitate connections for Subclass 482 and 186 visas with full support throughout your journey.
              </p>
              <ul className="space-y-3">
                {['482 TSS Temporary Sponsorship', '186 ENS Permanent Residency', 'Verified License Holders', 'End-to-end Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-eucalyptus flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-ocean">
              <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-2xl font-bold text-slate mb-4">General Employment</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Already have Australian working rights? Browse skilled positions nationwide with competitive salaries and career growth opportunities.
              </p>
              <ul className="space-y-3">
                {['189 Skilled Independent Visa', '190 State Nominated Visa', 'Citizens & PR Holders', 'All Major Industries'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-eucalyptus/10 rounded-full text-eucalyptus font-medium text-sm mb-4">
              Why Genuine Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate mb-4">
              Built for Your Success
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Employers',
                description: 'Every employer undergoes rigorous ABN and license verification before posting jobs.',
                color: 'eucalyptus'
              },
              {
                icon: Zap,
                title: 'Fast Matching',
                description: 'Our AI-powered system matches you with relevant opportunities in real-time.',
                color: 'ocean'
              },
              {
                icon: Target,
                title: 'High Success Rate',
                description: '98% placement success rate with continuous support throughout your journey.',
                color: 'wattle'
              },
              {
                icon: Users,
                title: 'Expert Guidance',
                description: 'Dedicated support team specializing in Australian immigration and employment.',
                color: 'eucalyptus'
              },
              {
                icon: Award,
                title: 'Trusted Platform',
                description: 'Recognized by major Australian employers and immigration consultants.',
                color: 'ocean'
              },
              {
                icon: Globe,
                title: 'National Coverage',
                description: 'Opportunities across all Australian states and territories.',
                color: 'wattle'
              }
            ].map((feature, i) => (
              <div key={i} className="group">
                <div className={`w-14 h-14 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-eucalyptus via-eucalyptus-dark to-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
            Join over 2,000 professionals who have successfully landed their dream jobs in Australia through Genuine Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-eucalyptus hover:bg-gray-100 shadow-xl"
              onClick={() => window.location.href = '/signup'}
            >
              Create Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/jobs'}
            >
              Browse Jobs
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Free to join
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              No hidden fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Verified opportunities only
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
