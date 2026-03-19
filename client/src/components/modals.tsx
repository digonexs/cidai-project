import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "sonner";

import { jsPDF } from "jspdf";
import logoCidai from "@assets/Logo_do_Projeto_CIDAI_1767724861415.png";

const volunteerSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, "E-mail é obrigatório").email("Formato de e-mail inválido (ex: usuario@email.com)"),
  phone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  area: z.string().min(2, "Informe sua área de atuação"),
});

const certificateSchema = z.object({
  keyword: z.string().min(1, "Palavra-chave obrigatória"),
  fullName: z.string().min(3, "Nome completo obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
});

export function VolunteerModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { fullName: "", email: "", phone: "", area: "" },
  });

  const onSubmit = (data: z.infer<typeof volunteerSchema>) => {
    const subject = encodeURIComponent("Novo Cadastro de Voluntário - Projeto CIDAI");
    const body = encodeURIComponent(
      `Olá, gostaria de me cadastrar como voluntário no Projeto CIDAI.\n\n` +
      `Dados:\n` +
      `- Nome: ${data.fullName}\n` +
      `- E-mail: ${data.email}\n` +
      `- WhatsApp: ${data.phone}\n` +
      `- Área de Atuação: ${data.area}`
    );
    
    window.open(`https://wa.me/5511975455253?text=${body}`, "_blank");
    
    toast.success("Enviando dados via WhatsApp...");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1C3F3A]">Seja um Voluntário</DialogTitle>
          <DialogDescription>
            Preencha seus dados abaixo para se juntar à nossa causa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone / WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Dentista, Estudante, etc." {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-[#1C3F3A] hover:bg-[#1C3F3A]/90 text-white rounded-full py-6 text-lg">
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CertificateModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
    defaultValues: { keyword: "", fullName: "", cpf: "" },
  });

  const onSubmit = (data: z.infer<typeof certificateSchema>) => {
    if (data.keyword.toLowerCase() !== "souvoluntario") {
      toast.error("Palavra-chave incorreta.");
      form.setError("keyword", { message: "Palavra-chave incorreta" });
      return;
    }
    
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      doc.setFillColor(252, 251, 247);
      doc.rect(0, 0, 297, 210, "F");

      try {
        doc.setGState(new (doc as any).GState({opacity: 0.1}));
        doc.addImage(logoCidai, 'PNG', 48.5, 30, 200, 150);
        doc.setGState(new (doc as any).GState({opacity: 1}));
      } catch (e) {
        doc.addImage(logoCidai, 'PNG', 48.5, 30, 200, 150);
      }

      doc.setDrawColor(28, 63, 58);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 277, 190);

      doc.setTextColor(28, 63, 58);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(48);
      doc.text("CERTIFICADO", 148.5, 60, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(22);
      doc.text("Certificamos que", 148.5, 90, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(36);
      doc.text(data.fullName.toUpperCase(), 148.5, 110, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.text(`inscrito(a) sob o CPF ${data.cpf}`, 148.5, 125, { align: "center" });

      doc.setFontSize(20);
      const text = "Participou como voluntário(a) das ações do Projeto CIDAI, contribuindo com dedicação e humanização para o Centro de Inclusão e Dignidade ao Idoso.";
      const splitText = doc.splitTextToSize(text, 220);
      doc.text(splitText, 148.5, 145, { align: "center" });

      doc.setFontSize(14);
      doc.text(`Data de emissão: ${new Date().toLocaleDateString("pt-BR")}`, 148.5, 175, { align: "center" });

      doc.setDrawColor(28, 63, 58);
      doc.setLineWidth(0.5);
      doc.line(100, 185, 197, 185);
      doc.setFontSize(14);
      doc.text("Coordenação Projeto CIDAI", 148.5, 192, { align: "center" });

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");

      toast.success("Certificado gerado com sucesso!");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Ocorreu um erro ao gerar o certificado.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1C3F3A]">Emitir Certificado</DialogTitle>
          <DialogDescription>
            Informe a palavra-chave e seus dados para gerar o certificado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavra-Chave</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite a palavra-chave" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} className="rounded-xl border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-[#1C3F3A] hover:bg-[#1C3F3A]/90 text-white rounded-full py-6 text-lg">
                Gerar Certificado
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
