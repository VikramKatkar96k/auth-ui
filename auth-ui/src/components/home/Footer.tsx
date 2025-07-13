import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "मुख्य पान", href: "/dashboard" },
    { name: "फॉर्म्स", href: "/forms" },
    { name: "सेवा", href: "/services" },
    { name: "संपर्क", href: "/contact" },
  ];

  const services = [
    { name: "जात प्रमाणपत्र", href: "/forms/setu" },
    { name: "उत्पन्न प्रमाणपत्र", href: "/forms/income" },
    { name: "रेशन कार्ड", href: "/forms/ration" },
    { name: "शैक्षणिक प्रमाणपत्रे", href: "/forms/education" },
  ];

  const supportLinks = [
    { name: "मदत केंद्र", href: "/help" },
    { name: "वारंवार विचारले जाणारे प्रश्न", href: "/faq" },
    { name: "गोपनीयता धोरण", href: "/privacy" },
    { name: "नियम व अटी", href: "/terms" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Youtube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">PaperPath</h2>
                <p className="text-sm text-muted-foreground">सरकारी फॉर्म पोर्टल</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              आपल्या सर्व सरकारी कागदपत्रांसाठी एकच ठिकाण. 
              सुरक्षित, जलद आणि सोपे सेवा.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">द्रुत दुवे</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">सेवा</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">मदत व संपर्क</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {
              /* 
              
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>0000-0000-0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>vikramkatkar17@gmail.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>जालना महाराष्ट्र </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>www.paperpath.in</span>
              </div>
            </div>
            */}
            </div>
          </div>
          
        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PaperPath - . सर्व हक्क राखीव आहेत.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                गोपनीयता धोरण
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                नियम व अटी
              </Link>
              <Link to="/accessibility" className="hover:text-foreground transition-colors">
                प्रवेशयोग्यता
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;