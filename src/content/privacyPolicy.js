export const privacyPolicyMarkdown = `## Overview

P.R.O. is a fitness tracking and performance analytics application. This Privacy Policy describes all personal data processing activities carried out by **HAOTONG TECHNOLOGY (HK) CO., LIMITED** in connection with the P.R.O. app and website.

This policy is organized into three parts:

- **Part A** — Standard app usage (account creation and core fitness tracking)
- **Part B** — Optional AI-powered features
- **Part C** — Optional AI assistants and connectors (MCP)

Part A applies to all users. Part B applies additionally if you choose to use AI features in the app. Part C applies additionally if you connect P.R.O. to a third-party AI assistant such as Claude, ChatGPT or Perplexity. If there is any conflict, Part B prevails with respect to the in-app AI coach and Part C prevails with respect to connected AI assistants.

**Data Controller:** HAOTONG TECHNOLOGY (HK) CO., LIMITED  
**Privacy Contact:** [mail@proapp.uk](mailto:mail@proapp.uk)

---

## Part A — Standard App Usage

### A1. Data We Collect

**Registration data:** Name, email address, password (hashed), date of birth, biological sex (optional), height and weight (optional).

**Technical data:** Device type, OS version, app version, anonymized crash reports, and session timestamps.

### A2. Legal Basis for Processing

| Data Category | Legal Basis | Purpose |
| --- | --- | --- |
| Registration data | Contract performance | Account creation and authentication |
| Fitness data | Contract performance | Core app functionality and analytics |
| Technical data | Legitimate interest | App stability, bug fixes |
| Marketing emails | Consent | Promotional communications (opt-in only) |

### A3. Data Sharing

We do not sell your personal data. We share data only with:

- **Infrastructure providers** (e.g., cloud hosting) — under contractual data protection obligations, for hosting and storage
- **Analytics tools** (if applicable) — anonymized, aggregated data only, not linked to individual users
- **Legal requirements** — if compelled by applicable law, court order, or regulatory authority

We require all third-party service providers to maintain appropriate technical and organizational security measures. However, we cannot guarantee the security practices of third parties and disclaim responsibility for breaches or data incidents occurring within their systems.

### A4. Security

All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is restricted to authorized personnel. While we implement industry-standard security measures, no system is entirely immune to unauthorized access. We disclaim liability for security incidents resulting from circumstances beyond our reasonable control, including but not limited to third-party infrastructure failures.

### A5. Retention

- **Account and fitness data:** retained while your account is active; deleted within 30 days of account deletion
- **Technical and crash logs:** retained for 90 days, then automatically purged

We are not able to guarantee deletion of data already shared with third-party infrastructure providers within the same timeframe, as their own retention policies apply.

---

## Part B — AI-Powered Features

### B1. How AI Features Work

AI features in P.R.O. rely on independent third-party AI infrastructure. Depending on the model you select:

- **Auto mode** — requests are sent directly to [Nvidia NIM](https://build.nvidia.com/) (Nvidia Inference Microservices), not through OpenRouter.
- **Other models** — requests are sent via [OpenRouter](https://openrouter.ai), an independent third-party AI API aggregation service, which routes the request to the selected backend AI model provider.

P.R.O. displays the returned response to you. AI computation is performed entirely by the applicable third-party provider (Nvidia NIM or OpenRouter and its backend model providers), which are independent services not operated by HAOTONG TECHNOLOGY (HK) CO., LIMITED.

### B2. Data Transmitted

Before any data is sent to a third-party AI provider, P.R.O. processes it on our systems — for example, selecting only the fitness context relevant to your query, applying pseudonymization where applicable, and preparing the request payload. Only this processed data is transmitted externally; your full account profile is not sent as-is.

When you use an AI feature, the following processed data may be transmitted externally:

- Your text query (the input you provide)
- A limited selection of fitness context data necessary for the AI feature to function
- A pseudonymous session identifier (does not include your name or email)

### B3. Third-Party AI Processors

**Nvidia NIM (Auto mode only)**

| | |
| --- | --- |
| Role | Direct AI inference provider for Auto mode |
| Used for | Auto model selection only — not routed through OpenRouter |
| Privacy Policy | [nvidia.com privacy policy](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/) |

When you use Auto mode, P.R.O. transmits processed data directly to Nvidia NIM. P.R.O. has a service relationship with Nvidia for this purpose; however, Nvidia's data retention, storage, logging, and model training practices are governed entirely by Nvidia's own privacy policy and are outside P.R.O.'s control or responsibility.

**OpenRouter (non-Auto models only)**

| | |
| --- | --- |
| Role | AI API aggregator; sub-processor for user-selected models other than Auto |
| Privacy Policy | [openrouter.ai/privacy](https://openrouter.ai/privacy) |
| Provider logging | [openrouter.ai/docs/guides/privacy/provider-logging](https://openrouter.ai/docs/guides/privacy/provider-logging) |

OpenRouter routes requests to various backend AI model providers. Auto mode does not use OpenRouter. P.R.O. has a service relationship with OpenRouter; however, P.R.O. does not have direct contractual relationships with OpenRouter's backend providers and therefore cannot guarantee, enforce, or be held responsible for the data practices of those providers.

**Backend AI Model Providers**

| AI Mode | Backend Provider |
| --- | --- |
| Auto | Nvidia (directly via Nvidia NIM — not through OpenRouter) |
| Other models | Varies by user selection; routed via OpenRouter; governed by respective provider's policy |

Backend model providers are independent third parties. Their data retention, storage, logging, and model training practices are governed entirely by their own privacy policies and are outside P.R.O.'s control or responsibility. P.R.O. expressly disclaims liability for any processing, storage, disclosure, or use of data carried out by backend AI model providers.

Relevant policies:

- Nvidia: [nvidia.com privacy policy](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)
- OpenRouter provider data practices: [openrouter.ai/docs/guides/privacy/provider-logging](https://openrouter.ai/docs/guides/privacy/provider-logging)

### B4. Retention of AI Data

P.R.O. retains AI conversation history only within the app on your device for your reference. You can delete it at any time in **Settings → AI History → Clear**. P.R.O. does not store the content of AI queries on its own servers.

Nvidia NIM, OpenRouter, and backend model providers retain data per their own policies. P.R.O. has no ability to control, limit, or compel deletion of data once transmitted to those services.

### B5. International Data Transfers

Nvidia NIM, OpenRouter, and their backend providers may process data on servers in jurisdictions outside your country of residence, including the United States. P.R.O. relies on these providers to implement appropriate transfer safeguards where required. P.R.O. makes no representation and accepts no liability regarding the transfer mechanisms or data localization practices of individual AI providers.

### B6. Opting Out

AI features are entirely optional and can be disabled at any time in **Settings → AI Features**. Disabling AI features does not affect access to any other part of the app. Withdrawal of consent does not obligate P.R.O. to retrieve or delete data already transmitted to third-party providers prior to withdrawal.

### B7. AI Output Disclaimer

AI-generated content provided through P.R.O. is for informational and advisory purposes only. It does not constitute medical, clinical, nutritional, or professional fitness advice. HAOTONG TECHNOLOGY (HK) CO., LIMITED makes no warranty as to the accuracy, completeness, or reliability of AI-generated outputs. Use of AI features and reliance on AI-generated content is at the user's sole risk.

---

## Part C — AI Assistants and Connectors (MCP)

### C1. What the Connector Is

P.R.O. offers an optional connector based on the Model Context Protocol (MCP) at **https://mcp.proapp.uk**. It lets a third-party AI assistant that you choose, such as Anthropic Claude, OpenAI ChatGPT or Perplexity, read your P.R.O. data so it can answer questions about your training, sleep and goals in its own chat. The connector is off until you set it up, and you can use P.R.O. without it. Setup instructions are on the [connector guide](https://proapp.uk/apple-health-chatgpt-claude).

### C2. How a Connection Is Authorized

- The assistant connects through **OAuth 2.1** with dynamic client registration. You never give the assistant your P.R.O. password.
- To approve a connection, you generate a **one-time six-character pairing code** in the P.R.O. app (**Settings → MCP Connect → Connect an assistant**). The code is valid for **10 minutes** and can be used **once**.
- **No data is shared before you type that code** on the P.R.O. authorization page. Once you do, the assistant receives access tokens tied to your account.

### C3. What the Assistant Can Read

The assistant reads data only when you ask it something in that assistant and it decides to use the connector to answer. Depending on the categories you allow, it can read:

| Category (as shown in the app) | Data |
| --- | --- |
| Profile | Name, sex, height, weight, age |
| Goals | Goals you set in the app and your progress toward them |
| Daily metrics | Daily totals synced from Apple Health: steps, active energy, distance, exercise minutes, flights climbed |
| Workouts | Workout summaries (type, date, duration, distance, energy, heart rate, pace, cadence, power, source app), your activity streak, your active training plan and its change history |
| Workout routes | The GPS route of a single workout, only when uploaded on request (see below) |
| Sleep | Sleep hours and sleep score |
| Heart rate & HRV | Resting and average heart rate, heart rate variability (HRV), and heart rate within workout summaries |
| Coach memory | Coach notes you or the P.R.O. coach saved |

**Detailed data on request.** When you ask for more detail about one day or one workout, the assistant can ask your iPhone to upload it: a heart-rate series, sleep stages, workout splits or a workout GPS route. The upload happens only after you open the P.R.O. app, and only for categories you allow. These detailed uploads are cached on our servers for **48 hours** so that a repeated question does not upload them again; after 48 hours they expire, are no longer available to any assistant and are deleted.

### C4. What the Assistant Can Do

- **Save a coach note**, only if you turned on **Let assistants write data** in the app. This setting is off by default.
- **Request a fresh sync**, which asks the P.R.O. app to upload new Apple Health data the next time you open it.

The connector cannot delete data, make payments, send messages on your behalf or change your account settings.

### C5. Your Controls

- **Granular permissions.** In **Settings → MCP Connect → Advanced data settings** you can switch off any category (profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, coach memory). A switched-off category is not returned to any connected assistant, effective immediately, and the assistant is told that you turned it off.
- **Read-only by default.** Writing is possible only while **Let assistants write data** is on.
- **Disconnecting.** You can remove the P.R.O. connector in your assistant's settings at any time. To make sure every access token issued to every assistant is revoked on our side, delete your account or email [mail@proapp.uk](mailto:mail@proapp.uk) and we will revoke them.
- **Account deletion.** Deleting your account (**Settings → Delete Account**) deletes your data on our servers, including connector tokens, pairing codes and cached detailed uploads, and revokes all connector access.

### C6. Who Receives the Data

Data returned by the connector is sent to **the AI assistant you connected** and to no one else. That assistant is operated by an independent third party (for example Anthropic, OpenAI or Perplexity AI), not by HAOTONG TECHNOLOGY (HK) CO., LIMITED. Once data reaches the assistant, its storage, retention, use and any model training are governed by that provider's own terms and privacy policy, which you accepted when you signed up for it. Review them before connecting:

- Anthropic (Claude): [anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)
- OpenAI (ChatGPT): [openai.com/policies/privacy-policy](https://openai.com/policies/privacy-policy/)
- Perplexity: [perplexity.ai/hub/legal/privacy-policy](https://www.perplexity.ai/hub/legal/privacy-policy)

In line with Apple App Store Review Guideline 5.1.2(i), we disclose here that personal data, including health and fitness data, is shared with these third-party AI services, and we ask for your explicit permission through the pairing code before any data is shared.

### C7. What We Do Not Do

- We **do not sell** your data or share it for third-party advertising.
- We **do not use** health or fitness data for advertising, marketing or data mining, in line with Apple App Store Review Guideline 5.1.3.
- We **do not use** your data to train AI models.
- We share connector data only with the assistant you connected, and only to answer your requests.

### C8. Not Medical Advice

P.R.O. and the connector provide wellness and fitness information only. P.R.O. is not a medical device, and nothing an assistant says based on P.R.O. data is medical advice, diagnosis or treatment. Talk to a qualified healthcare professional about medical questions and before starting or changing a training programme.

---

## Your Rights

Regardless of jurisdiction, you may contact us to:

- Access, correct, or delete the data we directly hold about you
- Export your data (JSON or CSV)
- Withdraw consent for AI features, connected AI assistants or marketing communications
- Lodge a complaint with your local data protection authority

Please note: Rights relating to data held by third-party providers (Nvidia NIM, OpenRouter, backend AI model providers, AI assistants you connected through the P.R.O. connector, infrastructure providers) must be exercised directly with those providers. P.R.O. cannot fulfill data access, correction, or deletion requests on behalf of independent third-party processors.

**EU/EEA users:** Rights under GDPR Articles 15–22 apply to data controlled by HAOTONG TECHNOLOGY (HK) CO., LIMITED. For downstream processors, you may need to contact them directly or your national supervisory authority.

**California users:** Rights under CCPA/CPRA apply to data held by HAOTONG TECHNOLOGY (HK) CO., LIMITED. We do not sell personal data. For third-party processors, please refer to their respective privacy policies.

To exercise your rights with P.R.O.: [mail@proapp.uk](mailto:mail@proapp.uk) — we respond within 30 days.

---

## Limitation of Liability

To the maximum extent permitted by applicable law, HAOTONG TECHNOLOGY (HK) CO., LIMITED disclaims all liability for:

- Data processing, storage, disclosure, or use carried out by Nvidia NIM, OpenRouter, or any backend AI model provider
- Security incidents, data breaches, or unauthorized access occurring within third-party systems
- Inaccurate, incomplete, or harmful AI-generated outputs
- Service interruptions, errors, or failures in third-party AI infrastructure

Our aggregate liability under this policy shall not exceed the greater of (a) the fees paid by the user in the twelve months preceding the claim, or (b) USD $100.

---

## Changes to This Policy

Material changes will be communicated via in-app notification and/or email at least 14 days in advance. Continued use of the app after the effective date constitutes acceptance of the revised policy. The "Last Updated" date at the top of this document reflects the most recent revision.

---

## Contact

[mail@proapp.uk](mailto:mail@proapp.uk)
`;
