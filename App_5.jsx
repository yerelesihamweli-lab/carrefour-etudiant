import { useState, useEffect } from "react";
import {
  Home, MessageSquare, Briefcase, BookOpen, Users, User, GraduationCap,
  Send, Copy, Check, ChevronRight, ChevronLeft, Plus, X, Loader2,
  MapPin, Calendar, ArrowRight, Search, ExternalLink, LogOut,
  Star, Bell, Flag, ShieldCheck, Car, Award, Megaphone,
} from "lucide-react";

/* ---------------------------------------------------------------
   DONNÉES DE RÉFÉRENCE
--------------------------------------------------------------- */
const UNIVERSITES = [
  // Universités publiques
  { id: "ujkz", nom: "Université Joseph KI-ZERBO", ville: "Ouagadougou", sigle: "UJKZ", type: "publique" },
  { id: "uts", nom: "Université Thomas SANKARA", ville: "Ouagadougou", sigle: "UTS", type: "publique" },
  { id: "unb", nom: "Université Nazi BONI", ville: "Bobo-Dioulasso", sigle: "UNB", type: "publique" },
  { id: "unz", nom: "Université Norbert ZONGO", ville: "Koudougou", sigle: "UNZ", type: "publique" },
  { id: "uohg", nom: "Université de Ouahigouya", ville: "Ouahigouya", sigle: "UOHG", type: "publique" },
  { id: "ufdg", nom: "Université de Fada N'Gourma", ville: "Fada N'Gourma", sigle: "UFDG", type: "publique" },
  { id: "ud", nom: "Université de Dédougou", ville: "Dédougou", sigle: "UD", type: "publique" },
  { id: "uvbf", nom: "Université Virtuelle du Burkina Faso", ville: "À distance", sigle: "UVBF", type: "publique" },
  // Universités et instituts privés
  { id: "usta", nom: "Université Saint Thomas d'Aquin", ville: "Ouagadougou", sigle: "USTA", type: "privee" },
  { id: "ulb", nom: "Université Libre du Burkina", ville: "Ouagadougou", sigle: "ULB", type: "privee" },
  { id: "ucao", nom: "Université Catholique de l'Afrique de l'Ouest (UUB)", ville: "Bobo-Dioulasso", sigle: "UCAO", type: "privee" },
  { id: "upcsj", nom: "Université Privée Catholique Saint Joseph de Kaya", ville: "Kaya", sigle: "UPCSJ", type: "privee" },
  { id: "uauben", nom: "Université Aube Nouvelle", ville: "Ouagadougou", sigle: "UAUBEN", type: "privee" },
  { id: "upo", nom: "Université Privée de Ouagadougou", ville: "Ouagadougou", sigle: "UPO", type: "privee" },
  { id: "uua", nom: "Université de l'Unité Africaine", ville: "Ouagadougou", sigle: "UUA", type: "privee" },
  { id: "utm", nom: "Université de Technologie et de Management", ville: "Ouagadougou", sigle: "UTM", type: "privee" },
  { id: "suubf", nom: "SWISS UMEF University of Burkina Faso", ville: "Ouagadougou", sigle: "SUUBF", type: "privee" },
  { id: "usdao", nom: "Université Saint Dominique d'Afrique de l'Ouest", ville: "Doulougou", sigle: "USDAO", type: "privee" },
  { id: "iam", nom: "Institut Africain de Management", ville: "Ouagadougou", sigle: "IAM", type: "privee" },
  { id: "2ie", nom: "Fondation 2iE", ville: "Ouagadougou", sigle: "2iE", type: "privee" },
  { id: "ispp", nom: "Institut Supérieur de Pédagogie et de Psychologie", ville: "Ouagadougou", sigle: "ISPP", type: "privee" },
  { id: "ifp", nom: "Institut de Formation Professionnelle", ville: "Ouagadougou", sigle: "IFP", type: "privee" },
  { id: "ubs", nom: "Université Burkinabè des Sciences", ville: "Ouagadougou", sigle: "UBS", type: "privee" },
  { id: "ucbf", nom: "Université Chrétienne du Burkina Faso", ville: "Ouagadougou", sigle: "UCBF", type: "privee" },
  { id: "isig", nom: "Institut Supérieur d'Informatique et de Gestion", ville: "Ouagadougou", sigle: "ISIG", type: "privee" },
  { id: "isgea", nom: "Institut Supérieur de Gestion des Entreprises et des Affaires", ville: "Ouagadougou", sigle: "ISGEA", type: "privee" },
  { id: "esge", nom: "École Supérieure de Gestion et d'Économie", ville: "Ouagadougou", sigle: "ESGE", type: "privee" },
  { id: "ifoad", nom: "Institut de Formation Ouverte À Distance", ville: "Ouagadougou", sigle: "IFOAD", type: "privee" },
  { id: "cerpamad", nom: "Institut Supérieur CERPAMAD", ville: "Ouagadougou", sigle: "CERPAMAD", type: "privee" },
  { id: "enam", nom: "École Nationale d'Administration et de Magistrature", ville: "Ouagadougou", sigle: "ENAM", type: "publique" },
  { id: "ensk", nom: "École Nationale de Santé Publique de Koudougou", ville: "Koudougou", sigle: "ENSP", type: "publique" },
  { id: "inss", nom: "Institut National des Sciences des Sociétés", ville: "Ouagadougou", sigle: "INSS", type: "publique" },
  { id: "ige", nom: "Institut de Génie de l'Environnement", ville: "Ouagadougou", sigle: "IGE", type: "privee" },
  { id: "hec", nom: "Haute École de Commerce du Burkina", ville: "Ouagadougou", sigle: "HEC-BF", type: "privee" },
  { id: "autre", nom: "Autre établissement", ville: "", sigle: "—", type: "autre" },
];
const uniBy = (id) => UNIVERSITES.find((u) => u.id === id) || UNIVERSITES[UNIVERSITES.length - 1];

const FILIERES = [
  // Sciences juridiques et politiques
  "Droit privé", "Droit public", "Sciences politiques", "Droit des affaires",
  // Économie et gestion
  "Économie", "Gestion des entreprises", "Comptabilité & Finance", "Audit & Contrôle de gestion",
  "Gestion des ressources humaines", "Management", "Administration des affaires (MBA)",
  // Marketing et commerce
  "Marketing", "Gestion commerciale", "Commerce international", "Technique de vente",
  // Banque et finance
  "Banque & Finance", "Microfinance", "Assurance", "Fiscalité",
  // Transport et logistique
  "Transport & Logistique", "Logistique humanitaire", "Supply Chain Management", "Gestion portuaire & aéroportuaire",
  // Communication
  "Communication d'entreprise", "Journalisme & Médias", "Relations publiques", "Communication digitale",
  // Informatique et télécoms
  "Informatique (Génie logiciel)", "Réseaux informatiques & Télécommunications", "Cybersécurité",
  "Intelligence artificielle & Data Science", "Systèmes d'information",
  // Sciences et techniques
  "Mathématiques", "Physique", "Chimie", "Biologie", "Sciences de la Terre & Géologie",
  "Génie civil", "Génie électrique", "Génie mécanique", "Génie industriel",
  "Mines & Géologie", "Énergies renouvelables", "Environnement & Développement durable",
  // Médecine et santé
  "Médecine générale", "Pharmacie", "Chirurgie dentaire", "Sciences infirmières",
  "Santé publique", "Nutrition & Diététique", "Kinésithérapie",
  // Sciences agronomiques
  "Agronomie", "Élevage & Productions animales", "Eaux & Forêts",
  "Agroalimentaire", "Développement rural",
  // Lettres et sciences humaines
  "Lettres modernes", "Linguistique", "Histoire", "Géographie",
  "Philosophie", "Sociologie", "Psychologie", "Anthropologie",
  // Sciences de l'éducation
  "Sciences de l'éducation", "Formation des maîtres", "Encadrement scolaire",
  // Architecture et urbanisme
  "Architecture", "Urbanisme & Aménagement du territoire",
  // Autre
  "Autre filière",
];
const NIVEAUX = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];
const CATEGORIES_FORUM = ["Cours & Méthodologie", "Vie associative", "Stages & Emplois", "Logement", "Bourses & Concours", "Détente"];
const TYPES_OPP = [
  { id: "stage", label: "Stage" }, { id: "emploi", label: "Emploi" }, { id: "bourse", label: "Bourse" },
  { id: "concours", label: "Concours" }, { id: "evenement", label: "Événement" }, { id: "atelier", label: "Atelier / Formation" },
];
const TYPES_RES = ["Fiche de cours", "Annales / Examens", "Support TD / TP", "Guide méthodologique", "Lien utile"];
const CATEGORIES_CLUB = ["Sportif", "Culturel", "Scientifique & Académique", "Entrepreneuriat", "Solidarité & Bénévolat", "Autre"];
const RAISONS_SIGNALEMENT = ["Spam ou publicité", "Contenu inapproprié", "Arnaque ou fraude", "Harcèlement", "Autre"];
const TYPES_EVENEMENT = [
  { id: "soiree", label: "Soirée étudiante" },
  { id: "conference", label: "Conférence" },
  { id: "forum", label: "Forum" },
  { id: "debat", label: "Débat" },
  { id: "caravane", label: "Caravane" },
  { id: "kermesse", label: "Kermesse" },
  { id: "sport", label: "Compétition sportive" },
  { id: "culturel", label: "Événement culturel" },
  { id: "autre", label: "Autre fête / activité" },
];
const SEED_EVENEMENTS = [
  { id: "ev1", type: "conference", titre: "Conférence : Entrepreneuriat et innovation en Afrique", universite: "ujkz",
    lieu: "Amphi 500, UJKZ", date: "2026-07-05", heure: "09:00", description: "Intervenants venus de plusieurs pays africains. Entrée libre pour les étudiants.",
    affiche: "", auteur: "Aicha_K", datePub: "2026-06-20T10:00:00" },
  { id: "ev2", type: "soiree", titre: "Soirée de fin d'année — Promo 2026", universite: "unb",
    lieu: "Salle des fêtes UNB", date: "2026-07-15", heure: "20:00", description: "Grande soirée de la promotion sortante. Tenue de soirée exigée.",
    affiche: "", auteur: "Salif_B", datePub: "2026-06-21T08:00:00" },
];

const SEED_FORUM = [
  { id: "t1", numero: 1, universite: "ujkz", categorie: "Bourses & Concours", titre: "Constitution du dossier de bourse 2026, qui a déjà fait ?",
    contenu: "Je dépose mon dossier la semaine prochaine. Quelqu'un a la liste exacte des pièces demandées cette année ?",
    type: "discussion", options: null, auteur: "Aicha_K", date: "2026-06-15T10:00:00", reponses: [
      { id: "r1", auteur: "Boukary.D", contenu: "Relevés de notes + certificat de scolarité + extrait de naissance, c'était ça l'an dernier.", date: "2026-06-15T12:30:00" },
    ] },
  { id: "t2", numero: 2, universite: "unb", categorie: "Logement", titre: "Chambre à partager près du campus de Bobo",
    contenu: "On cherche un(e) 3e coloc pour une maison à 10 min à pied de la fac. Loyer raisonnable.",
    type: "discussion", options: null, auteur: "Salif_B", date: "2026-06-17T09:15:00", reponses: [] },
  { id: "t3", numero: 3, universite: "ulb", categorie: "Vie associative", titre: "Sondage : quel jour pour la prochaine rencontre inter-universités ?",
    contenu: "On essaie de fixer une date qui convient au plus grand nombre.", type: "sondage",
    options: [{ texte: "Samedi", votants: ["Aicha_K"] }, { texte: "Dimanche", votants: [] }],
    auteur: "Salif_B", date: "2026-06-18T08:00:00", reponses: [] },
];
const SEED_OPP = [
  { id: "o1", type: "stage", titre: "Stage découverte — Cabinet comptable (Ouaga)", universite: "ujkz", lieu: "Ouagadougou",
    date: "2026-07-10", description: "Stage de 2 mois pour étudiant en Économie & Gestion, niveau Licence 2 minimum.",
    estPartenaire: false, nomEntreprise: "", auteur: "Aicha_K", datePub: "2026-06-12T08:00:00" },
  { id: "o2", type: "concours", titre: "Concours direct Fonction publique — session 2026", universite: "autre", lieu: "National",
    date: "2026-08-01", description: "Ouverture des inscriptions pour plusieurs corps de la fonction publique.",
    estPartenaire: false, nomEntreprise: "", auteur: "Salif_B", datePub: "2026-06-14T08:00:00" },
];
const SEED_RES = [
  { id: "d1", type: "Fiche de cours", titre: "Résumé — Droit des obligations", matiere: "Droit civil", universite: "ujkz",
    lien: "", description: "Synthèse du semestre 2, utile avant l'examen.", auteur: "Boukary.D", date: "2026-06-10T14:00:00" },
  { id: "d2", type: "Annales / Examens", titre: "Annales Microéconomie 2023-2025", matiere: "Microéconomie", universite: "unb",
    lien: "", description: "Trois années de sujets corrigés.", auteur: "Salif_B", date: "2026-06-09T11:00:00" },
];
const SEED_DIR = [
  { pseudo: "Aicha_K", universite: "ujkz", filiere: "Économie & Gestion", niveau: "Licence 3", bio: "Passionnée de finance, ouverte aux échanges sur les bourses d'études.",
    statutAcademique: "etudiant", anneeObtention: "", competences: "Excel, Analyse financière", estMentor: false, domaineMentorat: "", disponibiliteMentorat: "",
    statutVerification: "non_demande", verifie: false },
  { pseudo: "Salif_B", universite: "unb", filiere: "Sciences & Techniques", niveau: "Master 1", bio: "Génie informatique. Toujours partant pour un projet ou un partage de ressources.",
    statutAcademique: "alumni", anneeObtention: "2023", competences: "Développement web, Python", estMentor: true, domaineMentorat: "Informatique & programmation",
    disponibiliteMentorat: "Week-ends", statutVerification: "verifie", verifie: true },
];
const SEED_CLUBS = [
  { id: "c1", nom: "Club Entrepreneuriat Étudiant", universite: "ujkz", categorie: "Entrepreneuriat",
    description: "On accompagne les étudiants qui veulent monter leur premier projet.", contact: "club.entrepreneuriat@exemple.bf",
    auteur: "Aicha_K", date: "2026-06-11T10:00:00" },
];
const SEED_COVOIT = [
  { id: "v1", depart: "Ouagadougou", arrivee: "Bobo-Dioulasso", date: "2026-06-28", heure: "07:00", places: 3, prix: "3 000 FCFA",
    commentaire: "Départ devant l'UJKZ, voiture climatisée.", auteur: "Salif_B", date_pub: "2026-06-19T09:00:00" },
];

