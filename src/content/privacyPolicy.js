export const privacyPolicyMarkdown = `## Overview

P.R.O. is a fitness tracking and performance analytics application. This Privacy Policy describes all personal data processing activities carried out by **HAOTONG TECHNOLOGY CO. LIMITED** in connection with the P.R.O. app and website.

This policy is organized into two parts:

- **Part A** — Standard app usage (account creation and core fitness tracking)
- **Part B** — Optional AI-powered features

Part A applies to all users. Part B applies additionally if you choose to use AI features. If there is any conflict between the two parts, Part B prevails with respect to AI-related processing.

**Data Controller:** HAOTONG TECHNOLOGY CO. LIMITED  
**Privacy Contact:** [P.R.O.devel001@gmail.com](mailto:P.R.O.devel001@gmail.com)

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

AI features in P.R.O. are powered via [OpenRouter](https://openrouter.ai), an independent third-party AI API aggregation service. P.R.O. transmits your query and relevant fitness context to OpenRouter, which routes the request to a backend AI model provider. P.R.O. displays the returned response to you.

P.R.O. acts solely as the user interface layer. AI computation is performed entirely by OpenRouter and the respective backend model provider, which are independent services not operated by HAOTONG TECHNOLOGY CO. LIMITED.

### B2. Data Transmitted

When you use an AI feature, the following data is transmitted externally:

- Your text query (the input you provide)
- A limited selection of fitness context data necessary for the AI feature to function
- A pseudonymous session identifier (does not include your name or email)

### B3. Third-Party AI Processors

**OpenRouter**

| | |
| --- | --- |
| Role | AI API aggregator; primary sub-processor |
| Privacy Policy | [openrouter.ai/privacy](https://openrouter.ai/privacy) |
| Provider logging | [openrouter.ai/docs/guides/privacy/provider-logging](https://openrouter.ai/docs/guides/privacy/provider-logging) |

OpenRouter routes requests to various backend AI model providers. P.R.O. has a service relationship with OpenRouter; however, P.R.O. does not have direct contractual relationships with OpenRouter's backend providers and therefore cannot guarantee, enforce, or be held responsible for the data practices of those providers.

**Backend AI Model Providers**

| AI Mode | Backend Provider |
| --- | --- |
| Auto | Nvidia (via OpenRouter) |
| Other models | Varies by user selection; governed by respective provider's policy |

Backend model providers are independent third parties. Their data retention, storage, logging, and model training practices are governed entirely by their own privacy policies and are outside P.R.O.'s control or responsibility. P.R.O. expressly disclaims liability for any processing, storage, disclosure, or use of data carried out by backend AI model providers.

Relevant policies:

- Nvidia: [nvidia.com privacy policy](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)
- OpenRouter provider data practices: [openrouter.ai/docs/guides/privacy/provider-logging](https://openrouter.ai/docs/guides/privacy/provider-logging)

### B4. Retention of AI Data

P.R.O. retains AI conversation history only within the app on your device for your reference. You can delete it at any time in **Settings → AI History → Clear**. P.R.O. does not store the content of AI queries on its own servers.

OpenRouter and backend model providers retain data per their own policies. P.R.O. has no ability to control, limit, or compel deletion of data once transmitted to those services.

### B5. International Data Transfers

OpenRouter and its backend providers may process data on servers in jurisdictions outside your country of residence, including the United States. P.R.O. relies on OpenRouter to implement appropriate transfer safeguards where required. P.R.O. makes no representation and accepts no liability regarding the transfer mechanisms or data localization practices of individual backend model providers.

### B6. Opting Out

AI features are entirely optional and can be disabled at any time in **Settings → AI Features**. Disabling AI features does not affect access to any other part of the app. Withdrawal of consent does not obligate P.R.O. to retrieve or delete data already transmitted to third-party providers prior to withdrawal.

### B7. AI Output Disclaimer

AI-generated content provided through P.R.O. is for informational and advisory purposes only. It does not constitute medical, clinical, nutritional, or professional fitness advice. HAOTONG TECHNOLOGY CO. LIMITED makes no warranty as to the accuracy, completeness, or reliability of AI-generated outputs. Use of AI features and reliance on AI-generated content is at the user's sole risk.

---

## Your Rights

Regardless of jurisdiction, you may contact us to:

- Access, correct, or delete the data we directly hold about you
- Export your data (JSON or CSV)
- Withdraw consent for AI features or marketing communications
- Lodge a complaint with your local data protection authority

Please note: Rights relating to data held by third-party providers (OpenRouter, backend AI model providers, infrastructure providers) must be exercised directly with those providers. P.R.O. cannot fulfill data access, correction, or deletion requests on behalf of independent third-party processors.

**EU/EEA users:** Rights under GDPR Articles 15–22 apply to data controlled by HAOTONG TECHNOLOGY CO. LIMITED. For downstream processors, you may need to contact them directly or your national supervisory authority.

**California users:** Rights under CCPA/CPRA apply to data held by HAOTONG TECHNOLOGY CO. LIMITED. We do not sell personal data. For third-party processors, please refer to their respective privacy policies.

To exercise your rights with P.R.O.: [P.R.O.devel001@gmail.com](mailto:P.R.O.devel001@gmail.com) — we respond within 30 days.

---

## Limitation of Liability

To the maximum extent permitted by applicable law, HAOTONG TECHNOLOGY CO. LIMITED disclaims all liability for:

- Data processing, storage, disclosure, or use carried out by OpenRouter or any backend AI model provider
- Security incidents, data breaches, or unauthorized access occurring within third-party systems
- Inaccurate, incomplete, or harmful AI-generated outputs
- Service interruptions, errors, or failures in third-party AI infrastructure

Our aggregate liability under this policy shall not exceed the greater of (a) the fees paid by the user in the twelve months preceding the claim, or (b) USD $100.

---

## Changes to This Policy

Material changes will be communicated via in-app notification and/or email at least 14 days in advance. Continued use of the app after the effective date constitutes acceptance of the revised policy. The "Last Updated" date at the top of this document reflects the most recent revision.

---

## Contact

[P.R.O.devel001@gmail.com](mailto:P.R.O.devel001@gmail.com)
`;
