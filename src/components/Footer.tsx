import eshLogo from '../assets/images/esh_logo_no_bg.png'

const footerNav = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'OUR WORK', href: '#work' },
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

const socialLinks = [
  { label: 'FACEBOOK', href: '#' },
  { label: 'INSTAGRAM', href: '#' },
  { label: 'YOUTUBE', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-esh-black border-t border-white/5 pt-20 pb-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={eshLogo}
                alt="ESH Logo"
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="text-gold text-xl font-bold tracking-wider">ESH</p>
                <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase leading-relaxed">
                  Ebenezer Streaming
                  <br />
                  House Ltd
                </p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Professional live streaming, event production and media services.
              We capture the moment. You experience it.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm tracking-wider transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-white/40 hover:text-gold text-sm tracking-wider transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            &copy; 2026 EbenEzer Streaming House Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gold/60" />
            <span className="text-white/30 text-xs tracking-wider">
              WE CAPTURE THE MOMENT. YOU EXPERIENCE IT.
            </span>
            <span className="w-2 h-2 bg-green/60" />
          </div>
        </div>
      </div>
    </footer>
  )
}