/* ---------------------------------------------------------------
   SUPABASE — base de données et comptes réels
   - Crée un projet sur https://supabase.com (gratuit)
   - Colle le script SQL fourni dans l'éditeur SQL du projet
   - Remplace les deux constantes ci-dessous par celles de TON projet
     (Project Settings → API → "Project URL" et "anon public" key)
   - Dans Authentication → Providers → Email, désactive "Confirm email"
     pour que l'accès soit immédiat après inscription
--------------------------------------------------------------- */
const SUPABASE_URL = "https://neibpthidhtdfmvswpzd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laWJwdGhpZGh0ZGZtdnN3cHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMjM1MTcsImV4cCI6MjA5NzY5OTUxN30.H8z2rXeOBOoyd0_10fWK7A0GvbVBI6YurKR5CtzrCY0";

// --- session (mise en cache locale via le stockage de l'artefact) ---
let cachedSession = null;
async function loadSession() {
  if (cachedSession) return cachedSession;
  try { const r = await window.storage.get("supabase-session", false); cachedSession = r ? JSON.parse(r.value) : null; }
  catch { cachedSession = null; }
  return cachedSession;
}
async function saveSession(session) {
  cachedSession = session;
  try { await window.storage.set("supabase-session", JSON.stringify(session), false); } catch {}
}
async function clearSession() {
  cachedSession = null;
  try { await window.storage.set("supabase-session", JSON.stringify(null), false); } catch {}
}
async function getCurrentSession() { return loadSession(); }

async function authFetch(path, options = {}) {
  const session = await loadSession();
  const headers = {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    ...(options.headers || {}),
  };
  return fetch(`${SUPABASE_URL}${path}`, { ...options, headers });
}

// --- authentification ---
async function signUp(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "Échec de l'inscription.");
  if (data.access_token) await saveSession(data);
  return data;
}
async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "Identifiants invalides.");
  await saveSession(data);
  return data;
}
async function signOut() {
  try { await authFetch(`/auth/v1/logout`, { method: "POST" }); } catch {}
  await clearSession();
}

/* ---------------------------------------------------------------
   STOCKAGE — mêmes signatures qu'avant, mais lisent/écrivent
   désormais dans de vraies tables Postgres (kv_shared / kv_personal)
--------------------------------------------------------------- */
async function getShared(key, fallback) {
  try {
    const res = await authFetch(`/rest/v1/kv_shared?key=eq.${encodeURIComponent(key)}&select=value`);
    const rows = await res.json();
    return Array.isArray(rows) && rows[0] ? rows[0].value : fallback;
  } catch { return fallback; }
}
async function setShared(key, value) {
  try {
    await authFetch(`/rest/v1/kv_shared`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
  } catch {}
}
async function getPersonal(key, fallback) {
  const session = await loadSession();
  if (!session?.user?.id) return fallback;
  try {
    const res = await authFetch(`/rest/v1/kv_personal?owner_id=eq.${session.user.id}&key=eq.${encodeURIComponent(key)}&select=value`);
    const rows = await res.json();
    return Array.isArray(rows) && rows[0] ? rows[0].value : fallback;
  } catch { return fallback; }
}
async function setPersonal(key, value) {
  const session = await loadSession();
  if (!session?.user?.id) return;
  try {
    await authFetch(`/rest/v1/kv_personal`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ owner_id: session.user.id, key, value, updated_at: new Date().toISOString() }),
    });
  } catch {}
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmtDate = (iso) => {
  try { return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); }
  catch { return ""; }
};

/* ---------------------------------------------------------------
   PETITS COMPOSANTS
--------------------------------------------------------------- */
function SealBadge({ sigle, size = "sm" }) {
  const dims = size === "sm" ? "w-9 h-9 text-[8px]" : "w-14 h-14 text-[11px]";
  return (
    <div className={`relative ${dims} shrink-0 rounded-full border-2 border-double border-amber-500 bg-slate-900 flex items-center justify-center`}>
      <span className="font-serif tracking-wide text-stone-50 px-0.5 text-center leading-none">{sigle}</span>
    </div>
  );
}
function Tag({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700", amber: "bg-amber-100 text-amber-800", rose: "bg-rose-100 text-rose-800",
    emerald: "bg-emerald-100 text-emerald-800", indigo: "bg-indigo-100 text-indigo-800",
  };
  return <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${tones[tone]}`}>{children}</span>;
}
function PrimaryButton({ children, onClick, disabled, full, icon: Icon }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${full ? "w-full" : ""} inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors`}>
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}
function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
const inputCls = "w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600";

