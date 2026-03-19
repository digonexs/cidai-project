import { Navbar, Footer } from "@/components/layout";
import { Section, Counter } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/data";
import { HandHeart, Users, Smile, Star, Heart, Award, Phone, Users2, HeartPulse, Home as HomeIcon, Stethoscope, CheckCircle2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import { VolunteerModal, CertificateModal } from "@/components/modals";

import heroImage from "@assets/generated_images/happy_elderly_people_with_healthy_smiles.png";
import careImage from "@assets/generated_images/caring_volunteer_helping_elderly_person.png";
import logoCidai from "@assets/Logo_do_Projeto_CIDAI_1767724861415.png";

export default function Home() {
  const [showVolunteerModal, setShowVolunteerModal] = React.useState(false);
  const [showCertificateModal, setShowCertificateModal] = React.useState(false);

  const iconMap: Record<string, any> = {
    Stethoscope,
    HandHeart,
    Users,
    Smile,
    Award,
    HeartPulse,
    HomeIcon,
    Users2,
    CheckCircle2,
    FileText,
    Star,
    Heart
  };

  const stats = [
    { label: "Idosos Atendidos", value: 100, suffix: "+", icon: HeartPulse },
    { label: "Instituições Parceiras", value: 10, suffix: "+", icon: HomeIcon },
    { label: "Voluntários Ativos", value: 10, suffix: "+", icon: Users2 },
    { label: "Sorrisos Devolvidos", value: 100, suffix: "+", icon: Smile },
  ];

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-[#1C3F3A] selection:text-white">
      <Navbar />

      <VolunteerModal open={showVolunteerModal} onOpenChange={setShowVolunteerModal} />
      <CertificateModal open={showCertificateModal} onOpenChange={setShowCertificateModal} />

      <Section className="pt-32 pb-20 lg:pt-48 lg:pb-32" blob="right">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#EBE8D8] text-[#1C3F3A] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Star className="h-4 w-4 fill-[#1C3F3A]" />
              <span>Projeto Voluntário sem fins lucrativos</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[#2D3748]">
              {content.hero.title.split(" ").map((word, i) => (
                <span key={i} className={i === 0 || i === 2 ? "text-[#1C3F3A]" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setShowVolunteerModal(true)}
                className="bg-[#1C3F3A] hover:bg-[#1C3F3A]/90 text-white rounded-full px-8 py-6 text-lg h-auto shadow-xl hover:translate-y-[-2px] transition-all duration-300"
              >
                {content.hero.ctaPrimary}
              </Button>
              <Button 
                onClick={() => setShowCertificateModal(true)}
                variant="outline" 
                className="border-2 border-[#1C3F3A]/20 hover:bg-[#EBE8D8] text-[#1C3F3A] rounded-full px-8 py-6 text-lg h-auto flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Emitir Certificado
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#458FF6] rounded-[40px] rotate-3 opacity-10 blur-2xl" />
            <img 
              src={heroImage} 
              alt="Idosos sorrindo" 
              className="relative rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3] transform hover:scale-[1.01] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </Section>

      <Section id="missao" className="bg-[#F9FAFB]" blob="none">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-[#1C3F3A] mb-6">{content.mission.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.mission.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.mission.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Smile;
            return (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[20px] shadow-[0px_15px_35px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-start gap-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EBE8D8] rounded-bl-full opacity-30 group-hover:scale-150 transition-transform duration-500 origin-top-right" />
                
                <div className="w-16 h-16 bg-[#EBE8D8]/50 rounded-2xl flex items-center justify-center text-[#1C3F3A]">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D3748]">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Section>

      <Section id="sobre" blob="left">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute -inset-4 bg-[#1C3F3A] rounded-[40px] -rotate-2 opacity-5" />
             <img 
              src={careImage} 
              alt="Voluntária ajudando idoso" 
              className="relative rounded-[32px] w-full shadow-xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <div className="flex gap-2 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm font-medium text-gray-800 italic">"Ver o sorriso no rosto deles não tem preço. É o melhor dia do meu mês."</p>
              <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wider">— Mariana, Voluntária</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-[#EBE8D8] text-[#1C3F3A] px-4 py-1.5 rounded-full font-bold text-xs mb-6 uppercase tracking-widest">
              Sobre Nós
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1C3F3A] mb-8 leading-tight">
              Mais do que saúde, levamos <span className="text-[#458FF6]">amor e acolhimento.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Muitos idosos em instituições de longa permanência sofrem com a solidão e a falta de recursos para tratamentos odontológicos adequados.
              </p>
              <p>
                O CIDAI atua para preencher essa lacuna, mobilizando dentistas, psicólogos e voluntários em geral para proporcionar um dia inesquecível de cuidado integral.
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {[
                "Atendimento Odontológico Gratuito",
                "Rodas de Conversa e Apoio Psicológico",
                "Atividades Lúdicas e Musicalização",
                "Doação de Kits de Higiene"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-[#2D3748]">
                  <div className="w-6 h-6 rounded-full bg-[#1C3F3A] flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => setShowVolunteerModal(true)}
              className="mt-10 bg-[#458FF6] hover:bg-[#3b7acb] text-white rounded-full px-8 py-6 text-lg h-auto shadow-lg hover:shadow-blue-200 transition-all"
            >
              Seja um Voluntário
            </Button>
          </div>
        </div>
      </Section>

      <Section id="impacto" className="bg-[#1C3F3A] text-white overflow-hidden" blob="none">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#EBE8D8] px-4 py-1.5 rounded-full font-bold text-xs mb-4 uppercase tracking-widest">
            Nosso Impacto
          </div>
          <h2 className="text-4xl font-bold text-white">Números que Transformam</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 bg-[#EBE8D8]/20 rounded-2xl flex items-center justify-center mb-6 text-[#EBE8D8] group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-[#EBE8D8] mb-2 tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 font-medium text-sm lg:text-base uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#458FF6] opacity-10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EBE8D8] opacity-5 blur-[120px] rounded-full" />
      </Section>

      <Section id="certificado" className="pb-32 relative overflow-hidden" blob="none">
        <div className="max-w-6xl mx-auto relative z-10 px-4">
          <div className="grid lg:grid-cols-12 gap-0 items-stretch bg-white rounded-[40px] shadow-[0px_40px_100px_rgba(28,63,58,0.12)] overflow-hidden border border-gray-100">
            
            <div className="lg:col-span-5 min-w-0 p-6 sm:p-10 lg:p-12 space-y-10 text-left flex flex-col justify-center">
              <div className="space-y-4 min-w-0">
                <div className="inline-flex items-center gap-2 bg-[#EBE8D8] text-[#1C3F3A] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm">
                  <Award className="w-4 h-4" />
                  Reconhecimento Oficial
                </div>

                <h2 className="text-4xl lg:text-6xl font-bold text-[#1C3F3A] leading-tight break-words">
                  Sua dedicação merece um <span className="text-[#458FF6] break-words">registro.</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl break-words">
                  Valorizamos cada ação dedicada ao Projeto CIDAI. Nosso certificado oficial é o símbolo da sua contribuição para a dignidade e saúde do idoso.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 py-4 min-w-0">
                <div className="w-full sm:flex-1 sm:min-w-[300px] min-w-0 flex flex-col sm:flex-row sm:items-start gap-4 p-6 rounded-2xl bg-[#EBE8D8]/20 border border-[#EBE8D8]/30 hover:bg-[#EBE8D8]/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-6 h-6 text-[#1C3F3A]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#1C3F3A] break-words">Válido Nacionalmente</h4>
                    <p className="text-sm text-gray-500 leading-snug break-words">
                      Ideal para horas complementares ou currículo profissional.
                    </p>
                  </div>
                </div>

                <div className="w-full sm:flex-1 sm:min-w-[300px] min-w-0 flex flex-col sm:flex-row sm:items-start gap-4 p-6 rounded-2xl bg-[#EBE8D8]/20 border border-[#EBE8D8]/30 hover:bg-[#EBE8D8]/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Heart className="w-6 h-6 text-[#1C3F3A]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#1C3F3A] break-words">Impacto Social</h4>
                    <p className="text-sm text-gray-500 leading-snug break-words">
                      O registro da sua marca na vida de quem mais precisa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full sm:w-auto bg-[#1C3F3A] hover:bg-[#1C3F3A]/90 text-white rounded-full px-8 sm:px-12 py-7 sm:py-9 text-lg sm:text-xl h-auto shadow-[0_20px_40px_rgba(28,63,58,0.2)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
                  Emitir Meu Certificado
                </Button>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-7 relative bg-[#F8F7F2] overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c3f3a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center p-10 xl:p-14">
                <motion.div
                  initial={{ rotate: 5, y: 20, opacity: 0 }}
                  whileInView={{ rotate: 3, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-[520px] aspect-[1.414/1] bg-white rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-[12px] border-[#1C3F3A] p-8 flex flex-col justify-between relative group hover:rotate-0 transition-all duration-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <img src={logoCidai} alt="CIDAI" className="h-10 opacity-60" />
                      <div className="h-0.5 w-full bg-[#1C3F3A]/10 rounded" />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-[#EBE8D8]/30 flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#1C3F3A] opacity-40" />
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="h-3 w-1/3 bg-gray-100 mx-auto rounded-full" />
                    <div className="space-y-2">
                      <div className="h-10 w-3/4 bg-[#EBE8D8]/40 mx-auto rounded-lg" />
                      <div className="h-4 w-1/2 bg-gray-100 mx-auto rounded-full" />
                    </div>
                    <div className="h-3 w-2/3 bg-gray-50 mx-auto rounded-full" />
                  </div>

                  <div className="flex justify-between items-end border-t border-gray-100 pt-8">
                    <div className="space-y-2">
                      <div className="h-0.5 w-24 bg-gray-200" />
                      <div className="h-2 w-16 bg-gray-100 rounded" />
                    </div>
                    <div className="w-20 h-20 bg-[#EBE8D8]/20 rounded-full border-4 border-dashed border-[#EBE8D8] flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#1C3F3A]/5" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-1/4 -right-12 w-64 h-64 bg-[#458FF6] opacity-10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#1C3F3A] opacity-5 blur-[120px] rounded-full" />
            </div>
          </div>
        </div>
      </Section>

      <a
        href="https://wa.me/5511975455253" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        title="Fale conosco no WhatsApp"
      >
        <Phone className="w-8 h-8 fill-white" />
      </a>

      <Footer />
    </div>
  );
}
