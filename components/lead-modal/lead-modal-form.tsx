"use client";

import { useRef, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import { leadModal } from "@/content/landing";
import { leadSchema, maskTelefone, type LeadFormValues } from "@/lib/lead-schema";
import { getUtmParams } from "@/lib/utm";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { trackLeadSubmit, trackWhatsappRedirect } from "@/lib/tracking";
import { useLeadModal } from "./lead-modal-context";

const inputClass =
  "min-h-[44px] w-full rounded-xl border border-graphite/15 bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite/45 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40";

const labelClass = "mb-1.5 block text-sm font-semibold text-graphite";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
      {message}
    </p>
  );
}

export default function LeadModalForm() {
  const { origem, close } = useLeadModal();
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: { nome: "", email: "", telefone: "", website: "" },
  });

  const nomeRegistration = register("nome");
  const { onChange: onTelefoneChange, ...telefoneField } = register("telefone");

  async function onSubmit(values: LeadFormValues) {
    // Prevenção de duplo clique.
    if (submittingRef.current || isSubmitting) return;
    submittingRef.current = true;

    // Honeypot: se preenchido (robô), ignora silenciosamente, sem POST.
    if (values.website && values.website.trim() !== "") {
      submittingRef.current = false;
      return;
    }

    const origemAtual = origem ?? "desconhecido";
    const utm = getUtmParams();
    const payload = {
      nome: values.nome,
      email: values.email,
      telefone: values.telefone,
      origem: origemAtual,
      produto: "Misturador em V 50L",
      pagina: window.location.href,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
      referrer: document.referrer || "",
      data_hora: new Date().toISOString(),
    };

    // POST com keepalive (sobrevive à troca de página) e timeout de 4s.
    // Se falhar/dar timeout, NÃO bloqueamos o usuário: vamos ao WhatsApp.
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: "" }),
        keepalive: true,
        signal: controller.signal,
      });
    } catch (error) {
      console.error(
        "[lead-modal] Falha ao enviar lead; seguindo para o WhatsApp:",
        error
      );
    } finally {
      window.clearTimeout(timeoutId);
    }

    trackLeadSubmit(origemAtual);
    trackWhatsappRedirect(origemAtual);

    // Redirecionamento na MESMA ABA com window.location.href: window.open()
    // chamado após um await perde o gesto do usuário e é bloqueado pelo
    // Safari/iOS (popup blocker). location.href navegando na mesma aba nunca
    // é bloqueado — é a abordagem mais segura aqui.
    const message = leadModal.message(values.nome);
    window.location.href = getWhatsappUrl(message);

    reset();
    submittingRef.current = false;
    close();
  }

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <form onSubmit={onSubmitForm} noValidate className="mt-6 space-y-4">
      <div>
        <label htmlFor="lead-modal-nome" className={labelClass}>
          {leadModal.fields.nome} <span className="text-brand-dark">*</span>
        </label>
        <input
          id="lead-modal-nome"
          type="text"
          autoComplete="name"
          placeholder={leadModal.placeholders.nome}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "lead-modal-nome-error" : undefined}
          className={inputClass}
          {...nomeRegistration}
        />
        <FieldError id="lead-modal-nome-error" message={errors.nome?.message} />
      </div>

      <div>
        <label htmlFor="lead-modal-email" className={labelClass}>
          {leadModal.fields.email} <span className="text-brand-dark">*</span>
        </label>
        <input
          id="lead-modal-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={leadModal.placeholders.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "lead-modal-email-error" : undefined}
          className={inputClass}
          {...register("email")}
        />
        <FieldError id="lead-modal-email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="lead-modal-telefone" className={labelClass}>
          {leadModal.fields.telefone} <span className="text-brand-dark">*</span>
        </label>
        <input
          id="lead-modal-telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={leadModal.placeholders.telefone}
          aria-invalid={!!errors.telefone}
          aria-describedby={errors.telefone ? "lead-modal-telefone-error" : undefined}
          className={inputClass}
          {...telefoneField}
          onChange={(event) => {
            // Máscara brasileira (99) 99999-9999 aplicada antes do RHF ler o valor.
            event.target.value = maskTelefone(event.target.value);
            onTelefoneChange(event);
          }}
        />
        <FieldError
          id="lead-modal-telefone-error"
          message={errors.telefone?.message}
        />
      </div>

      {/* Honeypot anti-spam: invisível para humanos, preenchido por bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="lead-modal-website">Não preencha este campo</label>
        <input
          id="lead-modal-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 w-full !py-4 !text-base disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            {leadModal.submitting}
          </>
        ) : (
          <>
            <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            {leadModal.submit}
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-graphite/60">
        {leadModal.privacy}
      </p>
    </form>
  );
}