function UniversiteSelect({ value, onChange, includeToutes }) {
  return (
    <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
      {includeToutes && <option value="toutes">Toutes les universités</option>}
      <optgroup label="Universités publiques">
        {UNIVERSITES.filter((u) => u.type === "publique").map((u) => <option key={u.id} value={u.id}>{u.nom}</option>)}
      </optgroup>
      <optgroup label="Universités privées">
        {UNIVERSITES.filter((u) => u.type === "privee").map((u) => <option key={u.id} value={u.id}>{u.nom}</option>)}
      </optgroup>
      <option value="autre">Autre établissement</option>
    </select>
  );
}
function RuledCard({ children, onClick }) {
  return (
    <div onClick={onClick}
      style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 26px, rgba(30,41,59,0.06) 27px)" }}
      className={`bg-stone-50 border border-stone-200 rounded-2xl p-4 ${onClick ? "cursor-pointer active:scale-[0.99] transition-transform" : ""}`}>
      {children}
    </div>
  );
}
function SectionHeader({ eyebrow, title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        {eyebrow && <p className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold mb-0.5">{eyebrow}</p>}
        <h2 className="font-serif text-lg text-stone-50">{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0">
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
function EmptyState({ text }) {
  return <div className="text-center py-10 px-4"><p className="text-sm text-slate-400">{text}</p></div>;
}
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-slate-950/70 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 sticky top-0 bg-white">
          <h3 className="font-serif text-base text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
function ReportButton({ onClick }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="text-slate-300 hover:text-rose-700 shrink-0" title="Signaler">
      <Flag size={13} />
    </button>
  );
}
function SubscribeToggle({ active, onClick, label }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${active ? "bg-amber-700 border-amber-700 text-white" : "border-slate-700 text-slate-300"}`}>
      <Star size={12} fill={active ? "currentColor" : "none"} /> {active ? "Suivi" : label}
    </button>
  );
}
function VerifBadge({ statut }) {
  if (statut !== "verifie") return null;
  return <span className="inline-flex items-center text-emerald-700" title="Profil vérifié"><ShieldCheck size={13} /></span>;
}

/* ---------------------------------------------------------------
   APPLICATION
--------------------------------------------------------------- */
export default function App() {
  const [booting, setBooting] = useState(true);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("landing");
  const [activeTab, setActiveTab] = useState("accueil");

  const [regForm, setRegForm] = useState({
    prenom: "", pseudo: "", email: "", password: "", universite: "ujkz", filiere: FILIERES[0], niveau: NIVEAUX[0],
    telephone: "", bio: "", inscritAnnuaire: true,
  });
  const [regError, setRegError] = useState("");
  const [regSubmitting, setRegSubmitting] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const [payRef, setPayRef] = useState("");
  const [photoCarteUrl, setPhotoCarteUrl] = useState("");
  const [copied, setCopied] = useState("");
  const MONTANT_INSCRIPTION = "2 000 FCFA";
  const NUM_ORANGE = "+226 XX XX XX XX";
  const NUM_MOOV = "+226 XX XX XX XX";

  const [threads, setThreads] = useState(null);
  const [opportunites, setOpportunites] = useState(null);
  const [ressources, setRessources] = useState(null);
  const [annuaire, setAnnuaire] = useState(null);
  const [clubs, setClubs] = useState(null);
  const [covoiturages, setCovoiturages] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [signalements, setSignalements] = useState(null);

  const [filterUniForum, setFilterUniForum] = useState("toutes");
  const [filterCatForum, setFilterCatForum] = useState("toutes");
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [newThread, setNewThread] = useState({ universite: "ujkz", categorie: CATEGORIES_FORUM[0], titre: "", contenu: "", type: "discussion", options: ["", ""] });
  const [replyText, setReplyText] = useState("");

  const [filterTypeOpp, setFilterTypeOpp] = useState("toutes");
  const [newOppOpen, setNewOppOpen] = useState(false);
  const [newOpp, setNewOpp] = useState({ type: "stage", titre: "", universite: "ujkz", lieu: "", date: "", description: "", estPartenaire: false, nomEntreprise: "" });
  const [candidatureOpp, setCandidatureOpp] = useState(null);
  const [candidatureMotivation, setCandidatureMotivation] = useState("");

  const [evenements, setEvenements] = useState(null);
  const [filterTypeEv, setFilterTypeEv] = useState("tous");
  const [filterUniEv, setFilterUniEv] = useState("toutes");
  const [newEvOpen, setNewEvOpen] = useState(false);
  const [newEv, setNewEv] = useState({ type: "soiree", titre: "", universite: "ujkz", lieu: "", date: "", heure: "", description: "", affiche: "" });

  const [filterUniRes, setFilterUniRes] = useState("toutes");
  const [newResOpen, setNewResOpen] = useState(false);
  const [newRes, setNewRes] = useState({ type: TYPES_RES[0], titre: "", matiere: "", universite: "ujkz", lien: "", description: "" });

  const [reseauTab, setReseauTab] = useState("annuaire");
  const [searchDir, setSearchDir] = useState("");
  const [filterUniDir, setFilterUniDir] = useState("toutes");
  const [filterStatutDir, setFilterStatutDir] = useState("tous");
  const [filterUniClub, setFilterUniClub] = useState("toutes");
  const [newClubOpen, setNewClubOpen] = useState(false);
  const [newClub, setNewClub] = useState({ nom: "", universite: "ujkz", categorie: CATEGORIES_CLUB[0], description: "", contact: "" });
  const [newCovoitOpen, setNewCovoitOpen] = useState(false);
  const [newCovoit, setNewCovoit] = useState({ depart: "", arrivee: "", date: "", heure: "", places: 1, prix: "", commentaire: "" });
  const [inbox, setInbox] = useState(null);
  const [activeConv, setActiveConv] = useState(null);
  const [convMessages, setConvMessages] = useState(null);
  const [msgInput, setMsgInput] = useState("");

  const [signalerTarget, setSignalerTarget] = useState(null);
  const [raisonSignalement, setRaisonSignalement] = useState(RAISONS_SIGNALEMENT[0]);
  const [commentaireSignalement, setCommentaireSignalement] = useState("");

  const [editProfile, setEditProfile] = useState(null);

  /* ---------- chargement initial ---------- */
  useEffect(() => {
    (async () => {
      const session = await getCurrentSession();
      if (session?.access_token) {
        const p = await getPersonal("mon-profil", null);
        if (p) {
          setProfile(p); setEditProfile(p);
          if (p.accesValide) setView("app");
          else if (p.statutPaiement) setView("attente");
        }
      }
      setBooting(false);
    })();
  }, []);

  useEffect(() => {
    if (view !== "app" || !profile) return;
    (async () => {
      if (threads === null) setThreads(await getShared("forum-threads", SEED_FORUM));
      if (opportunites === null) setOpportunites(await getShared("opportunites", SEED_OPP));
      if (ressources === null) setRessources(await getShared("ressources", SEED_RES));
      if (annuaire === null) setAnnuaire(await getShared("annuaire", SEED_DIR));
      if (notifications === null) setNotifications(await getShared(`notifs-${profile.pseudo}`, []));
      if (evenements === null) setEvenements(await getShared("evenements", SEED_EVENEMENTS));
    })();
  }, [view, profile]);

  useEffect(() => {
    if (view !== "app" || !profile) return;
    if (reseauTab === "messages" && inbox === null) getShared(`inbox-${profile.pseudo}`, []).then(setInbox);
    if (reseauTab === "clubs" && clubs === null) getShared("clubs", SEED_CLUBS).then(setClubs);
    if (reseauTab === "comoturage" && covoiturages === null) getShared("covoiturages", SEED_COVOIT).then(setCovoiturages);
  }, [view, reseauTab, profile]);

  useEffect(() => {
    if (!activeConv || !profile) return;
    const key = `dm-${[profile.pseudo, activeConv].sort().join("--")}`;
    (async () => setConvMessages(await getShared(key, [])))();
  }, [activeConv]);

  useEffect(() => {
    if (view === "app" && profile?.role === "moderateur" && activeTab === "profil" && signalements === null) {
      getShared("signalements", []).then(setSignalements);
    }
  }, [view, profile, activeTab]);

  /* ---------- notifications ---------- */
  async function pushNotif(destPseudo, { type, texte, action }) {
    if (!destPseudo || destPseudo === profile?.pseudo) return;
    const key = `notifs-${destPseudo}`;
    const current = await getShared(key, []);
    await setShared(key, [{ id: uid(), type, texte, date: new Date().toISOString(), lu: false, action }, ...current]);
  }
  async function notifySubscribers(kind, value, payload) {
    if (!value || value === "toutes") return;
    const subs = await getShared(`abonnes-${kind}-${value}`, []);
    for (const pseudo of subs) await pushNotif(pseudo, payload);
  }
  async function ouvrirNotifs() {
    const fresh = await getShared(`notifs-${profile.pseudo}`, []);
    setNotifications(fresh);
    setNotifPanelOpen(true);
  }
  async function handleNotifClick(n) {
    const key = `notifs-${profile.pseudo}`;
    const current = await getShared(key, []);
    const updated = current.map((x) => (x.id === n.id ? { ...x, lu: true } : x));
    await setShared(key, updated);
    setNotifications(updated);
    setNotifPanelOpen(false);
    if (n.action?.tab) {
      setActiveTab(n.action.tab);
      if (n.action.tab === "forum" && n.action.threadId) setSelectedThreadId(n.action.threadId);
      if (n.action.tab === "reseau") { setReseauTab(n.action.subtab || "messages"); if (n.action.pseudo) setActiveConv(n.action.pseudo); }
    }
  }

  /* ---------- abonnements ---------- */
  async function toggleAbonnement(group, value) {
    const current = profile.abonnements?.[group] || [];
    const isFollowing = current.includes(value);
    const updatedList = isFollowing ? current.filter((v) => v !== value) : [value, ...current];
    const updatedProfile = { ...profile, abonnements: { ...profile.abonnements, [group]: updatedList } };
    setProfile(updatedProfile); setEditProfile(updatedProfile);
    await setPersonal("mon-profil", updatedProfile);
    const sharedKey = `abonnes-${group}-${value}`;
    const subs = await getShared(sharedKey, []);
    const updatedSubs = isFollowing ? subs.filter((p) => p !== profile.pseudo) : [profile.pseudo, ...subs.filter((p) => p !== profile.pseudo)];
    await setShared(sharedKey, updatedSubs);
  }

  /* ---------- actions inscription ---------- */
  function startRegistration() { setView("register"); }

  async function submitRegForm() {
    if (!regForm.prenom.trim() || !regForm.pseudo.trim() || !regForm.telephone.trim() || !regForm.email.trim() || !regForm.password.trim()) {
      setRegError("Merci de renseigner ton prénom, un pseudo, ton email, un mot de passe et ton téléphone.");
      return;
    }
    if (regForm.password.length < 6) { setRegError("Le mot de passe doit faire au moins 6 caractères."); return; }
    setRegError("");
    setRegSubmitting(true);
    try {
      const dir = await getShared("annuaire", SEED_DIR);
      if (dir.some((d) => d.pseudo.toLowerCase() === regForm.pseudo.trim().toLowerCase())) {
        setRegError("Ce pseudo est déjà pris, choisis-en un autre.");
        setRegSubmitting(false);
        return;
      }
      await signUp(regForm.email.trim(), regForm.password);
      setView("payment");
    } catch (e) {
      setRegError(e.message || "Échec de la création du compte.");
    } finally {
      setRegSubmitting(false);
    }
  }

  async function submitLogin() {
    if (!loginEmail.trim() || !loginPassword.trim()) { setLoginError("Renseigne ton email et ton mot de passe."); return; }
    setLoginError("");
    setLoginSubmitting(true);
    try {
      await signIn(loginEmail.trim(), loginPassword);
      const p = await getPersonal("mon-profil", null);
      if (p) {
        setProfile(p); setEditProfile(p);
        if (p.accesValide || p.role === "moderateur") { setView("app"); setActiveTab("accueil"); }
        else { setView("attente"); }
      } else {
        // Profil introuvable — proposer de compléter l'inscription
        setView("completer-profil");
      }
    } catch (e) {
      setLoginError(e.message || "Connexion impossible.");
    } finally {
      setLoginSubmitting(false);
    }
  }

  async function finalizeInscription() {
    if (!payRef.trim()) { alert("Merci d'entrer la référence de ta transaction avant de valider."); return; }
    const { password, ...regFormSansMotDePasse } = regForm;
    const fullProfile = {
      ...regFormSansMotDePasse,
      statutPaiement: "en_attente_de_validation",
      referencePaiement: payRef.trim(),
      photoCarteEtudiante: photoCarteUrl.trim(),
      dateInscription: new Date().toISOString(),
      statutAcademique: "etudiant", anneeObtention: "", competences: "", langues: "", lienPortfolio: "",
      estMentor: false, domaineMentorat: "", disponibiliteMentorat: "",
      numeroCarteEtudiante: "", statutVerification: "non_demande", verifie: false,
      role: "etudiant", abonnements: { universites: [], categories: [], typesOpp: [] },
      accesValide: false,
    };
    await setPersonal("mon-profil", fullProfile);
    // Ajouter à la liste des inscriptions en attente pour l'admin
    const enAttente = await getShared("inscriptions-en-attente", []);
    const nouvelleInscription = {
      id: uid(),
      pseudo: fullProfile.pseudo,
      prenom: fullProfile.prenom,
      email: fullProfile.email,
      universite: fullProfile.universite,
      filiere: fullProfile.filiere,
      niveau: fullProfile.niveau,
      telephone: fullProfile.telephone,
      referencePaiement: fullProfile.referencePaiement,
      photoCarteEtudiante: fullProfile.photoCarteEtudiante,
      dateInscription: fullProfile.dateInscription,
      statut: "en_attente",
    };
    await setShared("inscriptions-en-attente", [nouvelleInscription, ...enAttente]);
    setProfile(fullProfile);
    setEditProfile(fullProfile);
    setView("attente");
  }

  /* ---------- validation admin ---------- */
  const [inscriptionsEnAttente, setInscriptionsEnAttente] = useState(null);

  async function chargerInscriptionsEnAttente() {
    const liste = await getShared("inscriptions-en-attente", []);
    setInscriptionsEnAttente(liste);
  }

  async function validerAcces(inscription) {
    // Mettre à jour le statut dans la liste globale
    const liste = await getShared("inscriptions-en-attente", []);
    const updated = liste.map((i) => i.pseudo === inscription.pseudo ? { ...i, statut: "valide" } : i);
    await setShared("inscriptions-en-attente", updated);
    setInscriptionsEnAttente(updated);
    // Notifier l'étudiant
    await pushNotif(inscription.pseudo, { type: "acces", texte: "Ton inscription a été validée ! Tu peux maintenant accéder à Carrefour Étudiant.", action: { tab: "accueil" } });
    // Mettre à jour le profil de l'étudiant (accesValide = true)
    const profileKey = `profil-valide-${inscription.pseudo}`;
    await setShared(profileKey, { accesValide: true, dateValidation: new Date().toISOString() });
  }

  async function rejeterAcces(inscription, raison) {
    const liste = await getShared("inscriptions-en-attente", []);
    const updated = liste.map((i) => i.pseudo === inscription.pseudo ? { ...i, statut: "rejete", raisonRejet: raison } : i);
    await setShared("inscriptions-en-attente", updated);
    setInscriptionsEnAttente(updated);
    await pushNotif(inscription.pseudo, { type: "rejet", texte: `Ton inscription a été rejetée : ${raison}. Contacte-nous pour plus d'informations.`, action: { tab: "accueil" } });
  }

  // Vérifier si l'accès a été validé par l'admin (pour l'écran d'attente)
  async function verifierAcces() {
    if (!profile) return;
    const profileKey = `profil-valide-${profile.pseudo}`;
    const validation = await getShared(profileKey, null);
    if (validation?.accesValide) {
      const updatedProfile = { ...profile, accesValide: true };
      await setPersonal("mon-profil", updatedProfile);
      setProfile(updatedProfile); setEditProfile(updatedProfile);
      // Ajouter à l'annuaire
      const dir = await getShared("annuaire", SEED_DIR);
      const entry = {
        pseudo: updatedProfile.pseudo, universite: updatedProfile.universite, filiere: updatedProfile.filiere,
        niveau: updatedProfile.niveau, bio: updatedProfile.bio, statutAcademique: updatedProfile.statutAcademique,
        anneeObtention: updatedProfile.anneeObtention, competences: updatedProfile.competences,
        estMentor: updatedProfile.estMentor, domaineMentorat: updatedProfile.domaineMentorat,
        disponibiliteMentorat: updatedProfile.disponibiliteMentorat, statutVerification: updatedProfile.statutVerification, verifie: updatedProfile.verifie,
      };
      await setShared("annuaire", [entry, ...dir.filter((d) => d.pseudo !== updatedProfile.pseudo)]);
      setView("app"); setActiveTab("accueil");
    }
  }
    try { navigator.clipboard.writeText(text); setCopied(field); setTimeout(() => setCopied(""), 1500); } catch {}
  }

  /* ---------- actions forum ---------- */

  function copyToClipboard(text, field) {
  function ajouterOptionSondage() { if (newThread.options.length < 5) setNewThread({ ...newThread, options: [...newThread.options, ""] }); }
  function retirerOptionSondage(i) { if (newThread.options.length > 2) setNewThread({ ...newThread, options: newThread.options.filter((_, idx) => idx !== i) }); }

  async function publishThread() {
    if (!newThread.titre.trim() || !newThread.contenu.trim()) return;
    let options = null;
    if (newThread.type === "sondage") {
      const valides = newThread.options.map((o) => o.trim()).filter(Boolean);
      if (valides.length < 2) return;
      options = valides.map((texte) => ({ texte, votants: [] }));
    }
    const t = {
      id: uid(), numero: (threads?.length || 0) + 1, universite: newThread.universite, categorie: newThread.categorie,
      titre: newThread.titre, contenu: newThread.contenu, type: newThread.type, options,
      auteur: profile.pseudo, date: new Date().toISOString(), reponses: [],
    };
    const updated = [t, ...threads];
    setThreads(updated); await setShared("forum-threads", updated);
    notifySubscribers("universites", t.universite, { type: "forum", texte: `Nouveau sujet sur ${uniBy(t.universite).sigle} : "${t.titre}"`, action: { tab: "forum" } });
    notifySubscribers("categories", t.categorie, { type: "forum", texte: `Nouveau sujet en "${t.categorie}" : "${t.titre}"`, action: { tab: "forum" } });
    setNewThread({ universite: profile.universite, categorie: CATEGORIES_FORUM[0], titre: "", contenu: "", type: "discussion", options: ["", ""] });
    setNewThreadOpen(false);
  }
  async function postReply(thread) {
    if (!replyText.trim()) return;
    const updated = threads.map((t) => t.id === thread.id ? { ...t, reponses: [...t.reponses, { id: uid(), auteur: profile.pseudo, contenu: replyText, date: new Date().toISOString() }] } : t);
    setThreads(updated); await setShared("forum-threads", updated); setReplyText("");
    if (thread.auteur !== profile.pseudo) pushNotif(thread.auteur, { type: "reponse", texte: `${profile.pseudo} a répondu à ton sujet "${thread.titre}"`, action: { tab: "forum", threadId: thread.id } });
  }
  async function voteSondage(threadId, optionIndex) {
    const updated = threads.map((t) => {
      if (t.id !== threadId) return t;
      const newOptions = t.options.map((o, i) => {
        const sansMoi = o.votants.filter((p) => p !== profile.pseudo);
        return i === optionIndex ? { ...o, votants: [...sansMoi, profile.pseudo] } : { ...o, votants: sansMoi };
      });
      return { ...t, options: newOptions };
    });
    setThreads(updated); await setShared("forum-threads", updated);
  }

  async function publishEvenement() {
    if (!newEv.titre.trim() || !newEv.date) return;
    const e = { id: uid(), ...newEv, auteur: profile.pseudo, datePub: new Date().toISOString() };
    const updated = [e, ...(evenements || [])];
    setEvenements(updated); await setShared("evenements", updated);
    notifySubscribers("universites", e.universite, { type: "evenement", texte: `Nouvel événement sur ${uniBy(e.universite).sigle} : "${e.titre}"`, action: { tab: "campus" } });
    setNewEv({ type: "soiree", titre: "", universite: profile.universite, lieu: "", date: "", heure: "", description: "", affiche: "" });
    setNewEvOpen(false);
  }

  /* ---------- actions opportunités ---------- */
  async function publishOpp() {
    if (!newOpp.titre.trim() || !newOpp.description.trim()) return;
    const o = { id: uid(), ...newOpp, auteur: profile.pseudo, datePub: new Date().toISOString() };
    const updated = [o, ...opportunites];
    setOpportunites(updated); await setShared("opportunites", updated);
    notifySubscribers("typesOpp", o.type, { type: "opportunite", texte: `Nouvelle opportunité : "${o.titre}"`, action: { tab: "opportunites" } });
    setNewOpp({ type: "stage", titre: "", universite: profile.universite, lieu: "", date: "", description: "", estPartenaire: false, nomEntreprise: "" });
    setNewOppOpen(false);
  }
  async function candidaterOpportunite(opp, motivation) {
    if (!motivation.trim()) return;
    const myInboxKey = `inbox-${profile.pseudo}`, theirInboxKey = `inbox-${opp.auteur}`;
    const myInbox = await getShared(myInboxKey, []);
    if (!myInbox.includes(opp.auteur)) { const u = [opp.auteur, ...myInbox]; await setShared(myInboxKey, u); setInbox(u); }
    const theirInbox = await getShared(theirInboxKey, []);
    if (!theirInbox.includes(profile.pseudo)) await setShared(theirInboxKey, [profile.pseudo, ...theirInbox]);
    const dmKey = `dm-${[profile.pseudo, opp.auteur].sort().join("--")}`;
    const current = await getShared(dmKey, []);
    const texte = `Candidature — ${opp.titre}\n\n${motivation}`;
    await setShared(dmKey, [...current, { auteur: profile.pseudo, contenu: texte, date: new Date().toISOString() }]);
    pushNotif(opp.auteur, { type: "candidature", texte: `${profile.pseudo} a postulé à "${opp.titre}"`, action: { tab: "reseau", subtab: "messages", pseudo: profile.pseudo } });
  }
  function ouvrirCandidature(opp) { setCandidatureOpp(opp); setCandidatureMotivation(""); }
  async function envoyerCandidature() {
    if (!candidatureOpp) return;
    await candidaterOpportunite(candidatureOpp, candidatureMotivation);
    setCandidatureOpp(null);
  }

  /* ---------- actions ressources ---------- */
  async function publishRes() {
    if (!newRes.titre.trim()) return;
    const r = { id: uid(), ...newRes, auteur: profile.pseudo, date: new Date().toISOString() };
    const updated = [r, ...ressources];
    setRessources(updated); await setShared("ressources", updated);
    setNewRes({ type: TYPES_RES[0], titre: "", matiere: "", universite: profile.universite, lien: "", description: "" });
    setNewResOpen(false);
  }

  /* ---------- clubs & covoiturage ---------- */
  async function publishClub() {
    if (!newClub.nom.trim()) return;
    const c = { id: uid(), ...newClub, auteur: profile.pseudo, date: new Date().toISOString() };
    const updated = [c, ...(clubs || [])];
    setClubs(updated); await setShared("clubs", updated);
    setNewClub({ nom: "", universite: profile.universite, categorie: CATEGORIES_CLUB[0], description: "", contact: "" });
    setNewClubOpen(false);
  }
  async function publishCovoit() {
    if (!newCovoit.depart.trim() || !newCovoit.arrivee.trim()) return;
    const v = { id: uid(), ...newCovoit, auteur: profile.pseudo, date_pub: new Date().toISOString() };
    const updated = [v, ...(covoiturages || [])];
    setCovoiturages(updated); await setShared("covoiturages", updated);
    setNewCovoit({ depart: "", arrivee: "", date: "", heure: "", places: 1, prix: "", commentaire: "" });
    setNewCovoitOpen(false);
  }

  /* ---------- réseau / messagerie ---------- */
  async function openConversation(pseudo, prefill) {
    if (pseudo === profile.pseudo) return;
    const myInboxKey = `inbox-${profile.pseudo}`, theirInboxKey = `inbox-${pseudo}`;
    const myInbox = await getShared(myInboxKey, []);
    if (!myInbox.includes(pseudo)) { const u = [pseudo, ...myInbox]; await setShared(myInboxKey, u); setInbox(u); }
    const theirInbox = await getShared(theirInboxKey, []);
    if (!theirInbox.includes(profile.pseudo)) await setShared(theirInboxKey, [profile.pseudo, ...theirInbox]);
    setActiveConv(pseudo);
    setActiveTab("reseau");
    setReseauTab("messages");
    if (prefill) setMsgInput(prefill);
  }
  async function sendMessage() {
    if (!msgInput.trim() || !activeConv) return;
    const key = `dm-${[profile.pseudo, activeConv].sort().join("--")}`;
    const current = await getShared(key, []);
    const updated = [...current, { auteur: profile.pseudo, contenu: msgInput, date: new Date().toISOString() }];
    await setShared(key, updated);
    setConvMessages(updated);
    setMsgInput("");
    pushNotif(activeConv, { type: "message", texte: `Nouveau message de ${profile.pseudo}`, action: { tab: "reseau", subtab: "messages", pseudo: profile.pseudo } });
  }

  /* ---------- signalements / modération ---------- */
  function ouvrirSignalement(typeContenu, contenuId, titre) {
    setSignalerTarget({ typeContenu, contenuId, titre });
    setRaisonSignalement(RAISONS_SIGNALEMENT[0]);
    setCommentaireSignalement("");
  }
  async function envoyerSignalement() {
    if (!signalerTarget) return;
    const current = await getShared("signalements", []);
    const sig = { id: uid(), ...signalerTarget, raison: raisonSignalement, commentaire: commentaireSignalement, signalePar: profile.pseudo, date: new Date().toISOString(), statut: "ouvert" };
    await setShared("signalements", [sig, ...current]);
    setSignalerTarget(null);
  }
  async function traiterSignalement(sig, action) {
    if (action === "supprimer") {
      if (sig.typeContenu === "forum") { const u = (threads || []).filter((t) => t.id !== sig.contenuId); setThreads(u); await setShared("forum-threads", u); }
      if (sig.typeContenu === "opportunite") { const u = (opportunites || []).filter((o) => o.id !== sig.contenuId); setOpportunites(u); await setShared("opportunites", u); }
      if (sig.typeContenu === "ressource") { const u = (ressources || []).filter((r) => r.id !== sig.contenuId); setRessources(u); await setShared("ressources", u); }
    }
    const current = await getShared("signalements", []);
    const updated = current.map((s) => (s.id === sig.id ? { ...s, statut: action === "supprimer" ? "supprime" : "traite" } : s));
    await setShared("signalements", updated);
    setSignalements(updated);
  }
  async function validerVerification(pseudo) {
    const dir = await getShared("annuaire", SEED_DIR);
    const updated = dir.map((d) => (d.pseudo === pseudo ? { ...d, statutVerification: "verifie", verifie: true } : d));
    await setShared("annuaire", updated);
    setAnnuaire(updated);
  }

  /* ---------- profil ---------- */
  async function saveProfile() {
    await setPersonal("mon-profil", editProfile);
    setProfile(editProfile);
    const dir = await getShared("annuaire", SEED_DIR);
    let updated;
    if (editProfile.inscritAnnuaire) {
      const entry = {
        pseudo: editProfile.pseudo, universite: editProfile.universite, filiere: editProfile.filiere, niveau: editProfile.niveau, bio: editProfile.bio,
        statutAcademique: editProfile.statutAcademique, anneeObtention: editProfile.anneeObtention, competences: editProfile.competences,
        estMentor: editProfile.estMentor, domaineMentorat: editProfile.domaineMentorat, disponibiliteMentorat: editProfile.disponibiliteMentorat,
        statutVerification: editProfile.statutVerification, verifie: editProfile.verifie,
      };
      updated = [entry, ...dir.filter((d) => d.pseudo !== editProfile.pseudo)];
    } else {
      updated = dir.filter((d) => d.pseudo !== editProfile.pseudo);
    }
    await setShared("annuaire", updated);
    setAnnuaire(updated);
  }
  async function soumettreVerification() {
    if (!editProfile.numeroCarteEtudiante?.trim()) return;
    const updated = { ...editProfile, statutVerification: "en_attente" };
    setEditProfile(updated); setProfile(updated);
    await setPersonal("mon-profil", updated);
    const dir = await getShared("annuaire", SEED_DIR);
    const updatedDir = dir.map((d) => (d.pseudo === updated.pseudo ? { ...d, statutVerification: "en_attente" } : d));
    await setShared("annuaire", updatedDir);
    setAnnuaire(updatedDir);
  }
  async function logout() {
    await signOut();
    setProfile(null); setEditProfile(null); setView("landing"); setActiveTab("accueil");
  }
  function computeBadges(pseudo) {
    const nbSujets = (threads || []).filter((t) => t.auteur === pseudo).length;
    const nbReponses = (threads || []).reduce((acc, t) => acc + t.reponses.filter((r) => r.auteur === pseudo).length, 0);
    const nbRessources = (ressources || []).filter((r) => r.auteur === pseudo).length;
    const badges = [];
    if (nbSujets + nbReponses + nbRessources >= 3) badges.push({ label: "Contributeur actif", tone: "amber" });
    if (nbRessources >= 2) badges.push({ label: "Partage généreux", tone: "emerald" });
    return badges;
  }

  /* ===============================================================
     ÉCRANS
  =============================================================== */
  if (booting) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><Loader2 className="animate-spin text-amber-500" size={28} /></div>;
  }

  /* ---------- LANDING ---------- */
  if (view === "landing") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <div className="px-6 pt-14 pb-8 flex flex-col items-center text-center">
          <SealBadge sigle="BF" size="lg" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-amber-500 font-semibold">Réseau étudiant national</p>
          <h1 className="font-serif text-3xl text-stone-50 mt-2 leading-tight">Carrefour Étudiant</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xs">
            La plateforme qui relie les étudiants de toutes les universités publiques et privées du Burkina Faso : échanges, opportunités, mentorat et entraide.
          </p>
        </div>

        <div className="px-5 space-y-3 mb-6">
          {[
            { icon: MessageSquare, t: "Forum, sondages, par université et par sujet", d: "Pose tes questions, partage ton vécu de campus." },
            { icon: Briefcase, t: "Stages, bourses, concours, emplois", d: "Postule directement et ne rate plus une opportunité." },
            { icon: Users, t: "Annuaire, mentorat & alumni", d: "Élargis ton réseau et trouve un mentor dans ta filière." },
            { icon: Car, t: "Comoturage entre villes universitaires", d: "Partage ou trouve un trajet entre campus." },
            { icon: BookOpen, t: "Ressources partagées", d: "Fiches de cours, annales et supports entre étudiants." },
          ].map((f, i) => (
            <div key={i} className="flex gap-3 bg-slate-800 rounded-2xl p-4">
              <div className="shrink-0 w-9 h-9 rounded-full bg-slate-900 border border-amber-600 flex items-center justify-center"><f.icon size={16} className="text-amber-500" /></div>
              <div><p className="text-sm font-semibold text-stone-50">{f.t}</p><p className="text-xs text-slate-400 mt-0.5">{f.d}</p></div>
            </div>
          ))}
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Universités représentées ({UNIVERSITES.length - 1})</p>
          <div className="flex flex-wrap gap-2">
            {UNIVERSITES.filter((u) => u.id !== "autre").map((u) => <span key={u.id} className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full">{u.sigle}</span>)}
          </div>
        </div>

        <div className="mt-auto px-5 pb-8 pt-4">
          <p className="text-xs text-slate-500 mb-3 text-center">Inscription unique payante, accès illimité ensuite — gratuit à vie après l'adhésion.</p>
          <PrimaryButton full onClick={startRegistration} icon={ArrowRight}>Créer mon compte étudiant</PrimaryButton>
          <button onClick={() => { setLoginError(""); setView("login"); }} className="w-full text-center text-xs text-slate-400 mt-4">J'ai déjà un compte — <span className="text-amber-500 font-semibold">Se connecter</span></button>
        </div>
      </div>
    );
  }

  /* ---------- CONNEXION ---------- */
  if (view === "login") {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="bg-slate-900 px-5 py-5 flex items-center gap-3">
          <button onClick={() => setView("landing")} className="text-slate-300"><ChevronLeft size={20} /></button>
          <h1 className="font-serif text-lg text-stone-50">Connexion</h1>
        </div>
        <div className="p-5 max-w-md mx-auto">
          <Field label="Email"><input type="email" className={inputCls} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="toi@exemple.com" /></Field>
          <Field label="Mot de passe"><input type="password" className={inputCls} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /></Field>
          {loginError && <p className="text-sm text-rose-700 mb-4">{loginError}</p>}
          <PrimaryButton full onClick={submitLogin} disabled={loginSubmitting} icon={ArrowRight}>{loginSubmitting ? "Connexion..." : "Se connecter"}</PrimaryButton>
        </div>
      </div>
    );
  }

  /* ---------- INSCRIPTION ---------- */
  if (view === "register") {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="bg-slate-900 px-5 py-5 flex items-center gap-3">
          <button onClick={() => setView("landing")} className="text-slate-300"><ChevronLeft size={20} /></button>
          <div><p className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold">Étape 1 / 2</p><h1 className="font-serif text-lg text-stone-50">Création du compte</h1></div>
        </div>
        <div className="p-5 max-w-md mx-auto">
          <Field label="Prénom"><input className={inputCls} value={regForm.prenom} onChange={(e) => setRegForm({ ...regForm, prenom: e.target.value })} placeholder="Ton prénom" /></Field>
          <Field label="Pseudo (visible des autres étudiants)"><input className={inputCls} value={regForm.pseudo} onChange={(e) => setRegForm({ ...regForm, pseudo: e.target.value })} placeholder="Ex. Aicha_K" /></Field>
          <Field label="Email (sert à te connecter)"><input type="email" className={inputCls} value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} placeholder="toi@exemple.com" /></Field>
          <Field label="Mot de passe (6 caractères minimum)"><input type="password" className={inputCls} value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} /></Field>
          <Field label="Université (publique ou privée)"><UniversiteSelect value={regForm.universite} onChange={(v) => setRegForm({ ...regForm, universite: v })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Filière"><select className={inputCls} value={regForm.filiere} onChange={(e) => setRegForm({ ...regForm, filiere: e.target.value })}>{FILIERES.map((f) => <option key={f}>{f}</option>)}</select></Field>
            <Field label="Niveau"><select className={inputCls} value={regForm.niveau} onChange={(e) => setRegForm({ ...regForm, niveau: e.target.value })}>{NIVEAUX.map((n) => <option key={n}>{n}</option>)}</select></Field>
          </div>
          <Field label="Téléphone"><input className={inputCls} value={regForm.telephone} onChange={(e) => setRegForm({ ...regForm, telephone: e.target.value })} placeholder="+226 ..." /></Field>
          <Field label="Courte bio (optionnel)"><textarea className={inputCls} rows={3} value={regForm.bio} onChange={(e) => setRegForm({ ...regForm, bio: e.target.value })} placeholder="Centres d'intérêt, ce que tu cherches sur la plateforme..." /></Field>
          <label className="flex items-start gap-2 mb-6 cursor-pointer">
            <input type="checkbox" className="mt-1" checked={regForm.inscritAnnuaire} onChange={(e) => setRegForm({ ...regForm, inscritAnnuaire: e.target.checked })} />
            <span className="text-sm text-slate-600">Apparaître dans l'annuaire étudiant <span className="text-slate-400">(recommandé pour élargir ton réseau)</span></span>
          </label>
          {regError && <p className="text-sm text-rose-700 mb-4">{regError}</p>}
          <PrimaryButton full onClick={submitRegForm} disabled={regSubmitting} icon={ArrowRight}>{regSubmitting ? "Création du compte..." : "Continuer vers le paiement"}</PrimaryButton>
        </div>
      </div>
    );
  }

  /* ---------- PAIEMENT ---------- */
  if (view === "payment") {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="bg-slate-900 px-5 py-5 flex items-center gap-3">
          <button onClick={() => setView("register")} className="text-slate-300"><ChevronLeft size={20} /></button>
          <div><p className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold">Étape 2 / 2</p><h1 className="font-serif text-lg text-stone-50">Frais d'inscription</h1></div>
        </div>
        <div className="p-5 max-w-md mx-auto">
          <RuledCard>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Montant unique</p>
            <p className="font-serif text-3xl text-slate-900">{MONTANT_INSCRIPTION}</p>
            <p className="text-xs text-slate-500 mt-1">Payable une seule fois. L'accès à la plateforme est ensuite gratuit, à vie.</p>
          </RuledCard>
          <div className="mt-5 space-y-3">
            {[{ label: "Orange Money", num: NUM_ORANGE }, { label: "Moov Money", num: NUM_MOOV }].map((m) => (
              <div key={m.label} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-4 py-3">
                <div><p className="text-xs text-slate-500">{m.label}</p><p className="text-sm font-semibold text-slate-800">{m.num}</p></div>
                <button onClick={() => copyToClipboard(m.num, m.label)} className="text-amber-700 text-xs font-semibold flex items-center gap-1">
                  {copied === m.label ? <><Check size={14} /> Copié</> : <><Copy size={14} /> Copier</>}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Effectue le transfert vers l'un de ces numéros, puis indique la référence de la transaction reçue par SMS ci-dessous.</p>
          <Field label="Photo de ta carte étudiante (obligatoire)">
            <p className="text-xs text-slate-500 mb-2">Prends une photo de ta carte étudiante valide et uploade-la sur Google Drive, WhatsApp Web ou Imgbb.com, puis colle le lien ici.</p>
            <input className={inputCls} value={photoCarteUrl} onChange={(e) => setPhotoCarteUrl(e.target.value)} placeholder="https://... (lien vers la photo de ta carte)" />
          </Field>
          <Field label="Référence de la transaction Orange/Moov Money (obligatoire)">
            <input className={inputCls} value={payRef} onChange={(e) => setPayRef(e.target.value)} placeholder="Ex. MP240621.1530.A12345" />
          </Field>
          <PrimaryButton full onClick={finalizeInscription} icon={Check} disabled={!payRef.trim() || !photoCarteUrl.trim()}>Soumettre mon dossier d'inscription</PrimaryButton>
          <p className="text-[11px] text-slate-400 mt-3 text-center">Ton accès sera activé après vérification de ton paiement et de ta carte étudiante par l'équipe.</p>
        </div>
      </div>
    );
  }

  /* ---------- ÉCRAN COMPLÉTER PROFIL ---------- */
  if (view === "completer-profil") {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="bg-slate-900 px-5 py-5">
          <p className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold">Finaliser l'inscription</p>
          <h1 className="font-serif text-lg text-stone-50">Complète ton profil</h1>
        </div>
        <div className="p-5 max-w-md mx-auto">
          <p className="text-sm text-slate-600 mb-4">Ton compte existe mais ton profil est incomplet. Remplis les informations ci-dessous pour continuer.</p>
          <Field label="Prénom"><input className={inputCls} value={regForm.prenom} onChange={(e) => setRegForm({ ...regForm, prenom: e.target.value })} /></Field>
          <Field label="Pseudo"><input className={inputCls} value={regForm.pseudo} onChange={(e) => setRegForm({ ...regForm, pseudo: e.target.value })} /></Field>
          <Field label="Université"><UniversiteSelect value={regForm.universite} onChange={(v) => setRegForm({ ...regForm, universite: v })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Filière"><select className={inputCls} value={regForm.filiere} onChange={(e) => setRegForm({ ...regForm, filiere: e.target.value })}>{FILIERES.map((f) => <option key={f}>{f}</option>)}</select></Field>
            <Field label="Niveau"><select className={inputCls} value={regForm.niveau} onChange={(e) => setRegForm({ ...regForm, niveau: e.target.value })}>{NIVEAUX.map((n) => <option key={n}>{n}</option>)}</select></Field>
          </div>
          <Field label="Téléphone"><input className={inputCls} value={regForm.telephone} onChange={(e) => setRegForm({ ...regForm, telephone: e.target.value })} /></Field>
          <PrimaryButton full icon={ArrowRight} onClick={async () => {
            if (!regForm.prenom.trim() || !regForm.pseudo.trim()) return;
            const fullProfile = {
              ...regForm,
              email: loginEmail,
              statutPaiement: "en_attente_de_validation",
              referencePaiement: "A_COMPLETER",
              photoCarteEtudiante: "",
              dateInscription: new Date().toISOString(),
              statutAcademique: "etudiant", anneeObtention: "", competences: "", langues: "", lienPortfolio: "",
              estMentor: false, domaineMentorat: "", disponibiliteMentorat: "",
              numeroCarteEtudiante: "", statutVerification: "non_demande", verifie: false,
              role: "moderateur", accesValide: true,
              abonnements: { universites: [], categories: [], typesOpp: [] },
            };
            await setPersonal("mon-profil", fullProfile);
            setProfile(fullProfile); setEditProfile(fullProfile);
            setView("app"); setActiveTab("accueil");
          }}>Accéder à la plateforme</PrimaryButton>
          <p className="text-[11px] text-slate-400 mt-3 text-center">Ce compte sera automatiquement configuré en mode administrateur.</p>
        </div>
      </div>
    );
  }
  if (view === "attente") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center">
        <SealBadge sigle="BF" size="lg" />
        <h1 className="font-serif text-2xl text-stone-50 mt-6">Dossier soumis !</h1>
        <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
          Ton paiement et ta carte étudiante sont en cours de vérification par l'équipe Carrefour Étudiant. Tu recevras une confirmation sous 24h.
        </p>
        <div className="mt-6 bg-slate-800 rounded-2xl p-4 w-full max-w-xs text-left space-y-2">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Récapitulatif</p>
          <p className="text-sm text-stone-100"><span className="text-slate-400">Pseudo :</span> {profile?.pseudo}</p>
          <p className="text-sm text-stone-100"><span className="text-slate-400">Université :</span> {uniBy(profile?.universite).sigle}</p>
          <p className="text-sm text-stone-100"><span className="text-slate-400">Référence paiement :</span> {profile?.referencePaiement}</p>
          <div className="flex items-center gap-2 mt-1">
            <Tag tone={profile?.photoCarteEtudiante ? "emerald" : "rose"}>
              {profile?.photoCarteEtudiante ? "Carte étudiante soumise ✓" : "Carte manquante"}
            </Tag>
          </div>
        </div>
        <div className="mt-6 space-y-3 w-full max-w-xs">
          <PrimaryButton full onClick={verifierAcces} icon={Check}>Vérifier si mon accès est activé</PrimaryButton>
          <button onClick={async () => { await signOut(); setProfile(null); setView("landing"); }} className="w-full text-slate-400 text-sm py-2">Se déconnecter</button>
        </div>
        <p className="text-xs text-slate-600 mt-6">En cas de problème, contacte-nous directement par téléphone.</p>
      </div>
    );
  }
  const tabs = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "forum", label: "Forum", icon: MessageSquare },
    { id: "opportunites", label: "Opportunités", icon: Briefcase },
    { id: "campus", label: "Campus", icon: Calendar },
    { id: "reseau", label: "Réseau", icon: Users },
    { id: "ressources", label: "Ressources", icon: BookOpen },
  ];
  const reseauSubtabs = [
    { id: "annuaire", label: "Annuaire" }, { id: "mentorat", label: "Mentorat" },
    { id: "clubs", label: "Clubs" }, { id: "comoturage", label: "Comoturage" }, { id: "messages", label: "Messages" },
  ];

  const filteredThreads = (threads || []).filter((t) => (filterUniForum === "toutes" || t.universite === filterUniForum) && (filterCatForum === "toutes" || t.categorie === filterCatForum));
  const filteredOpp = (opportunites || []).filter((o) => filterTypeOpp === "toutes" || o.type === filterTypeOpp);
  const filteredRes = (ressources || []).filter((r) => filterUniRes === "toutes" || r.universite === filterUniRes);
  const filteredDir = (annuaire || []).filter((d) => d.pseudo !== profile.pseudo)
    .filter((d) => filterUniDir === "toutes" || d.universite === filterUniDir)
    .filter((d) => filterStatutDir === "tous" || d.statutAcademique === filterStatutDir)
    .filter((d) => !searchDir.trim() || (d.pseudo + d.filiere + d.bio).toLowerCase().includes(searchDir.toLowerCase()));
  const mentors = (annuaire || []).filter((d) => d.pseudo !== profile.pseudo && d.estMentor);
  const filteredClubs = (clubs || []).filter((c) => filterUniClub === "toutes" || c.universite === filterUniClub);
  const selectedThread = (threads || []).find((t) => t.id === selectedThreadId);
  const unreadCount = (notifications || []).filter((n) => !n.lu).length;

  const fabAction = () => {
    if (activeTab === "forum" && !selectedThread) { setNewThread({ ...newThread, universite: profile.universite }); setNewThreadOpen(true); }
    else if (activeTab === "opportunites") { setNewOpp({ ...newOpp, universite: profile.universite }); setNewOppOpen(true); }
    else if (activeTab === "campus") { setNewEv({ ...newEv, universite: profile.universite }); setNewEvOpen(true); }
    else if (activeTab === "ressources") { setNewRes({ ...newRes, universite: profile.universite }); setNewResOpen(true); }
    else if (activeTab === "reseau" && reseauTab === "clubs") { setNewClub({ ...newClub, universite: profile.universite }); setNewClubOpen(true); }
    else if (activeTab === "reseau" && reseauTab === "comoturage") setNewCovoitOpen(true);
  };
  const showFab = (activeTab === "forum" && !selectedThread) || activeTab === "opportunites" || activeTab === "campus" || activeTab === "ressources" ||
    (activeTab === "reseau" && (reseauTab === "clubs" || reseauTab === "comoturage"));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* HEADER */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <SealBadge sigle="BF" />
          <div><p className="font-serif text-sm text-stone-50 leading-none">Carrefour Étudiant</p><p className="text-[10px] text-slate-500 mt-0.5">Burkina Faso · prototype</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={ouvrirNotifs} className="relative w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <Bell size={16} />
            {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-700 text-white text-[9px] flex items-center justify-center">{unreadCount}</span>}
          </button>
          <button onClick={() => setActiveTab("profil")} className="flex items-center gap-2 bg-slate-800 rounded-full pl-1 pr-3 py-1">
            <SealBadge sigle={uniBy(profile.universite).sigle.slice(0, 4)} />
            <span className="text-xs text-stone-100 font-medium flex items-center gap-1">{profile.pseudo} <VerifBadge statut={profile.statutVerification} /></span>
          </button>
        </div>
      </div>

      {/* CONTENU */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24">
        {/* ---------- ACCUEIL ---------- */}
        {activeTab === "accueil" && (
          <div className="space-y-7">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold">Bienvenue</p>
              <h1 className="font-serif text-2xl text-stone-50 mt-0.5">Bonjour, {profile.prenom}</h1>
              <p className="text-slate-400 text-sm mt-1">{uniBy(profile.universite).nom} · {profile.filiere}</p>
            </div>
            <div>
              <SectionHeader eyebrow="Discussions" title="Derniers sujets du forum" action="Voir le forum" onAction={() => setActiveTab("forum")} />
              <div className="space-y-3">
                {(threads || []).slice(0, 2).map((t) => (
                  <RuledCard key={t.id} onClick={() => { setActiveTab("forum"); setSelectedThreadId(t.id); }}>
                    <div className="flex items-start gap-3">
                      <SealBadge sigle={uniBy(t.universite).sigle.slice(0, 4)} />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Art. {String(t.numero).padStart(3, "0")} · {t.categorie}{t.type === "sondage" ? " · Sondage" : ""}</p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{t.titre}</p>
                        <p className="text-xs text-slate-500 mt-1">{t.auteur} · {fmtDate(t.date)}</p>
                      </div>
                    </div>
                  </RuledCard>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader eyebrow="À ne pas manquer" title="Nouvelles opportunités" action="Tout voir" onAction={() => setActiveTab("opportunites")} />
              <div className="space-y-3">
                {(opportunites || []).slice(0, 2).map((o) => (
                  <RuledCard key={o.id}>
                    <Tag tone="amber">{TYPES_OPP.find((x) => x.id === o.type)?.label}</Tag>
                    <p className="text-sm font-semibold text-slate-900 mt-2">{o.titre}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {o.lieu}</p>
                  </RuledCard>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader eyebrow="Réseau" title="Étudiants à découvrir" action="Voir l'annuaire" onAction={() => { setActiveTab("reseau"); setReseauTab("annuaire"); }} />
              <div className="space-y-3">
                {(annuaire || []).filter((d) => d.pseudo !== profile.pseudo).slice(0, 2).map((d) => (
                  <RuledCard key={d.pseudo}>
                    <div className="flex items-center gap-3">
                      <SealBadge sigle={uniBy(d.universite).sigle.slice(0, 4)} />
                      <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900 flex items-center gap-1">{d.pseudo} <VerifBadge statut={d.statutVerification} /></p><p className="text-xs text-slate-500 truncate">{d.filiere} · {d.niveau}</p></div>
                      <button onClick={() => openConversation(d.pseudo)} className="text-amber-700"><MessageSquare size={18} /></button>
                    </div>
                  </RuledCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- FORUM ---------- */}
        {activeTab === "forum" && !selectedThread && (
          <div>
            <SectionHeader eyebrow="Échanges" title="Forum étudiant" />
            <div className="flex gap-2 overflow-x-auto pb-1 mb-2 -mx-1 px-1">
              {["toutes", ...UNIVERSITES.map((u) => u.id)].map((id) => (
                <button key={id} onClick={() => setFilterUniForum(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterUniForum === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>
                  {id === "toutes" ? "Toutes" : uniBy(id).sigle}
                </button>
              ))}
            </div>
            <select className="w-full mb-2 bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-700" value={filterCatForum} onChange={(e) => setFilterCatForum(e.target.value)}>
              <option value="toutes">Toutes les catégories</option>
              {CATEGORIES_FORUM.map((c) => <option key={c}>{c}</option>)}
            </select>
            {(filterUniForum !== "toutes" || filterCatForum !== "toutes") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filterUniForum !== "toutes" && <SubscribeToggle active={(profile.abonnements?.universites || []).includes(filterUniForum)} onClick={() => toggleAbonnement("universites", filterUniForum)} label={`Suivre ${uniBy(filterUniForum).sigle}`} />}
                {filterCatForum !== "toutes" && <SubscribeToggle active={(profile.abonnements?.categories || []).includes(filterCatForum)} onClick={() => toggleAbonnement("categories", filterCatForum)} label={`Suivre "${filterCatForum}"`} />}
              </div>
            )}
            {threads === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : filteredThreads.length === 0 ? <EmptyState text="Aucun sujet ici pour l'instant. Sois le premier à lancer la discussion." /> : (
              <div className="space-y-3">
                {filteredThreads.map((t) => (
                  <RuledCard key={t.id} onClick={() => setSelectedThreadId(t.id)}>
                    <div className="flex items-start gap-3">
                      <SealBadge sigle={uniBy(t.universite).sigle.slice(0, 4)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Art. {String(t.numero).padStart(3, "0")} · {t.categorie}{t.type === "sondage" ? " · Sondage" : ""}</p>
                          <ReportButton onClick={() => ouvrirSignalement("forum", t.id, t.titre)} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5">{t.titre}</p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{t.contenu}</p>
                        <p className="text-xs text-slate-500 mt-2">{t.auteur} · {fmtDate(t.date)} · {t.reponses.length} réponse{t.reponses.length > 1 ? "s" : ""}</p>
                      </div>
                    </div>
                  </RuledCard>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "forum" && selectedThread && (
          <div>
            <button onClick={() => setSelectedThreadId(null)} className="text-slate-300 flex items-center gap-1 text-sm mb-4"><ChevronLeft size={16} /> Retour au forum</button>
            <RuledCard>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Art. {String(selectedThread.numero).padStart(3, "0")} · {uniBy(selectedThread.universite).sigle} · {selectedThread.categorie}</p>
                <ReportButton onClick={() => ouvrirSignalement("forum", selectedThread.id, selectedThread.titre)} />
              </div>
              <p className="font-serif text-lg text-slate-900 mt-1">{selectedThread.titre}</p>
              <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{selectedThread.contenu}</p>
              <p className="text-xs text-slate-500 mt-3">{selectedThread.auteur} · {fmtDate(selectedThread.date)}</p>

              {selectedThread.type === "sondage" && selectedThread.options && (
                <div className="mt-4 space-y-2">
                  {(() => {
                    const total = selectedThread.options.reduce((acc, o) => acc + o.votants.length, 0) || 1;
                    const moi = selectedThread.options.findIndex((o) => o.votants.includes(profile.pseudo));
                    return selectedThread.options.map((o, i) => {
                      const pct = Math.round((o.votants.length / total) * 100);
                      return (
                        <button key={i} onClick={() => voteSondage(selectedThread.id, i)} className="w-full text-left">
                          <div className="flex justify-between text-xs mb-1"><span className={`font-medium ${moi === i ? "text-amber-700" : "text-slate-700"}`}>{o.texte}{moi === i ? " ✓" : ""}</span><span className="text-slate-400">{pct}%</span></div>
                          <div className="h-2 bg-stone-200 rounded-full overflow-hidden"><div className="h-full bg-amber-600" style={{ width: `${pct}%` }} /></div>
                        </button>
                      );
                    });
                  })()}
                  <p className="text-[10px] text-slate-400 mt-1">{selectedThread.options.reduce((acc, o) => acc + o.votants.length, 0)} vote(s) — touche une option pour voter</p>
                </div>
              )}
            </RuledCard>

            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mt-6 mb-2">{selectedThread.reponses.length} réponse{selectedThread.reponses.length > 1 ? "s" : ""}</p>
            <div className="space-y-2 mb-4">
              {selectedThread.reponses.map((r) => (
                <div key={r.id} className="bg-slate-800 rounded-xl px-4 py-3"><p className="text-sm text-stone-100">{r.contenu}</p><p className="text-xs text-slate-500 mt-1">{r.auteur} · {fmtDate(r.date)}</p></div>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="flex-1 bg-slate-800 text-stone-100 placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-600" placeholder="Écrire une réponse..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
              <button onClick={() => postReply(selectedThread)} className="bg-amber-700 hover:bg-amber-800 text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0"><Send size={16} /></button>
            </div>
          </div>
        )}

        {/* ---------- OPPORTUNITÉS ---------- */}
        {activeTab === "opportunites" && (
          <div>
            <SectionHeader eyebrow="Ne rien manquer" title="Opportunités" />
            <div className="flex gap-2 overflow-x-auto pb-1 mb-2 -mx-1 px-1">
              {["toutes", ...TYPES_OPP.map((t) => t.id)].map((id) => (
                <button key={id} onClick={() => setFilterTypeOpp(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterTypeOpp === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>
                  {id === "toutes" ? "Toutes" : TYPES_OPP.find((t) => t.id === id).label}
                </button>
              ))}
            </div>
            {filterTypeOpp !== "toutes" && (
              <div className="mb-4"><SubscribeToggle active={(profile.abonnements?.typesOpp || []).includes(filterTypeOpp)} onClick={() => toggleAbonnement("typesOpp", filterTypeOpp)} label={`Suivre ${TYPES_OPP.find((t) => t.id === filterTypeOpp)?.label}`} /></div>
            )}
            {opportunites === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : filteredOpp.length === 0 ? <EmptyState text="Aucune opportunité dans cette catégorie pour le moment." /> : (
              <div className="space-y-3">
                {filteredOpp.map((o) => (
                  <RuledCard key={o.id}>
                    <div className="flex items-start gap-3">
                      <SealBadge sigle={uniBy(o.universite).sigle.slice(0, 4)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            <Tag tone="amber">{TYPES_OPP.find((t) => t.id === o.type)?.label}</Tag>
                            {o.estPartenaire && <Tag tone="indigo">{o.nomEntreprise || "Partenaire"}</Tag>}
                          </div>
                          <ReportButton onClick={() => ouvrirSignalement("opportunite", o.id, o.titre)} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mt-2">{o.titre}</p>
                        <p className="text-xs text-slate-600 mt-1">{o.description}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                          {o.lieu && <span className="flex items-center gap-1"><MapPin size={12} /> {o.lieu}</span>}
                          {o.date && <span className="flex items-center gap-1"><Calendar size={12} /> {o.date}</span>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-400">Publié par {o.auteur} · {fmtDate(o.datePub)}</p>
                          <button onClick={() => ouvrirCandidature(o)} className="text-xs font-semibold text-amber-700">Postuler</button>
                        </div>
                      </div>
                    </div>
                  </RuledCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------- VIE DU CAMPUS ---------- */}
        {activeTab === "campus" && (
          <div>
            <SectionHeader eyebrow="Vie universitaire" title="Vie du Campus" />
            <div className="flex gap-2 overflow-x-auto pb-1 mb-2 -mx-1 px-1">
              {["tous", ...TYPES_EVENEMENT.map((t) => t.id)].map((id) => (
                <button key={id} onClick={() => setFilterTypeEv(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterTypeEv === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>
                  {id === "tous" ? "Tous" : TYPES_EVENEMENT.find((t) => t.id === id)?.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
              {["toutes", ...UNIVERSITES.map((u) => u.id)].map((id) => (
                <button key={id} onClick={() => setFilterUniEv(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterUniEv === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>
                  {id === "toutes" ? "Toutes" : uniBy(id).sigle}
                </button>
              ))}
            </div>
            {evenements === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : (
              (() => {
                const filtered = (evenements || []).filter((e) => (filterTypeEv === "tous" || e.type === filterTypeEv) && (filterUniEv === "toutes" || e.universite === filterUniEv));
                return filtered.length === 0 ? <EmptyState text="Aucun événement annoncé pour l'instant. Sois le premier à publier !" /> : (
                  <div className="space-y-3">
                    {filtered.map((e) => {
                      const typeLabel = TYPES_EVENEMENT.find((t) => t.id === e.type)?.label || e.type;
                      const toneMap = { soiree: "rose", conference: "indigo", forum: "emerald", debat: "amber", caravane: "slate", kermesse: "rose", sport: "emerald", culturel: "indigo", autre: "slate" };
                      return (
                        <RuledCard key={e.id}>
                          <div className="flex items-start gap-3">
                            <SealBadge sigle={uniBy(e.universite).sigle.slice(0, 4)} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <Tag tone={toneMap[e.type] || "slate"}>{typeLabel}</Tag>
                                <ReportButton onClick={() => ouvrirSignalement("evenement", e.id, e.titre)} />
                              </div>
                              <p className="text-sm font-semibold text-slate-900 mt-2">{e.titre}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{uniBy(e.universite).nom}</p>
                              {e.description && <p className="text-xs text-slate-600 mt-1.5">{e.description}</p>}
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                                {e.date && <span className="flex items-center gap-1"><Calendar size={12} /> {e.date}{e.heure ? ` à ${e.heure}` : ""}</span>}
                                {e.lieu && <span className="flex items-center gap-1"><MapPin size={12} /> {e.lieu}</span>}
                              </div>
                              <p className="text-xs text-slate-400 mt-2">Publié par {e.auteur} · {fmtDate(e.datePub)}</p>
                            </div>
                          </div>
                        </RuledCard>
                      );
                    })}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* ---------- RÉSEAU ---------- */}
        {activeTab === "reseau" && (
          <div>
            <SectionHeader eyebrow="Élargis ton cercle" title="Réseau étudiant" />
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
              {reseauSubtabs.map((s) => (
                <button key={s.id} onClick={() => { setReseauTab(s.id); setActiveConv(null); }} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${reseauTab === s.id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>{s.label}</button>
              ))}
            </div>

            {reseauTab === "annuaire" && (
              <div>
                <div className="relative mb-3">
                  <Search size={15} className="absolute left-3 top-3 text-slate-500" />
                  <input className="w-full bg-slate-800 text-stone-100 placeholder-slate-500 text-sm rounded-xl pl-9 pr-3 py-2.5 border border-slate-700" placeholder="Rechercher un pseudo, une filière..." value={searchDir} onChange={(e) => setSearchDir(e.target.value)} />
                </div>
                <div className="flex gap-2 mb-3">
                  {[{ id: "tous", l: "Tous" }, { id: "etudiant", l: "Étudiants" }, { id: "alumni", l: "Alumni" }].map((s) => (
                    <button key={s.id} onClick={() => setFilterStatutDir(s.id)} className={`text-xs px-3 py-1.5 rounded-full font-medium ${filterStatutDir === s.id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>{s.l}</button>
                  ))}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
                  {["toutes", ...UNIVERSITES.map((u) => u.id)].map((id) => (
                    <button key={id} onClick={() => setFilterUniDir(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterUniDir === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>{id === "toutes" ? "Toutes" : uniBy(id).sigle}</button>
                  ))}
                </div>
                {annuaire === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : filteredDir.length === 0 ? <EmptyState text="Aucun profil ne correspond à ta recherche." /> : (
                  <div className="space-y-3">
                    {filteredDir.map((d) => (
                      <RuledCard key={d.pseudo}>
                        <div className="flex items-start gap-3">
                          <SealBadge sigle={uniBy(d.universite).sigle.slice(0, 4)} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">{d.pseudo} <VerifBadge statut={d.statutVerification} /></p>
                              <ReportButton onClick={() => ouvrirSignalement("profil", d.pseudo, d.pseudo)} />
                            </div>
                            <p className="text-xs text-slate-500">{uniBy(d.universite).nom} · {d.filiere} · {d.niveau}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {d.statutAcademique === "alumni" && <Tag tone="rose">Alumni{d.anneeObtention ? ` ${d.anneeObtention}` : ""}</Tag>}
                              {d.estMentor && <Tag tone="emerald">Mentor</Tag>}
                            </div>
                            {d.bio && <p className="text-xs text-slate-600 mt-1.5">{d.bio}</p>}
                            {d.competences && <p className="text-[11px] text-slate-500 mt-1">Compétences : {d.competences}</p>}
                            <button onClick={() => openConversation(d.pseudo)} className="mt-2 text-xs font-semibold text-amber-700 flex items-center gap-1"><MessageSquare size={13} /> Envoyer un message</button>
                          </div>
                        </div>
                      </RuledCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {reseauTab === "mentorat" && (
              <div>
                {mentors.length === 0 ? <EmptyState text="Aucun mentor disponible pour l'instant. Active le mode mentor depuis ton profil pour en proposer un." /> : (
                  <div className="space-y-3">
                    {mentors.map((d) => (
                      <RuledCard key={d.pseudo}>
                        <div className="flex items-start gap-3">
                          <SealBadge sigle={uniBy(d.universite).sigle.slice(0, 4)} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">{d.pseudo} <VerifBadge statut={d.statutVerification} /></p>
                            <div className="flex flex-wrap gap-1 mt-1"><Tag tone={d.statutAcademique === "alumni" ? "rose" : "slate"}>{d.statutAcademique === "alumni" ? `Alumni ${d.anneeObtention}` : "Étudiant"}</Tag><Tag tone="emerald">Mentor</Tag></div>
                            <p className="text-xs text-slate-600 mt-1.5">Domaine : {d.domaineMentorat || "—"}</p>
                            <p className="text-xs text-slate-500">Disponibilité : {d.disponibiliteMentorat || "À discuter"}</p>
                            <button onClick={() => openConversation(d.pseudo, `Bonjour ${d.pseudo}, je m'intéresse à un mentorat en ${d.domaineMentorat || "ton domaine"}. Serais-tu disponible pour échanger ?`)} className="mt-2 text-xs font-semibold text-amber-700 flex items-center gap-1"><MessageSquare size={13} /> Demander un mentorat</button>
                          </div>
                        </div>
                      </RuledCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {reseauTab === "clubs" && (
              <div>
                <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
                  {["toutes", ...UNIVERSITES.map((u) => u.id)].map((id) => (
                    <button key={id} onClick={() => setFilterUniClub(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterUniClub === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>{id === "toutes" ? "Toutes" : uniBy(id).sigle}</button>
                  ))}
                </div>
                {clubs === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : filteredClubs.length === 0 ? <EmptyState text="Aucune association référencée pour l'instant." /> : (
                  <div className="space-y-3">
                    {filteredClubs.map((c) => (
                      <RuledCard key={c.id}>
                        <Tag tone="indigo">{c.categorie}</Tag>
                        <p className="text-sm font-semibold text-slate-900 mt-2">{c.nom}</p>
                        <p className="text-xs text-slate-500">{uniBy(c.universite).nom}</p>
                        <p className="text-xs text-slate-600 mt-1.5">{c.description}</p>
                        {c.contact && <p className="text-xs text-slate-500 mt-1.5">Contact : {c.contact}</p>}
                      </RuledCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {reseauTab === "comoturage" && (
              <div>
                {covoiturages === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : (covoiturages || []).length === 0 ? <EmptyState text="Aucun trajet partagé pour l'instant." /> : (
                  <div className="space-y-3">
                    {covoiturages.map((c) => (
                      <RuledCard key={c.id}>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Car size={15} className="text-amber-700" /> {c.depart} → {c.arrivee}</div>
                        <p className="text-xs text-slate-500 mt-1">{c.date} à {c.heure} · {c.places} place(s) · {c.prix || "Prix à discuter"}</p>
                        {c.commentaire && <p className="text-xs text-slate-600 mt-1.5">{c.commentaire}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-400">{c.auteur}</p>
                          <button onClick={() => openConversation(c.auteur, `Bonjour, ton trajet ${c.depart} → ${c.arrivee} du ${c.date} m'intéresse, est-il toujours disponible ?`)} className="text-xs font-semibold text-amber-700">Contacter</button>
                        </div>
                      </RuledCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {reseauTab === "messages" && !activeConv && (
              <div>
                {inbox === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : inbox.length === 0 ? <EmptyState text="Pas encore de conversation. Va dans l'annuaire ou le mentorat pour contacter quelqu'un." /> : (
                  <div className="space-y-2">
                    {inbox.map((pseudo) => {
                      const dEntry = (annuaire || []).find((d) => d.pseudo === pseudo);
                      return (
                        <button key={pseudo} onClick={() => setActiveConv(pseudo)} className="w-full flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3 text-left">
                          <SealBadge sigle={uniBy(dEntry?.universite || "autre").sigle.slice(0, 4)} />
                          <div className="min-w-0"><p className="text-sm font-semibold text-stone-50">{pseudo}</p><p className="text-xs text-slate-400">{dEntry?.filiere || "Étudiant·e"}</p></div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {reseauTab === "messages" && activeConv && (
              <div>
                <button onClick={() => setActiveConv(null)} className="text-slate-300 flex items-center gap-1 text-sm mb-3"><ChevronLeft size={16} /> Mes conversations</button>
                <div className="bg-slate-800 rounded-2xl p-4 mb-3 min-h-[40vh] flex flex-col gap-2">
                  {convMessages === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : convMessages.length === 0 ? <p className="text-xs text-slate-500 text-center mt-8">Démarre la conversation avec {activeConv}.</p> : convMessages.map((m, i) => (
                    <div key={i} className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${m.auteur === profile.pseudo ? "self-end bg-amber-700 text-white" : "self-start bg-slate-700 text-stone-100"}`}>
                      {m.contenu}
                      <p className={`text-[10px] mt-1 ${m.auteur === profile.pseudo ? "text-amber-100" : "text-slate-400"}`}>{fmtDate(m.date)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 bg-slate-800 text-stone-100 placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-600" placeholder={`Écrire à ${activeConv}...`} value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                  <button onClick={sendMessage} className="bg-amber-700 hover:bg-amber-800 text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0"><Send size={16} /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------- RESSOURCES ---------- */}
        {activeTab === "ressources" && (
          <div>
            <SectionHeader eyebrow="Entraide académique" title="Ressources partagées" />
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
              {["toutes", ...UNIVERSITES.map((u) => u.id)].map((id) => (
                <button key={id} onClick={() => setFilterUniRes(id)} className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${filterUniRes === id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"}`}>{id === "toutes" ? "Toutes" : uniBy(id).sigle}</button>
              ))}
            </div>
            {ressources === null ? <Loader2 className="animate-spin text-amber-500 mx-auto mt-8" /> : filteredRes.length === 0 ? <EmptyState text="Aucune ressource partagée ici pour l'instant." /> : (
              <div className="space-y-3">
                {filteredRes.map((r) => (
                  <RuledCard key={r.id}>
                    <div className="flex items-start gap-3">
                      <SealBadge sigle={uniBy(r.universite).sigle.slice(0, 4)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Tag tone="emerald">{r.type}</Tag>
                          <ReportButton onClick={() => ouvrirSignalement("ressource", r.id, r.titre)} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mt-2">{r.titre}</p>
                        <p className="text-xs text-slate-500">{r.matiere}</p>
                        {r.description && <p className="text-xs text-slate-600 mt-1.5">{r.description}</p>}
                        {r.lien && <a href={r.lien} target="_blank" rel="noreferrer" className="text-xs font-semibold text-amber-700 flex items-center gap-1 mt-2"><ExternalLink size={12} /> Ouvrir le lien</a>}
                        <p className="text-xs text-slate-400 mt-2">Partagé par {r.auteur} · {fmtDate(r.date)}</p>
                      </div>
                    </div>
                  </RuledCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------- PROFIL ---------- */}
        {activeTab === "profil" && editProfile && (
          <div>
            <SectionHeader eyebrow="Mon compte" title="Profil" />
            <RuledCard>
              <div className="flex items-center gap-3">
                <SealBadge sigle={uniBy(editProfile.universite).sigle.slice(0, 4)} size="lg" />
                <div>
                  <p className="font-serif text-lg text-slate-900 flex items-center gap-1">{editProfile.pseudo} <VerifBadge statut={editProfile.statutVerification} /></p>
                  <Tag tone={editProfile.statutPaiement === "en_attente_de_verification" ? "amber" : "slate"}>{editProfile.statutPaiement === "en_attente_de_verification" ? "Paiement en vérification" : "À confirmer"}</Tag>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {computeBadges(editProfile.pseudo).map((b) => <Tag key={b.label} tone={b.tone}>{b.label}</Tag>)}
                {editProfile.statutAcademique === "alumni" && <Tag tone="rose">Alumni {editProfile.anneeObtention}</Tag>}
                {editProfile.estMentor && <Tag tone="emerald">Mentor</Tag>}
              </div>
            </RuledCard>

            <div className="mt-4 bg-stone-50 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-3 flex items-center gap-1.5"><User size={13} /> Informations</p>
              <Field label="Filière"><select className={inputCls} value={editProfile.filiere} onChange={(e) => setEditProfile({ ...editProfile, filiere: e.target.value })}>{FILIERES.map((f) => <option key={f}>{f}</option>)}</select></Field>
              <Field label="Niveau"><select className={inputCls} value={editProfile.niveau} onChange={(e) => setEditProfile({ ...editProfile, niveau: e.target.value })}>{NIVEAUX.map((n) => <option key={n}>{n}</option>)}</select></Field>
              <Field label="Téléphone"><input className={inputCls} value={editProfile.telephone} onChange={(e) => setEditProfile({ ...editProfile, telephone: e.target.value })} /></Field>
              <Field label="Bio"><textarea className={inputCls} rows={3} value={editProfile.bio} onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })} /></Field>
              <label className="flex items-start gap-2 mb-2 cursor-pointer">
                <input type="checkbox" className="mt-1" checked={editProfile.inscritAnnuaire} onChange={(e) => setEditProfile({ ...editProfile, inscritAnnuaire: e.target.checked })} />
                <span className="text-sm text-slate-600">Visible dans l'annuaire étudiant</span>
              </label>

              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mt-6 mb-3 flex items-center gap-1.5"><GraduationCap size={13} /> Statut académique</p>
              <Field label="Statut">
                <select className={inputCls} value={editProfile.statutAcademique} onChange={(e) => setEditProfile({ ...editProfile, statutAcademique: e.target.value })}>
                  <option value="etudiant">Étudiant·e actuel·le</option>
                  <option value="alumni">Ancien·ne diplômé·e (Alumni)</option>
                </select>
              </Field>
              {editProfile.statutAcademique === "alumni" && (
                <Field label="Année d'obtention du diplôme"><input className={inputCls} value={editProfile.anneeObtention} onChange={(e) => setEditProfile({ ...editProfile, anneeObtention: e.target.value })} placeholder="Ex. 2024" /></Field>
              )}

              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mt-6 mb-3 flex items-center gap-1.5"><Award size={13} /> Mini-CV</p>
              <Field label="Compétences (séparées par des virgules)"><input className={inputCls} value={editProfile.competences} onChange={(e) => setEditProfile({ ...editProfile, competences: e.target.value })} placeholder="Ex. Excel, Prise de parole, Python" /></Field>
              <Field label="Langues"><input className={inputCls} value={editProfile.langues} onChange={(e) => setEditProfile({ ...editProfile, langues: e.target.value })} placeholder="Ex. Français, Anglais, Mooré" /></Field>
              <Field label="Lien portfolio / CV en ligne (optionnel)"><input className={inputCls} value={editProfile.lienPortfolio} onChange={(e) => setEditProfile({ ...editProfile, lienPortfolio: e.target.value })} placeholder="https://..." /></Field>

              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mt-6 mb-3 flex items-center gap-1.5"><Users size={13} /> Mentorat</p>
              <label className="flex items-start gap-2 mb-3 cursor-pointer">
                <input type="checkbox" className="mt-1" checked={editProfile.estMentor} onChange={(e) => setEditProfile({ ...editProfile, estMentor: e.target.checked })} />
                <span className="text-sm text-slate-600">Je souhaite être mentor pour d'autres étudiants</span>
              </label>
              {editProfile.estMentor && (
                <>
                  <Field label="Domaine de mentorat"><input className={inputCls} value={editProfile.domaineMentorat} onChange={(e) => setEditProfile({ ...editProfile, domaineMentorat: e.target.value })} placeholder="Ex. Recherche de stage, Informatique..." /></Field>
                  <Field label="Disponibilité"><input className={inputCls} value={editProfile.disponibiliteMentorat} onChange={(e) => setEditProfile({ ...editProfile, disponibiliteMentorat: e.target.value })} placeholder="Ex. Week-ends, soirées en semaine..." /></Field>
                </>
              )}

              <PrimaryButton full onClick={saveProfile} icon={Check}>Enregistrer</PrimaryButton>
            </div>

            <div className="mt-4 bg-stone-50 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-3 flex items-center gap-1.5"><ShieldCheck size={13} /> Vérification de la carte étudiante</p>
              <p className="text-xs text-slate-500 mb-3">Renforce la confiance dans l'annuaire et la messagerie.</p>
              <Field label="Numéro de carte étudiante"><input className={inputCls} value={editProfile.numeroCarteEtudiante} onChange={(e) => setEditProfile({ ...editProfile, numeroCarteEtudiante: e.target.value })} /></Field>
              <div className="flex items-center justify-between">
                <Tag tone={editProfile.statutVerification === "verifie" ? "emerald" : editProfile.statutVerification === "en_attente" ? "amber" : "slate"}>
                  {editProfile.statutVerification === "verifie" ? "Vérifié" : editProfile.statutVerification === "en_attente" ? "Vérification en cours" : "Non vérifié"}
                </Tag>
                <button onClick={soumettreVerification} disabled={editProfile.statutVerification !== "non_demande"} className="text-xs font-semibold text-amber-700 disabled:opacity-40">Soumettre pour vérification</button>
              </div>
            </div>

            {(profile.abonnements?.universites?.length > 0 || profile.abonnements?.categories?.length > 0 || profile.abonnements?.typesOpp?.length > 0) && (
              <div className="mt-4 bg-stone-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-3 flex items-center gap-1.5"><Star size={13} /> Mes abonnements</p>
                <div className="flex flex-wrap gap-2">
                  {(profile.abonnements.universites || []).map((id) => (
                    <button key={id} onClick={() => toggleAbonnement("universites", id)} className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">{uniBy(id).sigle} <X size={11} /></button>
                  ))}
                  {(profile.abonnements.categories || []).map((c) => (
                    <button key={c} onClick={() => toggleAbonnement("categories", c)} className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">{c} <X size={11} /></button>
                  ))}
                  {(profile.abonnements.typesOpp || []).map((t) => (
                    <button key={t} onClick={() => toggleAbonnement("typesOpp", t)} className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">{TYPES_OPP.find((x) => x.id === t)?.label} <X size={11} /></button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 bg-stone-50 rounded-2xl p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs uppercase tracking-wide text-amber-700 font-semibold flex items-center gap-1.5"><Megaphone size={13} /> Mode modérateur (démo)</span>
                <input type="checkbox" checked={editProfile.role === "moderateur"} onChange={(e) => { const updated = { ...editProfile, role: e.target.checked ? "moderateur" : "etudiant" }; setEditProfile(updated); setProfile(updated); setPersonal("mon-profil", updated); }} />
              </label>
              <p className="text-[11px] text-slate-400 mt-1">Outil de démonstration — à restreindre à des comptes désignés sur la vraie plateforme.</p>

              {editProfile.role === "moderateur" && (
              <div className="mt-4 bg-stone-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-1 flex items-center gap-1.5"><ShieldCheck size={13} /> Tableau de bord administrateur</p>

                {/* INSCRIPTIONS EN ATTENTE */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Inscriptions en attente</p>
                    <button onClick={chargerInscriptionsEnAttente} className="text-xs font-semibold text-amber-700">Actualiser</button>
                  </div>
                  {inscriptionsEnAttente === null ? (
                    <button onClick={chargerInscriptionsEnAttente} className="w-full text-sm text-amber-700 font-semibold py-2 bg-amber-50 rounded-xl">Charger les inscriptions</button>
                  ) : inscriptionsEnAttente.filter((i) => i.statut === "en_attente").length === 0 ? (
                    <p className="text-xs text-slate-400">Aucune inscription en attente.</p>
                  ) : (
                    <div className="space-y-3">
                      {inscriptionsEnAttente.filter((i) => i.statut === "en_attente").map((ins) => (
                        <div key={ins.id} className="bg-white border border-stone-200 rounded-xl p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{ins.prenom} ({ins.pseudo})</p>
                              <p className="text-xs text-slate-500">{uniBy(ins.universite).nom}</p>
                              <p className="text-xs text-slate-500">{ins.filiere} · {ins.niveau}</p>
                              <p className="text-xs text-slate-500">📞 {ins.telephone}</p>
                              <p className="text-xs text-slate-500">📧 {ins.email}</p>
                            </div>
                            <p className="text-[10px] text-slate-400">{fmtDate(ins.dateInscription)}</p>
                          </div>
                          <div className="mt-2 p-2 bg-amber-50 rounded-lg">
                            <p className="text-xs font-semibold text-amber-800">Référence paiement :</p>
                            <p className="text-xs text-amber-900 font-mono">{ins.referencePaiement}</p>
                          </div>
                          {ins.photoCarteEtudiante && (
                            <a href={ins.photoCarteEtudiante} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-1 text-xs font-semibold text-indigo-700">
                              <ExternalLink size={12} /> Voir la carte étudiante
                            </a>
                          )}
                          <div className="flex gap-2 mt-3">
                            <button onClick={() => validerAcces(ins)} className="flex-1 bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg">✓ Valider l'accès</button>
                            <button onClick={() => rejeterAcces(ins, "Paiement non reçu ou carte invalide")} className="flex-1 bg-rose-600 text-white text-xs font-semibold py-2 rounded-lg">✗ Rejeter</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* INSCRIPTIONS VALIDÉES */}
                {inscriptionsEnAttente && inscriptionsEnAttente.filter((i) => i.statut === "valide").length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">Récemment validés ({inscriptionsEnAttente.filter((i) => i.statut === "valide").length})</p>
                    <div className="space-y-2">
                      {inscriptionsEnAttente.filter((i) => i.statut === "valide").slice(0, 5).map((ins) => (
                        <div key={ins.id} className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-900">{ins.pseudo} — {uniBy(ins.universite).sigle}</span>
                          <Tag tone="emerald">Validé</Tag>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIGNALEMENTS */}
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">Signalements ouverts</p>
                  {signalements === null ? (
                    <button onClick={() => getShared("signalements", []).then(setSignalements)} className="text-xs font-semibold text-amber-700">Charger les signalements</button>
                  ) : signalements.filter((s) => s.statut === "ouvert").length === 0 ? (
                    <p className="text-xs text-slate-400">Aucun signalement en attente.</p>
                  ) : (
                    <div className="space-y-2">
                      {signalements.filter((s) => s.statut === "ouvert").map((s) => (
                        <div key={s.id} className="bg-white border border-stone-200 rounded-xl p-3">
                          <p className="text-xs font-semibold text-slate-800">{s.typeContenu} · {s.titre}</p>
                          <p className="text-[11px] text-slate-500">{s.raison}</p>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => traiterSignalement(s, "traite")} className="text-xs font-semibold text-emerald-700">Marquer traité</button>
                            {s.typeContenu !== "profil" && <button onClick={() => traiterSignalement(s, "supprimer")} className="text-xs font-semibold text-rose-700">Supprimer</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* STATISTIQUES */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { label: "Inscrits total", val: (inscriptionsEnAttente || []).length },
                    { label: "En attente", val: (inscriptionsEnAttente || []).filter((i) => i.statut === "en_attente").length },
                    { label: "Validés", val: (inscriptionsEnAttente || []).filter((i) => i.statut === "valide").length },
                    { label: "Rejetés", val: (inscriptionsEnAttente || []).filter((i) => i.statut === "rejete").length },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-900 rounded-xl p-3 text-center">
                      <p className="font-serif text-xl text-amber-500">{stat.val}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>

            <button onClick={logout} className="w-full mt-4 flex items-center justify-center gap-2 text-rose-700 text-sm font-medium py-2"><LogOut size={15} /> Se déconnecter</button>
          </div>
        )}
      </div>

      {/* FAB unique */}
      {showFab && (
        <button onClick={fabAction} className="fixed bottom-24 right-5 bg-amber-700 hover:bg-amber-800 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-10"><Plus size={22} /></button>
      )}

      {/* NAVIGATION BASSE */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-950 border-t border-slate-800 flex z-20">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelectedThreadId(null); setActiveConv(null); }} className="flex-1 flex flex-col items-center gap-1 py-2.5">
            <t.icon size={19} className={activeTab === t.id ? "text-amber-500" : "text-slate-500"} />
            <span className={`text-[10px] font-medium ${activeTab === t.id ? "text-amber-500" : "text-slate-500"}`}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* MODALES */}
      {newEvOpen && (
        <Modal title="Publier un événement campus" onClose={() => setNewEvOpen(false)}>
          <Field label="Type d'événement">
            <select className={inputCls} value={newEv.type} onChange={(e) => setNewEv({ ...newEv, type: e.target.value })}>
              {TYPES_EVENEMENT.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Titre"><input className={inputCls} value={newEv.titre} onChange={(e) => setNewEv({ ...newEv, titre: e.target.value })} placeholder="Ex. Soirée de fin d'année Promo 2026" /></Field>
          <Field label="Université organisatrice"><UniversiteSelect value={newEv.universite} onChange={(v) => setNewEv({ ...newEv, universite: v })} /></Field>
          <Field label="Lieu"><input className={inputCls} value={newEv.lieu} onChange={(e) => setNewEv({ ...newEv, lieu: e.target.value })} placeholder="Ex. Amphi 500, Salle des fêtes..." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><input type="date" className={inputCls} value={newEv.date} onChange={(e) => setNewEv({ ...newEv, date: e.target.value })} /></Field>
            <Field label="Heure"><input type="time" className={inputCls} value={newEv.heure} onChange={(e) => setNewEv({ ...newEv, heure: e.target.value })} /></Field>
          </div>
          <Field label="Description / programme">
            <textarea className={inputCls} rows={4} value={newEv.description} onChange={(e) => setNewEv({ ...newEv, description: e.target.value })} placeholder="Décris l'événement, le programme, les intervenants, le prix d'entrée..." />
          </Field>
          <Field label="Lien affiche / image (optionnel)">
            <input className={inputCls} value={newEv.affiche} onChange={(e) => setNewEv({ ...newEv, affiche: e.target.value })} placeholder="https://... (lien vers une image)" />
          </Field>
          <PrimaryButton full onClick={publishEvenement} icon={Send}>Publier l'événement</PrimaryButton>
        </Modal>
      )}

      {newThreadOpen && (
        <Modal title="Nouveau sujet" onClose={() => setNewThreadOpen(false)}>
          <Field label="Université"><UniversiteSelect value={newThread.universite} onChange={(v) => setNewThread({ ...newThread, universite: v })} /></Field>
          <Field label="Catégorie"><select className={inputCls} value={newThread.categorie} onChange={(e) => setNewThread({ ...newThread, categorie: e.target.value })}>{CATEGORIES_FORUM.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Type de sujet">
            <div className="flex gap-2">
              {[{ id: "discussion", l: "Discussion" }, { id: "sondage", l: "Sondage" }].map((opt) => (
                <button key={opt.id} type="button" onClick={() => setNewThread({ ...newThread, type: opt.id })} className={`flex-1 text-sm font-medium py-2 rounded-lg border ${newThread.type === opt.id ? "bg-amber-700 border-amber-700 text-white" : "border-stone-300 text-slate-600"}`}>{opt.l}</button>
              ))}
            </div>
          </Field>
          <Field label="Titre"><input className={inputCls} value={newThread.titre} onChange={(e) => setNewThread({ ...newThread, titre: e.target.value })} /></Field>
          <Field label={newThread.type === "sondage" ? "Question du sondage" : "Message"}><textarea className={inputCls} rows={3} value={newThread.contenu} onChange={(e) => setNewThread({ ...newThread, contenu: e.target.value })} /></Field>
          {newThread.type === "sondage" && (
            <Field label="Options de réponse">
              <div className="space-y-2">
                {newThread.options.map((o, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={inputCls} value={o} onChange={(e) => { const opts = [...newThread.options]; opts[i] = e.target.value; setNewThread({ ...newThread, options: opts }); }} placeholder={`Option ${i + 1}`} />
                    {newThread.options.length > 2 && <button type="button" onClick={() => retirerOptionSondage(i)} className="text-rose-700"><X size={18} /></button>}
                  </div>
                ))}
                {newThread.options.length < 5 && <button type="button" onClick={ajouterOptionSondage} className="text-xs font-semibold text-amber-700">+ Ajouter une option</button>}
              </div>
            </Field>
          )}
          <PrimaryButton full onClick={publishThread} icon={Send}>Publier le sujet</PrimaryButton>
        </Modal>
      )}

      {newOppOpen && (
        <Modal title="Publier une opportunité" onClose={() => setNewOppOpen(false)}>
          <Field label="Type"><select className={inputCls} value={newOpp.type} onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value })}>{TYPES_OPP.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></Field>
          <Field label="Titre"><input className={inputCls} value={newOpp.titre} onChange={(e) => setNewOpp({ ...newOpp, titre: e.target.value })} /></Field>
          <Field label="Université concernée"><UniversiteSelect value={newOpp.universite} onChange={(v) => setNewOpp({ ...newOpp, universite: v })} includeToutes /></Field>
          <Field label="Lieu"><input className={inputCls} value={newOpp.lieu} onChange={(e) => setNewOpp({ ...newOpp, lieu: e.target.value })} /></Field>
          <Field label="Date limite / date"><input type="date" className={inputCls} value={newOpp.date} onChange={(e) => setNewOpp({ ...newOpp, date: e.target.value })} /></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={newOpp.description} onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })} /></Field>
          <label className="flex items-start gap-2 mb-3 cursor-pointer">
            <input type="checkbox" className="mt-1" checked={newOpp.estPartenaire} onChange={(e) => setNewOpp({ ...newOpp, estPartenaire: e.target.checked })} />
            <span className="text-sm text-slate-600">Publié au nom d'une entreprise / organisation partenaire</span>
          </label>
          {newOpp.estPartenaire && <Field label="Nom de l'entreprise / organisation"><input className={inputCls} value={newOpp.nomEntreprise} onChange={(e) => setNewOpp({ ...newOpp, nomEntreprise: e.target.value })} /></Field>}
          <PrimaryButton full onClick={publishOpp} icon={Send}>Publier</PrimaryButton>
        </Modal>
      )}

      {candidatureOpp && (
        <Modal title={`Postuler — ${candidatureOpp.titre}`} onClose={() => setCandidatureOpp(null)}>
          <Field label="Message de motivation"><textarea className={inputCls} rows={5} value={candidatureMotivation} onChange={(e) => setCandidatureMotivation(e.target.value)} placeholder="Présente-toi en quelques lignes et explique ta motivation..." /></Field>
          <PrimaryButton full onClick={envoyerCandidature} icon={Send} disabled={!candidatureMotivation.trim()}>Envoyer ma candidature</PrimaryButton>
          <p className="text-[11px] text-slate-400 mt-2 text-center">Ta candidature sera envoyée comme message à {candidatureOpp.auteur}.</p>
        </Modal>
      )}

      {newResOpen && (
        <Modal title="Partager une ressource" onClose={() => setNewResOpen(false)}>
          <Field label="Type"><select className={inputCls} value={newRes.type} onChange={(e) => setNewRes({ ...newRes, type: e.target.value })}>{TYPES_RES.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field label="Titre"><input className={inputCls} value={newRes.titre} onChange={(e) => setNewRes({ ...newRes, titre: e.target.value })} /></Field>
          <Field label="Matière / cours"><input className={inputCls} value={newRes.matiere} onChange={(e) => setNewRes({ ...newRes, matiere: e.target.value })} /></Field>
          <Field label="Université"><UniversiteSelect value={newRes.universite} onChange={(v) => setNewRes({ ...newRes, universite: v })} /></Field>
          <Field label="Lien (optionnel)"><input className={inputCls} value={newRes.lien} onChange={(e) => setNewRes({ ...newRes, lien: e.target.value })} placeholder="https://..." /></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={newRes.description} onChange={(e) => setNewRes({ ...newRes, description: e.target.value })} /></Field>
          <PrimaryButton full onClick={publishRes} icon={Send}>Partager</PrimaryButton>
        </Modal>
      )}

      {newClubOpen && (
        <Modal title="Référencer un club / une association" onClose={() => setNewClubOpen(false)}>
          <Field label="Nom"><input className={inputCls} value={newClub.nom} onChange={(e) => setNewClub({ ...newClub, nom: e.target.value })} /></Field>
          <Field label="Université"><UniversiteSelect value={newClub.universite} onChange={(v) => setNewClub({ ...newClub, universite: v })} /></Field>
          <Field label="Catégorie"><select className={inputCls} value={newClub.categorie} onChange={(e) => setNewClub({ ...newClub, categorie: e.target.value })}>{CATEGORIES_CLUB.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={newClub.description} onChange={(e) => setNewClub({ ...newClub, description: e.target.value })} /></Field>
          <Field label="Contact"><input className={inputCls} value={newClub.contact} onChange={(e) => setNewClub({ ...newClub, contact: e.target.value })} placeholder="Email, téléphone ou réseau social" /></Field>
          <PrimaryButton full onClick={publishClub} icon={Send}>Publier</PrimaryButton>
        </Modal>
      )}

      {newCovoitOpen && (
        <Modal title="Proposer un trajet" onClose={() => setNewCovoitOpen(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Départ"><input className={inputCls} value={newCovoit.depart} onChange={(e) => setNewCovoit({ ...newCovoit, depart: e.target.value })} /></Field>
            <Field label="Arrivée"><input className={inputCls} value={newCovoit.arrivee} onChange={(e) => setNewCovoit({ ...newCovoit, arrivee: e.target.value })} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><input type="date" className={inputCls} value={newCovoit.date} onChange={(e) => setNewCovoit({ ...newCovoit, date: e.target.value })} /></Field>
            <Field label="Heure"><input type="time" className={inputCls} value={newCovoit.heure} onChange={(e) => setNewCovoit({ ...newCovoit, heure: e.target.value })} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Places disponibles"><input type="number" min="1" className={inputCls} value={newCovoit.places} onChange={(e) => setNewCovoit({ ...newCovoit, places: e.target.value })} /></Field>
            <Field label="Prix (optionnel)"><input className={inputCls} value={newCovoit.prix} onChange={(e) => setNewCovoit({ ...newCovoit, prix: e.target.value })} placeholder="Ex. 3 000 FCFA" /></Field>
          </div>
          <Field label="Commentaire"><textarea className={inputCls} rows={2} value={newCovoit.commentaire} onChange={(e) => setNewCovoit({ ...newCovoit, commentaire: e.target.value })} /></Field>
          <PrimaryButton full onClick={publishCovoit} icon={Send}>Publier le trajet</PrimaryButton>
        </Modal>
      )}

      {signalerTarget && (
        <Modal title="Signaler ce contenu" onClose={() => setSignalerTarget(null)}>
          <p className="text-xs text-slate-500 mb-4">« {signalerTarget.titre} »</p>
          <Field label="Raison"><select className={inputCls} value={raisonSignalement} onChange={(e) => setRaisonSignalement(e.target.value)}>{RAISONS_SIGNALEMENT.map((r) => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Commentaire (optionnel)"><textarea className={inputCls} rows={3} value={commentaireSignalement} onChange={(e) => setCommentaireSignalement(e.target.value)} /></Field>
          <PrimaryButton full onClick={envoyerSignalement} icon={Flag}>Envoyer le signalement</PrimaryButton>
        </Modal>
      )}

      {notifPanelOpen && (
        <Modal title="Notifications" onClose={() => setNotifPanelOpen(false)}>
          {(notifications || []).length === 0 ? <EmptyState text="Pas encore de notification." /> : (
            <div className="space-y-2">
              {notifications.map((n) => (
                <button key={n.id} onClick={() => handleNotifClick(n)} className={`w-full text-left p-3 rounded-xl border ${n.lu ? "border-stone-200 bg-white" : "border-amber-300 bg-amber-50"}`}>
                  <p className="text-sm text-slate-800">{n.texte}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{fmtDate(n.date)}</p>
                </button>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
