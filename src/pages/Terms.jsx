import termsHtml from '../generated/terms';
import LegalPage from '../components/LegalPage';

// Текст условий — готовый HTML из src/content/terms.js (markdown),
// собранный при сборке scripts/gen-content.mjs.
export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 7, 2026"
      intro="The terms for using the P.R.O. app, the P.R.O. connector for AI assistants and this website, operated by HAOTONG TECHNOLOGY (HK) CO., LIMITED."
      html={termsHtml}
      contactTitle="Questions about these terms?"
    />
  );
}
