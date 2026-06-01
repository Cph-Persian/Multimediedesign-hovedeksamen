/**
 * aiClient — bindeled mellem chatten og AI-motoren.
 */

import { preflightCheck, ruleBasedReply } from './ruleEngine.js'
import {
  sendMentorMessage,
  ApiServiceError,
  isApiServiceConfigured,
  FALLBACK_TEXT,
} from '../api/apiService.js'

/**
 * Hvilken backend bruger vi?
 * Returnerer 'groq' hvis VITE_GROQ_API_KEY er sat i .env, ellers 'rules'.
 * Bruges af forsiden til at vise hvilken motor der er aktiv.
 */
export function getAiBackend() {
  return isApiServiceConfigured() ? 'groq' : 'rules'
}

/**
 * getMentorReply — HOVED-FUNKTIONEN i hele AI-laget.
 *
 * Beslutningsrækkefølge (vigtig at kunne forklare):
 *   1. Pre-flight: kører i kode, ALDRIG via LLM. Fanger:
 *        • "skriv min stil for mig"  → outline-tilbud
 *        • "løs 2x²+4x=6"            → generel metode (uden tal-løsning)
 *        • cross-profile-spørgsmål   → afvisning + profil-skift-knap
 *   2. Hvis ingen pre-flight rammer: brug LLM hvis Groq er konfigureret,
 *      ellers regelmotor.
 *   3. Hvis LLM-kaldet kaster ApiServiceError → vis fallback-tekst.
 *   4. Hvis andet går galt → faldback til regelmotor.
 *
 * @param {object} args — { message, profileId, profile, user, history, curriculum, ... }
 */
export async function getMentorReply(args) {
  // ─────── Pre-flight: hårde regler aldrig overladt til LLM ───────
  // Hvis vores kode kan svare præcist (cross-profile, opgaveløsning,
  // skriv-for-mig), gør vi det her — ingen netværkskald.
  const preflight = preflightCheck(args)
  if (preflight) {
    // Lille kunstig forsinkelse så svaret føles "tænkt", ikke instant.
    await new Promise(r => setTimeout(r, 300 + Math.random() * 300))
    return { ...preflight, source: 'preflight' }
  }

  const backend = getAiBackend()

  // Ingen API-nøgle? Brug regelmotor lokalt (gratis, virker uden internet).
  if (backend === 'rules') {
    await new Promise(r => setTimeout(r, 600 + Math.random() * 500))
    return { ...ruleBasedReply(args), source: 'rules' }
  }

  // Groq-stien: vi sender til Llama 3 via apiService.
  try {
    const reply = await sendMentorMessage(args)
    return { ...reply, source: 'groq' }
  } catch (err) {
    console.warn('[aiClient] groq-fejl:', err)

    // ApiServiceError = netværk/API-fejl. Vis fallback i chatten så
    // brugeren VED at noget gik galt (ikke en silent regression).
    if (err instanceof ApiServiceError) {
      return {
        intent: 'error',
        text: FALLBACK_TEXT,
        followUp: null,
        source: 'error',
        error: err.message,
      }
    }

    // Andre fejl → fallback til regelmotor så chatten ikke dør.
    return { ...ruleBasedReply(args), source: 'rules-fallback', error: err?.message }
  }
}
