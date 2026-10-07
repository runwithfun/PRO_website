import privacyHtml from '../generated/privacy';
import LegalPage from '../components/LegalPage';

// Текст политики — готовый HTML из src/content/privacyPolicy.js (markdown),
// собранный при сборке scripts/gen-content.mjs; стили — .privacy-md в index.css.
export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 7, 2026"
      intro="How HAOTONG TECHNOLOGY (HK) CO., LIMITED processes your data in the P.R.O. app, in the P.R.O. connector for AI assistants and on this website."
      html={privacyHtml}
      contactTitle="Questions about privacy?"
    />
  );
}
