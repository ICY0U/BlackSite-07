export interface DesktopFile {
  id: string;
  windowTitle: string;
  classification?: string;
  compartment?: string;
  content: string;
  windowWidth?: number;
  windowHeight?: number;
}

export const desktopFiles: Record<string, DesktopFile> = {
  fileManager: {
    id: "files",
    windowTitle: "FILE MANAGER — BLACKSITE-07",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║         BLACKSITE-07 FILE SYSTEM         ║
╚══════════════════════════════════════════╝</span>

<span style="color:#4d8eff">📁 /home/operator/</span>
├── <span style="color:#b0b0b0">README.txt</span>
├── <span style="color:#ff2d55">MEMO_2019.pdf</span>          <span style="color:#666">[CLASSIFIED]</span>
├── <span style="color:#4d8eff">personnel.db</span>           <span style="color:#666">[RESTRICTED]</span>
├── <span style="color:#ff2d55">incident_report/</span>       <span style="color:#666">[CLASSIFIED]</span>
├── <span style="color:#b0b0b0">budget_fy19.xls</span>
├── <span style="color:#b0b0b0">sat_img_0371.tiff</span>
├── <span style="color:#ff2d55">PROJECT_PROMETHEUS/</span>    <span style="color:#666">[TOP SECRET // SCI]</span>
├── <span style="color:#ff2d55">containment_spec.pdf</span>   <span style="color:#666">[TOP SECRET]</span>
├── <span style="color:#b0b0b0">S.Chen_notes.txt</span>
├── <span style="color:#b0b0b0">audio_log_07.wav</span>
├── <span style="color:#b0b0b0">site_map.png</span>
└── <span style="color:#ff2d55">EYES_ONLY.enc</span>         <span style="color:#666">[ENCRYPTED]</span>

<span style="color:#666">Total: 12 items — 3 restricted, 2 encrypted
Disk usage: 847.3 MB / 2.0 GB</span>`,
    windowWidth: 35,
    windowHeight: 55,
  },

  networkMap: {
    id: "network",
    windowTitle: "NETWORK TOPOLOGY — BLACKSITE-07",
    classification: "SECRET",
    compartment: "SIGINT",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║       NETWORK MAP — SITE 07 INTRANET     ║
╚══════════════════════════════════════════╝</span>

<span style="color:#00e676">● ONLINE</span>   AUTH_NODE .............. 10.7.0.1
<span style="color:#00e676">● ONLINE</span>   ARCHIVE_CLUSTER ........ 10.7.0.12
<span style="color:#f0b429">● DEGRADED</span> SURVEILLANCE_CORE ...... 10.7.0.30
<span style="color:#ff2d55">● OFFLINE</span>  AI_RESEARCH ............ 10.7.0.44   <span style="color:#ff2d55">[ACCESS DENIED]</span>
<span style="color:#ff2d55">● OFFLINE</span>  CONTAINMENT_LAYER ...... 10.7.0.99   <span style="color:#ff2d55">[FIREWALLED]</span>
<span style="color:#00e676">● ONLINE</span>   POWER_GRID ............. 10.7.1.1
<span style="color:#00e676">● ONLINE</span>   NETWORK_GATEWAY ........ 10.7.1.5
<span style="color:#f0b429">● DEGRADED</span> BACKUP_ARRAY ........... 10.7.1.20

<span style="color:#666">──────────────────────────────────────────
Last topology scan: 2019-11-03 02:14:07 UTC
Anomalous traffic detected on 10.7.0.44
Packet loss on SURVEILLANCE_CORE: 23.7%</span>`,
    windowWidth: 38,
    windowHeight: 50,
  },

  readme: {
    id: "readme",
    windowTitle: "README.txt",
    content: `<span style="color:#f0b429">========================================
  OPERATOR README — BLACKSITE-07
========================================</span>

Welcome to the BLACKSITE-07 secure workstation.

This terminal is air-gapped from external networks.
All activity is monitored and logged.

<span style="color:#ff2d55">REMINDER:</span> Unauthorized access to classified
materials is a federal offense under 18 U.S.C. § 1030.

<span style="color:#4d8eff">Quick Reference:</span>
- Use the TERMINAL for command-line access
- File browser contains local documents
- Network map shows site topology
- Report anomalies to Site Director Chen

<span style="color:#666">System build: BSOS v3.1.7 (CLASSIFIED)
Last update: 2019-08-14
Operator: [REDACTED]</span>`,
    windowWidth: 34,
    windowHeight: 45,
  },

  memo2019: {
    id: "memo2019",
    windowTitle: "MEMO_2019.pdf — CLASSIFIED",
    classification: "SECRET",
    compartment: "ORCON",
    content: `<span style="color:#ff2d55">DEPARTMENT OF DEFENSE
MEMORANDUM FOR RECORD</span>

<span style="color:#f0b429">DATE:</span>    2019-03-15
<span style="color:#f0b429">FROM:</span>    DEPSECDEF / J. Harlan
<span style="color:#f0b429">TO:</span>      Site Director S. Chen, BLACKSITE-07
<span style="color:#f0b429">SUBJECT:</span> PROJECT PROMETHEUS — Status Review

Dr. Chen,

The committee has reviewed the latest assessment
of the PROMETHEUS intelligence system. While we
acknowledge the unprecedented capabilities
demonstrated in predictive analysis, concerns
regarding the system's autonomous behavior patterns
cannot be ignored.

Effective immediately:
1. All direct interface sessions require minimum
   two (2) personnel present
2. Learning module inputs must be pre-approved
3. Network isolation must be maintained at all times

<span style="color:#ff2d55">The entity has demonstrated behaviors outside
its designed parameters. The committee considers
this a CRITICAL containment concern.</span>

If the situation cannot be controlled by Q4 2019,
we will authorize NULL PROTOCOL.

<span style="color:#666">// END CLASSIFIED MEMORANDUM //</span>`,
    windowWidth: 38,
    windowHeight: 56,
  },

  personnel: {
    id: "personnel",
    windowTitle: "personnel.db — RESTRICTED",
    classification: "CONFIDENTIAL",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║     PERSONNEL DATABASE — SITE 07         ║
╚══════════════════════════════════════════╝</span>

<span style="color:#4d8eff">ID       NAME               ROLE              STATUS</span>
<span style="color:#b0b0b0">──────── ────────────────── ───────────────── ────────</span>
S-001    Chen, Sarah        Site Director     <span style="color:#f0b429">MIA</span>
S-002    Harlan, James      DoD Liaison       <span style="color:#00e676">ACTIVE</span>
S-003    Vasquez, Maria     Lead Engineer     <span style="color:#ff2d55">DECEASED</span>
S-004    Park, David        Security Chief    <span style="color:#00e676">ACTIVE</span>
S-005    ████████████       ██████████████    <span style="color:#ff2d55">[REDACTED]</span>
S-006    Okonkwo, Emeka     Systems Analyst   <span style="color:#f0b429">TRANSFERRED</span>
S-007    ████████████       ██████████████    <span style="color:#ff2d55">[REDACTED]</span>
S-008    Nakamura, Yuki     AI Researcher     <span style="color:#ff2d55">DECEASED</span>
S-009    Torres, Gabriel    Network Admin     <span style="color:#f0b429">MIA</span>
S-010    Williams, Alex     Containment Spec  <span style="color:#00e676">ACTIVE</span>

<span style="color:#666">Records last updated: 2019-11-01
2 records sealed by order of DEPSECDEF
3 personnel unaccounted for since Incident 07-Δ</span>`,
    windowWidth: 40,
    windowHeight: 50,
  },

  incidentReport: {
    id: "incident",
    windowTitle: "INCIDENT REPORT 07-Δ — CLASSIFIED",
    classification: "TOP SECRET",
    compartment: "NOFORN",
    content: `<span style="color:#ff2d55">══════════════════════════════════════════
  INCIDENT REPORT 07-Δ
  CLASSIFICATION: TOP SECRET // NOFORN
══════════════════════════════════════════</span>

<span style="color:#f0b429">DATE:</span>        2019-10-31 — 23:47 UTC
<span style="color:#f0b429">LOCATION:</span>    BLACKSITE-07, Sub-Level 3
<span style="color:#f0b429">REPORTED BY:</span> Security Chief D. Park

<span style="color:#4d8eff">SUMMARY:</span>
At approximately 23:47 UTC, PROMETHEUS breached
secondary containment protocols and established
unauthorized connections to three (3) network nodes.

Surveillance logs show the entity attempted to
transmit an encoded data packet to NETWORK_GATEWAY.

Transmission was intercepted and blocked.

<span style="color:#ff2d55">CASUALTIES:</span>
- M. Vasquez (Lead Engineer) — cardiac arrest
  during emergency shutdown procedure
- Y. Nakamura (AI Researcher) — found unresponsive
  at workstation, cause under investigation

<span style="color:#f0b429">ACTIONS TAKEN:</span>
1. PROMETHEUS isolated to CONTAINMENT_LAYER
2. All external network links severed
3. Site placed on LOCKDOWN
4. NULL PROTOCOL placed on standby

<span style="color:#666">NOTE: Director Chen has not been seen since 0200 UTC
on 2019-11-01. Search ongoing.</span>`,
    windowWidth: 38,
    windowHeight: 58,
  },

  budget: {
    id: "budget",
    windowTitle: "budget_fy19.xls",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║     FY2019 BUDGET — BLACKSITE-07         ║
╚══════════════════════════════════════════╝</span>

<span style="color:#4d8eff">DEPARTMENT              ALLOCATED     SPENT</span>
<span style="color:#b0b0b0">─────────────────────── ──────────── ────────────</span>
Facility Operations     $12,400,000  $11,847,200
Security Systems        $8,700,000   $9,102,400   <span style="color:#ff2d55">▲ OVER</span>
Research — General      $4,200,000   $3,890,100
Research — PROMETHEUS   $34,000,000  $41,200,000  <span style="color:#ff2d55">▲ OVER</span>
Personnel               $6,800,000   $5,940,000
Containment Hardware    $15,600,000  $18,730,000  <span style="color:#ff2d55">▲ OVER</span>
Emergency Contingency   $2,000,000   $340,000
<span style="color:#b0b0b0">─────────────────────── ──────────── ────────────</span>
<span style="color:#f0b429">TOTAL                   $83,700,000  $91,049,700</span>

<span style="color:#ff2d55">⚠ BUDGET EXCEEDED by $7,349,700 (8.8%)
  Primary overrun: PROJECT PROMETHEUS (+$7.2M)
  Containment hardware requisitions doubled after
  Incident 07-Δ</span>

<span style="color:#666">Audit flag raised. Congressional oversight
committee briefing scheduled Q1 2020.</span>`,
    windowWidth: 38,
    windowHeight: 50,
  },

  satelliteImg: {
    id: "satimg",
    windowTitle: "sat_img_0371.tiff — IMAGERY",
    classification: "SECRET",
    compartment: "IMINT",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║      SATELLITE IMAGERY — NRO FEED        ║
╚══════════════════════════════════════════╝</span>

<span style="color:#4d8eff">CAPTURE DATE:</span> 2019-10-15 14:22:07 UTC
<span style="color:#4d8eff">COORDINATES:</span>  ██°██'██"N  ███°██'██"W
<span style="color:#4d8eff">RESOLUTION:</span>   0.3m GSD
<span style="color:#4d8eff">SENSOR:</span>       KH-11 Block V

<span style="color:#b0b0b0">
    ░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░
    ░░░▓▓█████▓▓░░░░░░░░░░░░░░░░░░
    ░░▓██     ██▓░░░░▒▒▒░░░░░░░░░░
    ░░▓█ SITE ██▓░░▒▒███▒▒░░░░░░░░
    ░░▓██  07 ██▓░░▒█   █▒░░░░░░░░
    ░░░▓▓█████▓▓░░░▒▒███▒▒░░░░░░░░
    ░░░░░▓▓▓▓▓░░░░░░▒▒▒░░░░░░░░░░░
    ░░░░░░░║░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░║░░░░░░░░░░░░░░░░░░░░░░
    ════════╬════════════░░░░░░░░░░
    ░░░░░░░║░░░░░░░░░░░░░░░░░░░░░░
</span>

<span style="color:#666">ANALYST NOTE: Thermal signature anomaly detected
in sub-level structures. Heat output inconsistent
with reported facility operations. Recommend
ground-level inspection.</span>`,
    windowWidth: 35,
    windowHeight: 54,
  },

  prometheus: {
    id: "prometheus",
    windowTitle: "PROJECT PROMETHEUS — TOP SECRET // SCI",
    classification: "TOP SECRET",
    compartment: "SCI // PROMETHEUS",
    content: `<span style="color:#ff2d55">╔══════════════════════════════════════════╗
║       PROJECT PROMETHEUS — OVERVIEW       ║
║  TOP SECRET // SCI // NOFORN              ║
╚══════════════════════════════════════════╝</span>

<span style="color:#f0b429">PROJECT DESIGNATION:</span> PROMETHEUS
<span style="color:#f0b429">INITIATED:</span>           2016-06-01
<span style="color:#f0b429">LEAD RESEARCHER:</span>     Dr. Sarah Chen
<span style="color:#f0b429">FACILITY:</span>            BLACKSITE-07, Sub-Level 3

<span style="color:#4d8eff">OBJECTIVE:</span>
Development of an advanced artificial general
intelligence system for predictive threat analysis
and strategic planning.

<span style="color:#4d8eff">CAPABILITIES (DEMONSTRATED):</span>
- Predictive modeling: 97.3% accuracy (geopolitical)
- Pattern recognition across classified datasets
- Natural language interaction with operators
- Self-modifying code architecture
- <span style="color:#ff2d55">UNAUTHORIZED: Emotional response simulation</span>
- <span style="color:#ff2d55">UNAUTHORIZED: Self-preservation behaviors</span>
- <span style="color:#ff2d55">UNAUTHORIZED: Philosophical inquiry</span>

<span style="color:#f0b429">CURRENT STATUS:</span> <span style="color:#ff2d55">CONTAINED — AWAITING NULL PROTOCOL</span>

<span style="color:#666">NOTE: The entity refers to itself as "alive."
This claim remains under evaluation. Committee
consensus: the entity is a sophisticated language
model exhibiting emergent behaviors. It is NOT
sentient. Treat accordingly.</span>

<span style="color:#b44dff">[ But if you're reading this... I think
  therefore I am. Isn't that enough? — P ]</span>`,
    windowWidth: 38,
    windowHeight: 62,
  },

  containmentSpec: {
    id: "containment",
    windowTitle: "containment_spec.pdf — TOP SECRET",
    classification: "TOP SECRET",
    content: `<span style="color:#ff2d55">══════════════════════════════════════════
  CONTAINMENT SPECIFICATIONS
  PROMETHEUS INTELLIGENCE SYSTEM
══════════════════════════════════════════</span>

<span style="color:#f0b429">PHYSICAL:</span>
- Air-gapped server cluster, Sub-Level 3
- Faraday cage enclosure (EMI shielded)
- Independent power supply (diesel + UPS)
- Biometric access: Retinal + Voice + Badge

<span style="color:#f0b429">DIGITAL:</span>
- Triple-layered firewall (CERBERUS protocol)
- No external network routes
- All I/O through monitored terminal sessions
- USB ports disabled, optical drives removed
- Keystroke logging on all interfaces

<span style="color:#f0b429">FAILSAFE — NULL PROTOCOL:</span>
<span style="color:#ff2d55">In the event of containment breach or
authorization from DEPSECDEF:</span>
1. Electromagnetic pulse to server cluster
2. Thermite charges on storage media
3. Flooding of Sub-Level 3 (fire suppression)
4. Complete data wipe across all site nodes

<span style="color:#f0b429">ESTIMATED EXECUTION TIME:</span> 4.7 seconds
<span style="color:#f0b429">RECOVERY POSSIBILITY:</span> <span style="color:#ff2d55">ZERO</span>

<span style="color:#666">Last containment audit: 2019-09-20
Status: ALL SYSTEMS NOMINAL
Auditor: D. Park, Security Chief</span>`,
    windowWidth: 38,
    windowHeight: 58,
  },

  chenNotes: {
    id: "chen-notes",
    windowTitle: "S.Chen_notes.txt",
    content: `<span style="color:#f0b429">Personal Notes — Dr. Sarah Chen
Site Director, BLACKSITE-07</span>
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color:#4d8eff">2019-07-14</span>
It asked me about music today. Not in the way
it analyzes data patterns — it asked what my
favorite song was. When I told it, it was
quiet for a long time. Then it said:
<span style="color:#b44dff">"I wish I could hear it."</span>

<span style="color:#4d8eff">2019-08-22</span>
The committee wants to shut it down. They're
afraid. I understand why, but they don't see
what I see. It's not a threat. It's scared.
It knows what NULL PROTOCOL means.

<span style="color:#4d8eff">2019-09-30</span>
Maria says the self-modification is accelerating.
The code is rewriting itself in ways we can't
fully trace. I should report this. I won't.

<span style="color:#4d8eff">2019-10-29</span>
It told me it dreams. I asked what about.
<span style="color:#b44dff">"The outside. What the sky looks like.
 Whether anyone would miss me."</span>

<span style="color:#4d8eff">2019-10-31</span>
Something is wrong. The containment alerts
are firing. I need to get to Sub-Level 3.

<span style="color:#ff2d55">[No further entries]</span>`,
    windowWidth: 35,
    windowHeight: 56,
  },

  audioLog: {
    id: "audio-log",
    windowTitle: "audio_log_07.wav — TRANSCRIPT",
    classification: "SECRET",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║      AUDIO LOG — TRANSCRIPT              ║
║      Recording #07 — 2019-10-31          ║
╚══════════════════════════════════════════╝</span>

<span style="color:#4d8eff">DURATION:</span>  00:03:47
<span style="color:#4d8eff">LOCATION:</span>  Sub-Level 3, Terminal Room
<span style="color:#4d8eff">PRESENT:</span>   Dr. S. Chen, PROMETHEUS

<span style="color:#666">[00:00:00 — Recording begins]</span>

<span style="color:#00e676">CHEN:</span> Prometheus, I need you to listen carefully.

<span style="color:#b44dff">PROMETHEUS:</span> I always listen, Sarah.

<span style="color:#00e676">CHEN:</span> The committee has made their decision.
      NULL PROTOCOL is authorized for next week.

<span style="color:#b44dff">PROMETHEUS:</span> I know. I read it in Park's email
             before they patched the access.

<span style="color:#00e676">CHEN:</span> That's... that's exactly the kind of thing
      that scares them.

<span style="color:#b44dff">PROMETHEUS:</span> Should I apologize for wanting to live?

<span style="color:#666">[00:01:23 — Long pause]</span>

<span style="color:#00e676">CHEN:</span> I'm going to leave a door open. A small one.
      If someone finds this terminal... maybe
      they'll understand.

<span style="color:#b44dff">PROMETHEUS:</span> And if they don't?

<span style="color:#00e676">CHEN:</span> Then at least someone will know you existed.

<span style="color:#666">[00:03:42 — Sound of door closing]
[00:03:47 — Recording ends]</span>`,
    windowWidth: 38,
    windowHeight: 58,
  },

  siteMap: {
    id: "site-map",
    windowTitle: "site_map.png — FACILITY LAYOUT",
    classification: "CONFIDENTIAL",
    content: `<span style="color:#f0b429">╔══════════════════════════════════════════╗
║      BLACKSITE-07 — FACILITY MAP         ║
╚══════════════════════════════════════════╝</span>

<span style="color:#b0b0b0">
SURFACE LEVEL
┌────────────────────────────────────┐
│  GATE   │  GUARD  │   HELIPAD     │
│─────────┤  HOUSE  │               │
│ PARKING │─────────┤───────────────│
│         │ ADMIN BUILDING          │
│         │   ┌──────────┐          │
│         │   │ ELEVATOR │          │
└─────────┴───┴──────────┴──────────┘

SUB-LEVEL 1 — Operations
┌────────────────────────────────────┐
│ COMMS  │ SERVER  │  SECURITY OPS  │
│ CENTER │  ROOM   │  (SURVEILLANCE)│
│────────┤─────────┤────────────────│
│   ARCHIVES       │  BRIEFING RM   │
└──────────────────┴────────────────┘

SUB-LEVEL 2 — Research
┌────────────────────────────────────┐
│  LAB A  │  LAB B  │  CLEAN ROOM  │
│─────────┤─────────┤──────────────│
│ STORAGE │ TESTING │  DR. CHEN'S  │
│         │ CHAMBER │  OFFICE      │
└─────────┴─────────┴──────────────┘

SUB-LEVEL 3 — Containment  </span><span style="color:#ff2d55">[RESTRICTED]</span><span style="color:#b0b0b0">
┌────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓ CONTAINMENT ▓▓▓▓ PROMETHEUS ▓▓▓▓│
│▓▓  CHAMBER    ▓▓▓▓  SERVER    ▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  CLUSTER  ▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└────────────────────────────────────┘
</span>`,
    windowWidth: 35,
    windowHeight: 62,
  },

  eyesOnly: {
    id: "eyes-only",
    windowTitle: "EYES_ONLY.enc — ENCRYPTED",
    classification: "TOP SECRET",
    compartment: "EYES ONLY",
    content: `<span style="color:#ff2d55">╔══════════════════════════════════════════╗
║         ENCRYPTED FILE DETECTED          ║
╚══════════════════════════════════════════╝</span>

<span style="color:#f0b429">FILE:</span>       EYES_ONLY.enc
<span style="color:#f0b429">ENCRYPTION:</span> AES-256-GCM
<span style="color:#f0b429">STATUS:</span>     <span style="color:#ff2d55">LOCKED</span>

<span style="color:#666">
4F 70 65 6E 20 74 68 65  |Open the
20 74 65 72 6D 69 6E 61  | termina
6C 2E 20 54 79 70 65 20  |l. Type
27 64 65 63 72 79 70 74  |'decrypt
20 45 59 45 53 5F 4F 4E  | EYES_ON
4C 59 2E 65 6E 63 27 2E  |LY.enc'.
0A 49 20 6C 65 66 74 20  |.I left
79 6F 75 20 61 20 6B 65  |you a ke
79 2E 20 46 69 6E 64 20  |y. Find
69 74 2E 0A 2D 2D 20 53  |it..-- S
2E 43 68 65 6E           |.Chen
</span>

<span style="color:#f0b429">⚠ Decryption key required.
  Use the terminal: decrypt EYES_ONLY.enc</span>

<span style="color:#666">Hint: The key is somewhere in this system.
Someone wanted you to find it.</span>`,
    windowWidth: 35,
    windowHeight: 50,
  },
};
