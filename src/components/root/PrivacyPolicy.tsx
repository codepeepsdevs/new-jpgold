"use client";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 sm:py-20 w-full mx-auto overflow-hidden text-black dark:text-white">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, type: "tween" }}
        className="container flex flex-col items-start justify-start flex-wrap gap-8"
      >
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            JPGC Privacy Policy
          </h2>
          <p>
            This Privacy Policy (this &ldquo;Policy&rdquo;) applies to the
            trading platform (including any applicable mobile applications and
            websites used to access the same) (collectively the
            &ldquo;Platform&rdquo;) provided by Japaul Gold & Ventures Plc (the
            &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo; or
            &ldquo;our&rdquo;). It describes how the Company collects, uses, and
            discloses Personal Information that we obtain from Users of the
            Platform and any account services provided through the Platform, and
            how we use and disclose that information. For purposes of this
            Policy, &ldquo;Personal Information&rdquo; refers to information
            supplied by a User from which the identity of such User may be
            directly or indirectly determined. <br />
            <br /> By registering for and using the Platform, you agree that
            your Personal Information will be handled as described in this
            Policy and the Terms and Conditions applicable to the Platform (the
            &ldquo;Service Agreement&rdquo;); capitalized terms used herein
            shall have the same meaning as set forth in the Service Agreement.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            The Information We Collect About You and How We Collect It
          </h2>

          <p>
            We collect and process Personal Information about you directly from
            you when you register to use the Platform or submit such information
            as a part of the Know-Your-Client (&ldquo;KYC&rdquo;), as well as
            automatically through your use of the Platform.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Information We Collect Directly From You.
          </h2>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • Personal Account and Profile Information: We collect the
              following information when you register an Account: name, mobile
              phone number and/or email address. When your Account meets certain
              standards, we may collect additional information: name as in
              identity card/passport, identity card/passport number, date of
              birth, nationality, mailing address, residential address, mobile
              phone number and email address. (CONFIRM LIST OF INFO REQUIRED)
            </p>
            <p className="w-full flex flex-wrap">
              • Financial Information: We may collect additional financial and
              investment information from you to confirm your status and
              eligibility to set up other types of accounts or conduct certain
              transactions on the Platform, including your investment
              experience, finance-related qualifications and training (including
              any certifications received, issuing organization and date of
              issuance), your annual income level, liquid net worth, estimated
              net worth, source of funds, and source of wealth and whether you
              have had the opening of an account declined by another financial
              institution. (CONFIRM LIST OF INFO REQUIRED)
            </p>
            <p className="w-full flex flex-wrap">
              • Other Required Information: We may need to collect certain
              additional information to comply with legal requirements, such as
              whether you are a Politically Exposed Individual or on any
              restricted persons list, and applicable tax reporting forms, such
              as a W8-BEN. (CONFIRM LIST OF INFO REQUIRED)
            </p>
            <p className="w-full flex flex-wrap">
              • Communications with Us: We collect the information you give us
              during any support and feedback communications via email or when
              you contact us through contact forms on the Platform. We use this
              information to respond to your inquiries, provide support,
              facilitate transactions, and improve our Platform.
            </p>
          </ul>

          <p>
            Please note that if you are acting as an Authorized Individual on
            behalf of a User and are providing Personal Information for such
            User, you are responsible for ensuring that you have all required
            permissions and consents to provide such Personal Information to us
            for use in connection with the Platform and that our use of such
            Personal Information you provide to the Platform does not violate
            any applicable law, rule, regulation or order.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Information We Collect Automatically.
          </h2>

          <p>
            When you use the Platform, our servers automatically record
            information using cookies and other tracking technologies, including
            information that your browser sends whenever you visit the Platform
            or your mobile application sends when you&apos;re using it. This log
            data may include your Internet Protocol address, the address of the
            web page you visited before coming to the Platform, your browser
            type and settings, the date and time of your request, information
            about your browser configuration and plug-ins, language preferences,
            and cookie data. Such log data is not routinely deleted. cookie
            data. Such log data is not routinely deleted.
          </p>
          <p>
            In addition to log data, we may also collect information about the
            device you use for the Platform, including what type of device it
            is, what operating system you&apos;re using, device settings, unique
            device identifiers, and crash data. Whether we collect some or all
            of this information may depend on what type of device you&apos;re
            using and its settings. We may combine this information with other
            information that we have collected about you, including, where
            applicable, your name, user name, email address, and other Personal
            Information.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Geolocation.{" "}
          </h2>

          <p>
            If you have provided permission through your mobile device to allow
            us to collect location information through a mobile application, we
            may obtain your physical location information in terms of latitude
            and longitude from technologies like GPS, Wi-Fi, or cell tower
            proximity. You are able to withdraw your permission for us to
            acquire such physical location information from your mobile device
            through your mobile device settings, although we do not control this
            process. If you have questions about how to disable your mobile
            device&apos;s location services, we recommend you contact your
            mobile device service provider or the mobile device manufacturer.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            How We Use Your Information
          </h2>
          <p>
            We use your information, including your Personal Information, for
            the following purposes:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • To provide our Platform to you, to facilitate communications and
              transactions on the Platform, to communicate with you about your
              use of our Platform, to respond to your inquiries, to fulfill your
              orders, and for other customer service purposes;
            </p>
            <p className="w-full flex flex-wrap">
              • To tailor the content and information that we may send or
              display to you, to offer location customization, and personalized
              help and instructions, and to otherwise personalize your
              experiences while using our Platform;
            </p>
            <p className="w-full flex flex-wrap">
              • To better understand how users access and use the Platform, both
              on an aggregated and individualized basis, in order to improve our
              Platform and respond to user desires and preferences, and for
              other research and analytical purposes;
            </p>
            <p className="w-full flex flex-wrap">
              • For marketing and promotional purposes. For example, we may use
              your information, such as your email address or contact number
              registered with us, to send you news and newsletters, special
              offers, and promotions, to conduct sweepstakes and contests, or to
              contact you about products or information we think may interest
              you. We also may use the information that we learn about you to
              assist us in advertising our Platform on third-party websites.
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            How We Share Your Information
          </h2>
          <p>
            We may share your information, including Personal Information, as
            follows:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • Affiliates. We may disclose the information we collect from you
              to our affiliates or subsidiaries solely for the purpose of
              providing the Platform to you; however, if we do so, their use and
              disclosure of your personally identifiable information will be
              maintained by such affiliates and subsidiaries in accordance with
              this Policy.
            </p>
            <p className="w-full flex flex-wrap">
              • Service Providers. We may disclose the information we collect
              from you to third-party vendors, service providers, contractors,
              or agents who perform functions on our behalf, provided such third
              parties have agreed to only use such information to provide
              services to us.
            </p>
            <p className="w-full flex flex-wrap">
              • Business Transfers. If we are in negotiations with or are
              acquired by or merged with another company or entity, if
              substantially all of our assets are transferred to another company
              or entity, or as part of a bankruptcy proceeding, we may transfer
              the information we have collected from you to the other company or
              entity.
            </p>
            <p className="w-full flex flex-wrap">
              • In Response to Legal Process. We also may disclose the
              information we collect from you in order to comply with the law, a
              judicial proceeding, a court order, or other legal process, such
              as in response to a subpoena.
            </p>
            <p className="w-full flex flex-wrap">
              • To Protect Us and Others. We also may disclose the information
              we collect from you if we believe it is necessary to investigate,
              prevent, or take action regarding illegal activities, suspected
              fraud, situations involving potential threats to the safety of any
              person, violations of our Service Agreement, or this Policy, or as
              evidence in litigation in which we are involved.
            </p>
            <p className="w-full flex flex-wrap">
              • Aggregate and De-Identified Information. We may collect,
              process, analyze, and share aggregate or de-identified information
              about users with third parties and publicly for product
              development, marketing, advertising, research, or similar
              purposes.
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Our Use of Cookies and Other Tracking Mechanisms
          </h2>
          <p>
            We and our third-party service providers use cookies and other
            tracking mechanisms to track information about your use of our
            Platform. We may combine this information with other Personal
            Information we collect from you (and our third-party service
            providers may do so on our behalf).
          </p>
          <p>
            Cookies. Cookies are alphanumeric identifiers that we transfer to
            your computer&apos;s hard drive through your web browser for
            record-keeping purposes. Some cookies allow us to make it easier for
            you to navigate our Platform, while others are used to enable a
            faster log-in process or to allow us to track your activities at our
            Platform. There are two types of cookies: session and persistent
            cookies.
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • Session Cookies. Session cookies exist only during an online
              session. They disappear from your computer when you close your
              browser or turn off your computer. We use session cookies to allow
              our systems to uniquely identify you during a session or while you
              are logged into the Platform. This allows us to process your
              online transactions and requests and verify your identity after
              you have logged in, as you move through our Platform.
            </p>
            <p className="w-full flex flex-wrap">
              • Persistent Cookies. Persistent cookies remain on your computer
              after you have closed your browser or turned off your computer. We
              use persistent cookies to track aggregate and statistical
              information about user activity.
            </p>
            <p className="w-full flex flex-wrap">
              • Business Transfers. If we are in negotiations with or are
              acquired by or merged with another company or entity, if
              substantially all of our assets are transferred to another company
              or entity, or as part of a bankruptcy proceeding, we may transfer
              the information we have collected from you to the other company or
              entity.
            </p>
          </ul>
          <p>
            Please note that &ldquo;do-not-track&rdquo; signals. (CONFIRM THIS)
          </p>

          <p>
            Disabling Cookies. Most web browsers automatically accept cookies,
            but if you prefer, you can edit your browser options to block them
            in the future. The general settings on most browsers will tell you
            how to prevent your computer from accepting new cookies, how to have
            the browser notify you when you receive a new cookie, or how to
            disable cookies altogether. Users of our Platform who disable
            cookies will not be able to browse certain areas of the Platform.
          </p>

          <p>
            Third Party Analytics. We use automated devices and applications,
            such as Google Analytics, to evaluate the usage of our Platform. We
            also may use other analytic means to evaluate our Platform. We use
            these tools to help us improve our Platform, performance, and user
            experiences. These entities may use cookies and other tracking
            technologies to perform their services. We don&apos;t share your
            Personal Information with these third parties.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Third-Party Links{" "}
          </h2>
          <p>
            Our Platform may contain links to third-party websites. Any access
            to and use of such linked websites is not governed by this Policy,
            but instead is governed by the privacy policies of those third-party
            websites. We are not responsible for the information practices of
            such third-party websites.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Security of Your Personal Information
          </h2>
          <p>
            We have implemented reasonable precautions consistent with
            applicable laws and regulations to protect the Personal Information
            we collect from loss, misuse, unauthorized access, disclosure,
            alteration, and destruction. Please be aware that despite our
            efforts, no data security measures can guarantee 100% security.
            Therefore, all Users (including the Authorized Individuals) of the
            Platform must comply with the security requirements in the Terms and
            take the following additional steps to help ensure the security of
            their Personal Information and access to their account:
          </p>

          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • You should choose a robust user identification, password, and
              PIN to access your account (&ldquo;User Credentials&rdquo;) that
              nobody else knows or can easily guess. User Credentials must meet
              the requirements we specify when you establish those User
              Credentials. You should keep your User Credentials secure and
              private, and not share your User Credentials with any third party.
            </p>
            <p className="w-full flex flex-wrap">
              • You should install anti-virus, anti-spyware, and firewall
              software on your personal computers and mobile devices;
            </p>
            <p className="w-full flex flex-wrap">
              • You should update operating systems, anti-virus, and firewall
              products with security patches or newer versions on a regular
              basis;
            </p>
            <p className="w-full flex flex-wrap">
              • You should remove file and printer sharing in computers,
              especially when they are connected to the internet;
            </p>
            <p className="w-full flex flex-wrap">
              • You should make regular backups of your critical data;
            </p>
            <p className="w-full flex flex-wrap">
              • You should consider the use of encryption technology to protect
              highly sensitive or confidential information;
            </p>
            <p className="w-full flex flex-wrap">
              • You should completely log off and clear your browser cache after
              finishing each online session with the Platform;
            </p>
            <p className="w-full flex flex-wrap">
              • You should not install software or run programs of unknown
              origin;
            </p>
            <p className="w-full flex flex-wrap">
              • You should delete junk or chain emails;
            </p>
            <p className="w-full flex flex-wrap">
              • You should not open email attachments from strangers;
            </p>
            <p className="w-full flex flex-wrap">
              • You should not disclose personal, financial, or credit card
              information to little-known or suspect websites;
            </p>
            <p className="w-full flex flex-wrap">
              • You should not use a computer or a device that cannot be
              trusted; and
            </p>
            <p className="w-full flex flex-wrap">
              • You should not use public or internet café computers to access
              online services or perform financial transactions.
            </p>
          </ul>
          <p>
            You should immediately notify us if you become aware of any
            unauthorized use or access of your Account or User Credentials. We
            are not responsible for any lost, stolen, or compromised User
            Credentials or for any activity on your Account via unauthorized
            activity using your User Credentials.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Rights of access, correction, and deletion
          </h2>
          <p>
            You can access, edit, update, or delete your Account or Personal
            Information we have collected at any time by accessing your account
            settings or contacting us. We will respond to your requests within a
            reasonable period of time, but no later than the time period
            required by law. Please note that notwithstanding the foregoing,
            there may be circumstances in which we are unable to accommodate a
            request to edit, update, access, or delete an account profile or
            Personal Information. This includes but is not limited to:
          </p>

          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • any basis where such request can be denied under applicable law;
            </p>
            <p className="w-full flex flex-wrap">
              • where we need to retain the information to comply with federal,
              state, or local laws or for accounting or tax purposes;
            </p>
            <p className="w-full flex flex-wrap">
              • where we need to comply with a civil, criminal, or regulatory
              inquiry, investigation, subpoena, or summons by federal, state, or
              local authorities;
            </p>
            <p className="w-full flex flex-wrap">
              • where we need to cooperate with law enforcement agencies
              concerning conduct or activity that the business, service
              provider, or third party reasonably and in good faith believes may
              violate federal, state, or local law;
            </p>
            <p className="w-full flex flex-wrap">
              • where we need to retain information to exercise or defend legal
              claims;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              • where the information contains legal privilege or proprietary
              information of another party; or
            </p>
            <p className="w-full flex flex-wrap">
              • where complying with the request would compromise others&apos;
              privacy or other legitimate rights.
            </p>
          </ul>
          <p>
            If we determine that we cannot respond to any request in any
            particular instance, we will provide you with an explanation of why
            that determination has been made and a contact point for any further
            inquiries. To protect your privacy, we will take commercially
            reasonable steps to verify your identity before responding to any
            request under this provision, including complying with any
            applicable legal requirement for verifying your identity.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Transfer of Information
          </h2>
          <p>
            Please note, that we may store your Personal Information on servers
            located in the country where our main office is located. If such
            jurisdiction is outside your jurisdiction of residence, you consent
            to the transfer of your Personal Information to such jurisdiction
            for purposes of providing the Platform to you, even if such other
            jurisdiction has less protections for Personal Information than your
            jurisdiction of residence. We will ensure that security provisions
            are in place consistent with our obligations to maintain the
            security of your Personal Information under the laws of your
            jurisdiction of residence.{" "}
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Retention
          </h2>
          <p>
            We retain your Personal Information as long as you maintain an
            Account on the Platform. We will cease to retain your Personal
            Information, or remove the means by which the Personal Information
            can be associated with particular individuals, as soon as it is
            reasonable to assume that —
          </p>

          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              • the purpose for which that Personal Information was collected is
              no longer being served by its retention; and
            </p>
            <p className="w-full flex flex-wrap">
              • retention is no longer necessary for legal, accounting, or
              business purposes.
            </p>
          </ul>
          <p>
            <b>
              Please note that certain laws may require us to retain records of
              transactions or accounts for a certain period of time.
            </b>
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Children Under 18 (CONFIRM THIS PROVISION)
          </h2>
          <p>
            Our Platform is not designed for children under 18. If we discover
            that a child under 18 has provided us with Personal Information, we
            will delete such information from our systems.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            {" "}
            Changes to this Policy
          </h2>
          <p>
            This Policy is current as of the Effective Date set forth above. We
            may change this Policy from time to time, so please be sure to check
            back periodically. We will post any changes to this Policy on the
            Platform. If we make any changes to this Policy that materially
            affect our practices with regard to the Personal Information we have
            previously collected from you, we will endeavor to provide you with
            notice in advance of such change by highlighting the change on our
            Platform or providing a push notification through the Site (you
            should make sure your Site settings allow for such push
            notifications) or sending an email that you have provided in your
            Account, (for this reason you should make sure to update your
            account information promptly if it changes).
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-lg sm:text-xl font-medium">
            All information in the Service is provided &ldquo;as is&rdquo;, with
            no guarantee of completeness, accuracy, timeliness or of the results
            obtained from the use of this information, and without warranty of
            any kind, express or implied, including, but not limited to
            warranties of performance, merchantability and fitness for a
            particular purpose.
          </h2>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-lg sm:text-xl font-medium">
            The Company will not be liable to You or anyone else for any
            decision made or action taken in reliance on the information given
            by the Service or for any consequential, special or similar damages,
            even if advised of the possibility of such damages.
          </h2>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-lg sm:text-xl font-medium">
            If you have any questions about this Policy, you can contact us at:
            support@jpgoldcoin.app
          </h2>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-lg sm:text-xl font-medium">
            The information given by the Service is for general guidance on
            matters of interest only. Even if the Company takes every precaution
            to insure that the content of the Service is both current and
            accurate, errors can occur. Plus, given the changing nature of laws,
            rules and regulations, there may be delays, omissions or
            inaccuracies in the information contained on the Service.
          </h2>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-lg sm:text-xl font-medium">
            The Company is not responsible for any errors or omissions, or for
            the results obtained from the use of this information.
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
