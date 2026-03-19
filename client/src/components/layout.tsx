import * as React from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navLinks, content } from "@/lib/data";
import { Menu, X, Heart, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logoCidai from "@assets/Logo_do_Projeto_CIDAI_1767724861415.png";
import { VolunteerModal } from "@/components/modals";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = navLinks.map(link => link.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 200;
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection("certificado");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-6"
      )}
    >
      <VolunteerModal open={showVolunteerModal} onOpenChange={setShowVolunteerModal} />
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <img src={logoCidai} alt="CIDAI Logo" className="h-16 md:h-28 w-auto object-contain transition-all" />
          </a>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.name === "Contato" ? "https://wa.me/5511975455253" : link.href}
                target={link.name === "Contato" ? "_blank" : undefined}
                rel={link.name === "Contato" ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-gray-600 hover:text-[#1C3F3A] transition-all text-sm",
                  isActive ? "text-[#1C3F3A] font-bold" : "font-medium"
                )}
              >
                {link.name}
              </a>
            );
          })}
          <Button 
            onClick={() => setShowVolunteerModal(true)}
            className="bg-[#1C3F3A] hover:bg-[#1C3F3A]/90 text-white rounded-full px-10 py-7 text-base shadow-none h-auto hidden lg:flex"
          >
            Seja um Voluntário
          </Button>
        </nav>

        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t p-6 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.name === "Contato" ? "https://wa.me/5511975455253" : link.href}
              target={link.name === "Contato" ? "_blank" : undefined}
              rel={link.name === "Contato" ? "noopener noreferrer" : undefined}
              className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={() => {
              setIsOpen(false);
              setShowVolunteerModal(true);
            }}
            className="w-full bg-[#1C3F3A] text-white rounded-full mt-4"
          >
            Seja um Voluntário
          </Button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1C3F3A] text-white pt-20 pb-10 rounded-t-[40px] mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img src={logoCidai} alt="CIDAI Logo" className="h-16 w-auto mb-6 object-contain" />
            <p className="text-gray-300 max-w-sm mb-6 leading-relaxed">
              {content.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/5511975455253" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Navegação</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.name === "Contato" ? "https://wa.me/5511975455253" : link.href} 
                    target={link.name === "Contato" ? "_blank" : undefined}
                    rel={link.name === "Contato" ? "noopener noreferrer" : undefined}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <a href="https://wa.me/5511975455253" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="h-5 w-5 opacity-70" />
                  <span>(11) 97545-5253</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
