import Logo from "../components/Logo";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <>
      <Logo />
      <h1 className="text-4xl font-semibold my-auto mx-20 mb-4">
        Noteless Privacy Policy
      </h1>
      <div className="flex  flex-col gap-4 mx-20 mb-10">
        <p>
          Privacy Policy for Noteless
          <br />
          Effective Date: 29/10/2024
        </p>
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to Noteless, operated by Metaverse Lab Limited. We are
          committed to protecting your privacy.
          <br />
          This Privacy Policy explains how we collect, use, and share your
          information.
        </p>
        <h2 className="text-2xl font-semibold">2. Company Information</h2>
        <ul className="list-disc pl-6">
          <li>Name: Metaverse Lab Limited</li>
          <li>
            Address: Unit 977, 9F, Building 19W Science Park Avenue, Sha Tin,
            Hong Kong
          </li>
          <li>Contact Email: charles@voxelai.ai</li>
        </ul>
        <h2 className="text-2xl font-semibold">3. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>Personal Information: Name, email, occupation.</li>
          <li> Usage Data: Information on how you use our site.</li>
          <li>
            Third-Party Content: Our content is published on Wix and Framer,
            which may use cookies.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">
          4. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6">
          <li>Service Improvement: Enhancing user experience.</li>
          <li>
            Marketing: By registering, users consent to being added to our
            mailing list to receive updates and promotional content.
            <br />
            Users can opt out at any time by following the unsubscribe link in
            emails or contacting us.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">5. Data Sharing</h2>
        <p>
          We do not share your data with third parties, except for services
          necessary to operate Noteless.
        </p>
        <h2 className="text-2xl font-semibold">6. User Rights</h2>
        <p>
          You can request data deletion by emailing charles@voxelai.ai. In the
          near future, you will be able to delete your account directly.
        </p>
        <h2 className="text-2xl font-semibold">7. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data,
          including encryption and secure server hosting.
        </p>
        <h2 className="text-2xl font-semibold">
          8. Third-Party Services and AI Services
        </h2>
        <ul className="list-disc pl-6">
          <li>Google Authentication: For user authentication.</li>
          <li>Stripe: For payment processing.</li>
          <li>
            Data Extraction: We use third-party services to extract and analyze
            transcript data securely.
          </li>
          <li>
            AI Content Analysis: We use Groq and open-source LLMs to analyze
            content with AI.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">
          9. International Data Transfer
        </h2>
        <p>
          We may transfer your data internationally, ensuring it is protected
          according to applicable laws.
        </p>
        <h2 className="text-2xl font-semibold">10. Children's Privacy</h2>
        <p>
          Our service is not intended for children, and we do not knowingly
          collect data from children.
        </p>
        <h2 className="text-2xl font-semibold">11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy. You will be notified of significant
          changes via email.
        </p>
        <h2 className="text-2xl font-semibold">12. Contact Us</h2>
        <p>
          If you have any questions, please contact us at charles@voxelai.ai.
        </p>
      </div>
      <Footer />
    </>
  );
}
