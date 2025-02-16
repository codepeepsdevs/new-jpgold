"use client";
import { motion } from "framer-motion";

const TermsCondition = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 sm:py-20 w-full mx-auto overflow-hidden text-black dark:text-white">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, type: "tween" }}
        className="container flex flex-col items-start justify-start flex-wrap gap-8"
      >
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            JPGC TERMS AND CONDITIONS
          </h2>
          <p>
            These Terms and Conditions (the &quot;Terms&quot; or this
            &quot;Agreement&quot;) govern the use of the electronic trading
            platform, including any website or mobile application (the
            &quot;App&quot;, together with the website, the &quot;Site&quot;)
            for accessing the platform, and any services provided through the
            platform (collectively, the &quot;Platform&quot;) provided by Japaul
            Gold & Ventures Plc (the &quot;Company&quot;, &quot;we&quot;,
            &quot;us&quot; or &quot;our&quot;). The Terms form a binding
            agreement between the Company and you, as an individual user
            (&quot;you&quot;, &quot;your&quot; or &quot;User&quot;) for your
            individual usage of the App and Platform. By registering for and
            downloading the App and using the Platform, you confirm your
            acceptance of this Agreement and our associated Privacy Policy. If
            you do not agree to these Terms, you must immediately uninstall the
            App and cease using the App and the Platform.
          </p>

          <p>
            Securities Disclaimer: No material or any other information that may
            be made available on the Site or Platform shall constitute or be
            construed as a recommendation, endorsement, offer, invitation, or
            solicitation to enter into any transaction with or purchase any
            product, or otherwise deal with JPGC or other products. You further
            understand that none of the information providers, including any
            Third-Party Providers (as defined below) are advising you personally
            concerning the nature, potential, value, or suitability of any of
            JPGC products. You understand that an investment in any digital
            asset is subject to a number of risks and that discussions of any
            digital asset published on the Site or Platform may not contain a
            list or description of relevant risk factors. Please note that
            markets change continuously, so any information, content,
            Third-Party Content (as defined below) or other material provided on
            or through the Site or Platform may not be complete or current, or
            may be superseded by more current information. You rely on such
            information at your own risk. No Professional or Investment Advice.
            Our Site and Platform are not intended to provide tax, legal,
            insurance, or investment advice, and nothing on the Site or Platform
            should be construed as an offer to sell, a solicitation of an offer
            to buy, or a recommendation for any digital asset by the Company.
            You alone are solely responsible for determining whether any
            investment, or strategy, or any other product or service, is
            appropriate or suitable for you based on your investment objectives
            and personal and financial situation. You should consult an attorney
            or tax professional regarding your specific legal or tax situation.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            1. Definitions
          </h2>
          <p>
            1.1 Unless otherwise defined or the context otherwise requires, all
            capitalized terms shall have the meaning given to them in these
            Terms:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) &quot;Account&quot; means the account established by a User
              who has downloaded the App or accessed the Site and registered
              with the Company to use the Site and the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (b) &quot;App&quot; means the mobile application provided by the
              Company to access the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (c) &quot;Authorized Individual&quot; means any person who is
              authorized to access and use the Site (including the App) and
              Platform on behalf of a User.
            </p>

            <p className="w-full flex flex-wrap">
              (d) &quot;Biometric Authentication&quot; means the identity
              authentication function using biometric credentials including
              fingerprint, facial recognition, or any other biometric data, as
              we may permit from time to time.
            </p>

            <p className="w-full flex flex-wrap">
              (e) &quot;Digital Assets&quot; means JPGC tokens and other digital
              assets or currencies that may be supported on the Platform from
              time to time.
            </p>

            <p className="w-full flex flex-wrap">
              (f) &quot;Digital Platforms&quot; refers to third-party
              distribution platforms where mobile applications or other software
              programs can be accessed or downloaded, including, but not limited
              to, the Apple App Store and Google Play.
            </p>
            <p className="w-full flex flex-wrap">
              (g) &quot;Governmental Authority&quot; means any nation or
              government or any province or state or any other political
              subdivision thereof, or any entity, authority or body exercising
              executive, legislative, judicial, regulatory or administrative
              functions of or pertaining to government, including any government
              authority, agency, department, board, commission or
              instrumentality or any political subdivision thereof, any court,
              tribunal or arbitrator, and any self-regulatory organization.
            </p>
            <p className="w-full flex flex-wrap">
              (h) &quot;Material&quot; means any offering material, term sheet,
              market data, research report, product or service documentation, or
              any other information provided through the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (i) &quot;Personal Information&quot; refers to information
              supplied by a User from which the identity of such User may be
              directly or indirectly ascertained.
            </p>
            <p className="w-full flex flex-wrap">
              (j) &quot;Privacy Policy&quot; means the additional terms and
              conditions governing the collection, use, and disclosure of each
              User&apos;s Personal Information, as set out here. Each User must
              read and agree to the Privacy Policy in order to use the App or
              the Site
            </p>
            <p className="w-full flex flex-wrap">
              (k) &quot;Service Notifications&quot; are one-way notifications
              from the Company (which may include security-related
              notifications) via text message or emails and, where applicable,
              push notifications through the Site. These notifications are sent
              to the User in respect of specific information or events relating
              to an account to which a User has access through the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (l) &quot;Third-Party Financial Services Provider&quot; is any
              third party that offers digital asset transactions or other
              financial services accounts that can be registered and accessed
              through the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (m) &quot;Third Party Account&quot; means a separate financial
              services account that a User establishes with a Third-Party
              Financial Services Provider.
            </p>
            <p className="w-full flex flex-wrap">
              (n) &quot;User&quot; means any person that has registered with the
              Company to use the Site and access the Platform and any Authorized
              Individual acting on their behalf.
            </p>
            <p className="w-full flex flex-wrap">
              (o) &quot;User Identification Policy&quot; means the
              know-your-client policy and procedures adopted by the Company from
              time to time regarding the User&apos;s access to the Platform.
            </p>
            <p className="w-full flex flex-wrap">
              (p) &quot;User Credentials&quot; means the set of user
              identification, password, personal identification number, token,
              and any other information or device provided to a User to access
              the Platform.
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">2. Changes</h2>
          <p>2.1 We reserve the right at any time to:</p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) modify, update, or change the terms and conditions of this
              Agreement or our Privacy Policy;
            </p>
            <p className="w-full flex flex-wrap">
              (b) modify, update, or change the Site and Platform, including
              eliminating or discontinuing any content or feature of the Site or
              Platform; or
            </p>
            <p className="w-full flex flex-wrap">
              (c) impose fees, charges, or other conditions for use of the
              Platform or parts thereof (with reasonable notice) (all of the
              foregoing referred to as &quot;Changes&quot;).
            </p>
          </ul>
          <p>
            2.2 We may make such changes at any time without prior notice
            (except as noted in subsection (c) above). Any Changes to this
            Agreement may be posted on our website or notified to you through
            push notifications through the Site or an email to the email address
            in your Account. For this reason, you should check our website
            regularly, allow the Site to receive such push notifications, and
            keep your email address and other contact information up to date in
            the Account. You accept any Changes if you continue to use the Site
            and Platform after such Changes are effected.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            3. Digital Platform Terms
          </h2>
          <p>
            3.1 The App may be available for download from one or more Digital
            Platforms. Your download, installation, access to or use of the App
            is also bound by the terms and conditions and privacy policies of
            the applicable Digital Platform (the &quot;Digital Platform
            Terms&quot;). If there is any conflict between these Terms and the
            Digital Platform Terms, then these Terms will prevail.
          </p>
          <p>
            3.2 The App is independent of and is not associated, affiliated,
            sponsored, endorsed or in any way linked to any Digital Platform.
            You and we acknowledge that this Agreement is entered into between
            you and us only, and not with any Digital Platform, and we, not the
            Digital Platform, are solely responsible for the App and the content
            thereof to the extent specified in this Agreement.
          </p>
          <p>
            3.3 You and we acknowledge and agree that the relevant Digital
            Platform, and that Digital Platform&apos;s subsidiaries, are
            third-party beneficiaries of these Terms, and that, upon your
            acceptance of these Terms, that Digital Platform will have the right
            (and will be deemed to have accepted the right) to enforce these
            Terms against you as a third-party beneficiary thereof.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            4. Network Device and Carrier Requirements
          </h2>
          <p>
            4.1 You acknowledge that your agreement with your mobile and
            Internet network provider (the &quot;Network Provider&quot;) will
            apply to your use of the Site. You acknowledge that you may be
            charged by your Network Provider for data services while using
            certain features of the Site or any other third-party charges as may
            arise and you accept sole responsibility for such charges. If you
            are not the bill payer for the mobile/Internet device being used to
            access the Site, you will be assumed to have received permission
            from the bill payer for using the Site. You must also ensure that
            your use of the Site is not in violation of your mobile or Internet
            device agreement or any wireless data service agreement.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            5. Eligibility and Registration
          </h2>
          <p>
            5.1 You must be at least 18 years of age to access and use the Site
            and Platform. You further affirm that you are fully able and
            competent to enter into the terms, conditions, obligations,
            affirmations, representations, and warranties set forth in these
            Terms, and to abide by and comply with these Terms. You must
            register with the Company to use the Site and the Platform; you
            agree to provide complete and accurate information when registering
            to use the Site and the Platform, and to keep that information
            updated.
          </p>
          <p>
            5.2 We have the sole discretion to accept or reject your
            registration with the Platform. Only Users whose registration are
            approved by us will be our customers.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            6. Intellectual Property
          </h2>
          <p>
            6.1 All title, ownership rights and intellectual property rights in
            or relating to the Site and Platform, any information transmitted
            by, to or over the Platform and information regarding use of the
            Platform will remain with the Company or its licensors. Nothing on
            the Platform will be construed as conferring on any User any
            license, save as expressly set out herein, of any of the
            Company&apos;s or any third party&apos;s title, ownership rights
            and/or intellectual property rights, whether by estoppel,
            implication or otherwise.
          </p>
          <p>
            6.2 The Platform and App may provide you access to content,
            information, quote, videos, photos or other materials (the
            &quot;Third-Party Content&quot;) supplied by certain third parties
            (the &quot;Third-Party Content Providers&quot;). The Company does
            not endorse or recommend, and is not responsible for verifying the
            accuracy, validity or completeness of any Third-Party Content
            provided through the Site or Platform. Your use or reliance on such
            Third-Party Content is at your sole risk. All title, ownership
            rights and intellectual property rights in or relating to the
            Third-Party Content will remain with the applicable Third-Party
            Content Provider. Nothing on the Platform will be construed as
            conferring on any User any license, save as expressly set out
            herein, of any Third-Party Content Provider&apos;s title, ownership
            rights and/or intellectual property rights, whether by estoppel,
            implication or otherwise.
          </p>
          <p>
            6.3 Provided you are in compliance with these Terms, you can
            download and access the Site on a single mobile device and access
            the Platform using properly issued User Credentials. All other
            rights in the Site are reserved by the Company. In the event of your
            breach of these Terms, we will be entitled to terminate your use and
            access to the Site and Platform immediately.
          </p>

          <p>6.4 You agree not to:</p>

          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) modify, adapt, reproduce, translate or create derivative works
              of the Site or Platform, or any data or content (including the
              Third-Party Content) provided through the Site or Platform, or any
              portion thereof, or attempt to reverse engineer, decompile,
              disassemble or otherwise attempt to discover the source code of
              the Site or Platform;
            </p>
            <p className="w-full flex flex-wrap">
              (b) remove any copyright notice, trademark, legend, logo or
              product identification from the Site or Platform;
            </p>
            <p className="w-full flex flex-wrap">
              (c) misrepresent the other sites as the Company&apos;s Site by
              co-opting the visual &quot;look and feel&quot; of or text from the
              Company&apos;s Site or otherwise violate the Company&apos;s
              intellectual property rights, including, without limitation,
              &quot;scraping&quot; text or images from the Company&apos;s Site
              or the Company managed banners and/or text links, search marketing
              or all other online and offline campaigns,
            </p>

            <p className="w-full flex flex-wrap">
              (d) edit, modify, filter, truncate or change the order of the
              information contained in any part of the Company&apos;s Sites, or
              remove, obscure, or minimize any part of the Company&apos;s Site
              in any way without authorization of the Company; or
            </p>

            <p className="w-full flex flex-wrap">
              (e) make any commercial use of the Site or Platform or the
              Company&apos;s logo, trademark or brand name in any way.
            </p>
          </ul>
          <p>
            6.5 Each User authorizes the Company to use any information or
            content provided by the User or processed in connection with the use
            of the Site and Platform (e.g. Personal Information, geographic
            information, device information) in the context and for the purpose
            of providing services or products on the Platform and the secure use
            of the Site and the Platform.{" "}
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            7. Account Opening and Operation
          </h2>
          <p>
            7.1 You must register with us to use the Platform. You agree to
            provide complete and accurate information when registering to use
            the Platform, and to keep that information updated. You must
            register with us in accordance with our User Identification Policy.
            You agree to provide us with any information and documentation that
            we may reasonably request to verify your identity and comply with
            applicable laws and regulations.
          </p>
          <p>
            7.2 You acknowledge and agree that we may, in our sole discretion,
            refuse to open an Account for you. We are not required to provide
            you with a reason for such refusal. We may also, in our sole
            discretion, impose limits on the Digital Assets that may be bought
            or sold through your Account.
          </p>
          <p>
            7.3 You represent and warrant that you are not a &quot;U.S.
            Person&quot; as defined by the U.S. Securities and Exchange
            Commission. You further represent and warrant that you are not
            located in, under the control of, or a national or resident of any
            country to which the United States has embargoed goods or services
            or where the trading of Digital Assets would be prohibited under
            applicable laws.
          </p>
          <p>
            7.4 You acknowledge and agree that we may, in our sole discretion
            and without liability to you, refuse to allow you to open an Account
            or suspend, terminate or restrict your Account, or your ability to
            trade Digital Assets through your Account, including, without
            limitation, in the following circumstances:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) if we reasonably believe that you have breached any provision
              of these Terms;
            </p>
            <p className="w-full flex flex-wrap">
              (b) if we reasonably suspect that you have provided false,
              incomplete or misleading information to us;
            </p>
            <p className="w-full flex flex-wrap">
              (c) if we are required to do so by any applicable law, regulation,
              court order or instruction from a Governmental Authority; or
            </p>
            <p className="w-full flex flex-wrap">
              (d) for any other reason in our sole discretion.
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">8. Trading</h2>
          <p>
            8.1 The Platform allows you to buy and sell Digital Assets. You
            acknowledge and agree that:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) all transactions in Digital Assets are irreversible once
              executed;
            </p>
            <p className="w-full flex flex-wrap">
              (b) we do not guarantee the availability of any Digital Asset at
              any time;
            </p>
            <p className="w-full flex flex-wrap">
              (c) we may suspend or terminate trading in any Digital Asset at
              any time in our sole discretion;
            </p>
            <p className="w-full flex flex-wrap">
              (d) the value of Digital Assets may be highly volatile and we do
              not guarantee any Digital Asset&apos;s value;
            </p>
            <p className="w-full flex flex-wrap">
              (e) you are solely responsible for any trading decisions you make
              and we do not provide any investment, legal, tax or other
              professional advice;
            </p>
            <p className="w-full flex flex-wrap">
              (f) we may impose trading limits on your Account at any time in
              our sole discretion;
            </p>
            <p className="w-full flex flex-wrap">
              (g) we may require you to provide additional information or
              documentation before allowing you to trade certain Digital Assets;
              and
            </p>
            <p className="w-full flex flex-wrap">
              (h) we may report your trading activity to relevant authorities as
              required by applicable law.
            </p>
          </ul>
          <p>
            8.2 You acknowledge that trading in Digital Assets involves
            significant risks, including but not limited to:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) the risk of loss of some or all of your invested capital;
            </p>
            <p className="w-full flex flex-wrap">(b) price volatility risk;</p>
            <p className="w-full flex flex-wrap">(c) liquidity risk;</p>
            <p className="w-full flex flex-wrap">
              (d) technical risks related to the blockchain and smart contracts;
            </p>
            <p className="w-full flex flex-wrap">(e) regulatory risks; and</p>
            <p className="w-full flex flex-wrap">(f) cybersecurity risks.</p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            9. Third-Party Accounts
          </h2>
          <p>
            9.1 You may be offered the ability to register and establish a
            Third-Party Account with a Third-Party Services Provider. Such
            Third-Party Account shall be subject to terms and conditions and
            policies established by Third-Party Services Provider for such
            Third-Party Account (&quot;Third-Party Services Provider
            Terms&quot;).
          </p>
          <p>
            9.2 You should read the Third-Party Services Provider Terms
            carefully before opening a Third-Party Account with such Third-Party
            Services Provider. If you do not agree to the Third-Party Services
            Provider Terms, you should not register and open the Third-Party
            Account with it. All trades and other transactions conducted through
            the Third-Party Account will be subject to the Third-Party Services
            Provider Terms. In addition, you understand and agree that:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) The Company will act solely as the platform administrator and
              service provider for the Third-Party Service Provider in terms of
              the Third-Party Accounts. As such, the Company may collect your
              Personal Information and other information on behalf of the
              Third-Party Services Provider in the process of opening the
              Third-Party Account and providing the Platform for transactions
              conducted through the Third-Party Account. Such Personal
              Information will be processed by the Company in accordance with
              its Privacy Policy and will be shared with the Third-Party
              Services Provider, which will process such Personal Information in
              accordance with its own privacy policy.
            </p>
            <p className="w-full flex flex-wrap">
              (b) The Company is not offering such Third-Party Account to you
              and has no responsibility or liability for such Third-Party
              Account or any transactions conducted through the Third-Party
              Account, or for any acts or omissions of the Third-Party Services
              Provider with respect to the Third-Party Accounts, Third-Party
              Services Provider Terms, or their processing of your Personal
              Information. The Company shall not be responsible for the
              transactions conducted by you or your Authorized Individuals with
              respect to your Third-Party Account. All inquiries and questions
              regarding the trading activities or other services with respect to
              the Third-Party Accounts that you submit to us will be directed by
              the Company to Third-Party Services Provider.
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            10. Fees (CONFIRM THIS PROVISION)
          </h2>
          <p>
            10.1 There is no charge to download the App and register as a User,
            but we may charge for certain in-app purchases and other features as
            we may specify from time to time.
          </p>
          <p>
            10.2 In exchange for access to the Platform and the Services, you
            agree to pay a fee on each settled transaction initiated by you
            (such fee, a &quot;Transaction Fee&quot;). The current Transaction
            Fee may be found on the Site after you log into your Account. We
            reserve the right to change, modify or increase the Transaction Fee
            at any time and from time to time. Any such changes, modifications
            or increases will be effective upon posting such changes,
            modifications or increases on the Site. If you do not agree to the
            posted changes, modifications, or increases, you should stop using
            the Account as provided herein. Your continued use of the Account
            following the posting of the modified Transaction Fee as posted on
            the Site will constitute the acceptance of all such changes or
            revisions.
          </p>

          <p>
            10.3 Transaction Fees are paid by the trading parties in any given
            transaction. The trading parties will each be charged a fee in
            USDT/USDC or other currencies from time to time approved by us. You
            are responsible for any fees imposed by third parties in connection
            with transferring Digital Assets into your Account on the Platform.
            The Platform charges a fee to transfer Digital Assets from your
            Account.{" "}
          </p>
          <p>
            10.4 If you believe that you have been erroneously charged a
            Transaction Fee, you shall notify the Platform immediately of such
            error, along with any additional information concerning the
            transaction. If you do not raise any question or objection within
            thirty (30) days after such alleged erroneous Transaction Fee first
            appears on any Account statement, such fee will be deemed acceptable
            by you for all purposes.
          </p>
          <p>
            10.5 You may be charged transaction and other fees in connection
            with your Third-Party Account. Any such fees are specified in the
            Third-Party Services Provider Terms. We have no responsibility or
            liability for any fees or other cost or charges you may incur in
            connection with such Third-Party Account.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            11. User Access Obligations
          </h2>
          <p>
            11.1 The Company will issue a set of unique User Credentials to each
            User that is registered to use the Site and Platform. Such User
            Credentials only allow the User to access the Account. Each User
            shall promptly provide acknowledgment of receipt of such User
            Credentials to the Company.
          </p>

          <p>
            11.2 Each User acknowledges that each set of User Credentials is
            non-transferable and shall only be used by the User to whom it is
            issued. Such User Credentials shall not be disclosed to or transfer
            to any third person without written permission of the Company. We
            will never ask you, for any reason, whether by email, regular mail
            or telephone, to disclose your User Credentials. Password inquiries
            will only be conducted online and only after you have signed onto
            the Platform. We will never send you embedded links in an email
            requesting that you sign onto the Platform by clicking such a link.
            If you receive an embedded link by email, claiming to be from us or
            the Platform, you shall not open or click on the link. The email is
            not from us and is likely fraudulent.
          </p>

          <p>11.3 Each User shall:</p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) keep their User Credentials strictly confidential and not
              share them with any other person for any purpose including, but
              not limited to, initiating or executing any payment transaction
              involving the Account. Further, the User shall not disclose
              his/her User Credentials in a recognizable way to third parties on
              any device (for example, by writing down or recording the User
              Credentials without disguising them);
            </p>
            <p className="w-full flex flex-wrap">
              (b) take all reasonable efforts to secure all records relating to
              his/her User Credentials, including, but not limited to, keeping
              such records in a secure or physical location accessible or known
              only to the User and keeping such records in a place where the
              records are unlikely to be accessed by a third party;
            </p>
            <p className="w-full flex flex-wrap">
              (c) take all reasonable measures to follow security instructions
              provided by the Company and otherwise protect the security,
              prevent tampering or use by any other person of the User
              Credentials, Site or Platform, including those security measures
              prescribed in our Privacy Policy;
            </p>
            <p className="w-full flex flex-wrap">
              (d) notify the Company immediately through any channel prescribed
              by the Company in the event:
            </p>
            <ul className="pl-2 flex flex-col gap-2 w-full">
              <p className="w-full flex flex-wrap">
                (i) of loss of your User Credentials;
              </p>
              <p className="w-full flex flex-wrap">
                (ii) of your User Credentials having been disclosed to third
                parties or otherwise compromised;
              </p>
              <p className="w-full flex flex-wrap">
                (iii) that you reasonably suspect any unauthorized use of your
                User Credentials;
              </p>
            </ul>
            <p className="w-full flex flex-wrap">
              (e) create strong passwords (for example, using a mixture of
              letters, numbers and special characters, and not using easily
              accessible personal information) and strong PINs (for example, by
              not using numbers that are consecutive or basing the PIN on the
              User&apos;s contract ID, birth date, telephone number,
              identification number, or any other easily accessible personal
              information).
            </p>
          </ul>
          <p>
            11.4 Where the Platform is accessed by correct entry of User
            Credentials or through the App, the relevant User shall be deemed to
            have accessed the Platform. You shall be responsible and liable for
            all actions through such access by an Authorized Individual
            authorized to access the Platform on your behalf. The Company shall
            not be obliged in any manner to investigate or take any other step
            to verify the identity of any User or Authorized Individual. The
            Company shall not be liable for any loss that you may incur as a
            result of someone else using your User Credentials or Account,
            either with or without your knowledge. Upon receipt of notification
            under Section 11.3(d), the Company shall disable the relevant User
            Credentials and block access to the Platform or the Site as soon as
            reasonably practicable.{" "}
          </p>

          <p>
            11.5 Each User shall secure all of their devices or systems used to
            access the Platform (for example, the App), including, without
            limitation, installing and regularly updating browsers, security
            patches, antivirus, anti-malware and other relevant software in the
            devices or systems. Each User shall also comply with all
            instructions, procedures and directions relating to the Platform,
            the Site and User Credentials as notified the Company from time to
            time, including, but not limited to, the risk management and other
            measures notified at the Platform login page.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            12. Prohibited Uses
          </h2>

          <p>
            12.1 You shall use the Site or Platform solely in compliance with
            these Terms, solely for your own Account or your internal business
            purposes. You shall not sell, lease or otherwise provide access to
            the Site or Platform to any third party, nor act as a service bureau
            or otherwise use the Site or Platform on behalf of any third party.
          </p>

          <p>
            12.2 You shall not use the Site or Platform in any way, provide any
            information or content, or engage in any conduct in using the Site
            or Platform that:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) is unlawful, illegal or unauthorized;
            </p>
            <p className="w-full flex flex-wrap">
              (b) is defamatory of any other person;
            </p>
            <p className="w-full flex flex-wrap">
              (c) is obscene, sexually explicit or offensive;
            </p>
            <p className="w-full flex flex-wrap">
              (d) advertises or promotes any other product or business;
            </p>
            <p className="w-full flex flex-wrap">
              (e) is likely to harass, upset, embarrass, alarm or annoy any
              other person;
            </p>
            <p className="w-full flex flex-wrap">
              (f) is likely to disrupt the Platform in any way; or promotes
              discrimination based on race, sex, religion, nationality,
              disability, sexual orientation or age;
            </p>

            <p className="w-full flex flex-wrap">
              (g) infringes any copyright, trademark, trade secret, or other
              proprietary right of any other person;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (h) restricts or inhibits any other person from using the
              Platform, including, without limitation, by means of
              &quot;hacking&quot; or defacing any portion of the Platform;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (i) disables, damages or alters the functioning or appearance of
              the Platform;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (j) &quot;frames&quot; or &quot;mirrors&quot; any part of the
              Platform without our prior written authorization;
            </p>
            <p className="w-full flex flex-wrap">
              (k) uses any robot, spider, site search/retrieval application, or
              other manual or automatic device or process to download, retrieve,
              index, &quot;data mine&quot;, &quot;scrape&quot;,
              &quot;harvest&quot; or in any way reproduce or circumvent the
              navigational structure or presentation of the Platform or its
              contents;
            </p>
            <p className="w-full flex flex-wrap">
              (l) harvests or collects information about other Users without
              their express consent;
            </p>
            <p className="w-full flex flex-wrap">
              (m) sends unsolicited or unauthorized advertisements, spam, or
              chain letter to other Users of the Platform;
            </p>
            <p className="w-full flex flex-wrap">
              (n) except as otherwise permitted by the Company in writing, open
              multiple accounts except as otherwise explicitly permitted by the
              Platform;
            </p>
            <p className="w-full flex flex-wrap">
              (o) conduct frequent, intensive trading with or without software
              or trading tools that are unauthorized by the Platform;
            </p>
            <p className="w-full flex flex-wrap">
              (p) transmits any content which contains software viruses, or
              other harmful computer code, files or programs; or
            </p>
            <p className="w-full flex flex-wrap">
              (q) advocates, promotes or assists any violence or any unlawful
              act.
            </p>
          </ul>
          <p>
            12.3 You understand and agree that the information and services
            provided by the Platform are not provided to, and may not be used by
            or for the benefit of, any individual or entity in any jurisdiction
            where the provision or use thereof would be contrary to any
            applicable law, or where we are not authorized to provide such
            Platform or information and services. You understand and acknowledge
            that if it is determined that you have given false representations
            of your location or place of residence, the Company reserves the
            right to take any appropriate actions in compliance with this
            restriction or in compliance with the law of a relevant
            jurisdiction, including termination of any Account immediately and
            liquidating any open positions.. You understand that the Company
            reserves the right to take any appropriate actions in compliance
            with this restriction or in compliance with the law of a relevant
            jurisdiction, including termination of any Account immediately and
            liquidating any open positions. (CONFIRM THIS PROVISION)
          </p>
          <p>
            12.4 We reserve the right, but do not have the obligation, at our
            sole discretion to edit, delete, remove or block any information
            that violates these Terms.{" "}
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">13. Security</h2>
          <p>
            13.1 We may use authentication or verification technologies,
            services or measures as we deem desirable or appropriate. Such
            measures may include multi-factor authentication or use of Biometric
            Information to access the App and the Platform. There can be no
            assurance that such authentication technologies, services or
            measures will be completely secure, adequate or successful to
            prevent unauthorized access to or use of the Platform or your Long
            bridge Account or Trading Account, or hacking or identity theft.
          </p>
          <p>
            13.2 We may offer access to the App and the Platform using a mobile
            device by using Biometric Authentication. The User acknowledges that
            by enabling Biometric Authentication for the Platform, unauthorized
            third parties can gain access to the Platform without entering User
            Credential and query banking information. The User acknowledges and
            accepts the risks and obligations associated with using the Platform
            in conjunction with Biometric Authentication, and, in particular,
            also the risk of third parties querying their Trading Account
            information. By choosing to use Biometric Authentication on the
            User&apos;s mobile device, the User consents to the collection and
            use of such Biometric Information in order to provide access to App
            and the Platform in accordance with these Terms and the Privacy
            Policy. The User further is relying on the functionality provided by
            the hardware and the operating system on the mobile device. We shall
            not be liable for any malfunction, error, inaccuracy or unauthorized
            access to a User&apos;s Biometric Information.
          </p>
          <p>
            13.3 While we employ reasonable security measures to protect the
            security and confidentiality of the Platform and your Personal
            Information in accordance with applicable law, we cannot guarantee
            the security of all transmissions or any network or system on which
            your Personal Information or account or transaction information is
            stored or processed. To the extent required by law, we will notify
            you of an unauthorized access, use or disclosure of your Personal
            Information of which we become aware. In the event you receive such
            notice, you are responsible for following the instructions set forth
            in the notice, including immediately changing your User Credentials
            and other steps to prevent unauthorized access to your account or
            Personal Information.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            14. Authorized Individuals
          </h2>
          <p>
            14.1 Each User and Authorized Individual acknowledges that they have
            received and accepted these Terms. When applying for any Authorized
            Individual to receive access to the Platform and an Account on their
            behalf, the User acknowledges and represents that the Authorized
            Individual is duly authorized to (i) access and use the Platform on
            the User&apos;s behalf and, if applicable, to exercise the same
            powers conferred by the User upon the Authorized Individual in
            accordance with any underlying power of attorney to the same extent
            as is technically feasible and that services offered under the
            Platform are analogous to services that the User may utilize through
            other channels; (ii) accept any Changes to these Terms on the
            User&apos;s behalf; and (iii) apply or subscribe to any of the
            Platform services that require separate application or subscription.
          </p>

          <p>
            14.2 Each User shall procure that each Authorized Individual acting
            on their behalf is informed of and agrees to and complies with these
            Terms and, as applicable, the Third-Party Services Provider Terms.
            You shall be fully liable for all acts or omissions or
            non-compliance of your designated Authorized Individual in the
            access and use of the Platform and any transactions conducted
            through your Account.
          </p>
          <p>
            14.3 Each User fully indemnifies the Company, and its affiliated
            subsidiaries and affiliates, officer, directors, employees, agents
            and representatives against any liabilities, costs, claims, losses,
            expenses (including but not limited to legal fees) and damages
            arising out of or relating to (i) a breach of these Terms by their
            Authorized Individual; and (ii) any claim or action by their
            Authorized Individual against the Company.
          </p>
          <p>
            14.4 You represent, undertake and confirm that the you have procured
            the consent of your Authorized Individuals to the collection, use,
            transfer, disclosure and processing of the Personal Information of
            such Authorized Individuals in accordance with these Terms and the
            Privacy Policy .
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            15. Provision of Material and Information
          </h2>
          <p>
            15.1 By choosing to use the Platform, each User acknowledges that:{" "}
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) the Company is under any obligation whatsoever to accede to
              the User&apos;s request to provide Material on any products and/or
              services; and
            </p>
            <p className="w-full flex flex-wrap">
              (b) any Material, where provided, was provided for the User only
              and is not to be further distributed without the written consent
              of the Company.
            </p>
          </ul>
          <p>
            15.2 You acknowledge that neither the Company nor the Platform is
            your investment adviser or fiduciary. You further acknowledge that
            none of the Materials we provide or made available on the Platform
            constitutes our recommendation or solicitation that you enter into
            any particular transaction or that any particular transaction is
            suitable or appropriate for you.
          </p>
          <p>
            15.3 You acknowledge that we have no duty or obligation to verify,
            correct, complete or update any Material displayed on the Platform.
            Materials, including without limitation, market data, price
            quotations, news and research, may be prepared by information
            providers that are independent of us. We do not warrant that the
            Material will be accurate, complete or refreshed in a timely manner.
            You should conduct further research and analysis or consult an
            investment advisor before making investment decisions. Any use of or
            reliance on materials by you is at your own risk. We are not
            obligated to inform you of technical difficulties experienced by us
            concerning access to the Platform.
          </p>
          <p>
            15.4 Information regarding your Digital Assets balance and the
            status of the Account is available to you in electronic format for
            viewing anytime (subject to down times) at the Site. You may review
            online all transactions, including pending orders, positions,
            deposits and withdrawals, that have taken place in the previous one
            year or such other time as the Company may determine from time to
            time. You also have the right to receive a receipt, trade ticket or
            other evidence of a transaction. Nothing in the transaction history
            should be treated as a valuation. You acknowledge that errors may
            sometimes occur and such errors do not impact the actual means and
            results of a given transaction. Any transaction listed in the
            statement or other communication with you shall be deemed and
            treated as authorized and correct, approved, and confirmed by you
            unless we receive a written notice from you to the contrary within
            three calendar days from the date the communication was sent or
            posted on the Site.
          </p>
          <p>
            15.5 The content and information displayed through the Platform
            relating to products and services may not be eligible for sale or
            available to residents of certain nations or certain categories of
            investors due to regulatory restrictions.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            16. Service and Other Notifications
          </h2>
          <p>
            16.1 The use of Service Notifications involves communications
            through unsecured communications networks. You shall provide us with
            complete and accurate email address(es) or phone number(s) to allow
            us to send Service Notifications to you. To ensure that you receive
            all of the communications, you agree to keep your email address
            up-to-date and immediately notify us if there are any changes.
            Delivery of any communication to the email address on record is
            considered valid. If any email communication is returned as
            undeliverable, we retain the right to block your access to the
            Platform until you provide and confirm a new and valid email
            address. Where you have provided multiple email address(es) and
            phone number(s) to us, you shall specify your preferred contact
            details for receiving Service Notifications. Where your account is a
            joint account, you shall inform us whether Service Notifications
            should be sent to a specific account holder or to all of them.{" "}
          </p>
          <p>
            16.2 You agree to accept notifications regarding the App, Platform,
            your Account and Terms through Service Notifications. You agree that
            such Service Notifications shall constitute effective notice in lieu
            of written, mailed or other forms of notice required by applicable
            law.
          </p>
          <p>
            16.3 It is your sole responsibility to monitor the applicable email
            account or phone number without further reminders or repeat
            notifications from the Company. You shall immediately report any
            unauthorized use or access of the Platform.
          </p>
          <p>
            16.4 You release the Company from any liability for losses or
            damages resulting from the use of the Service Notifications, to the
            extent permitted by law. The Company provides no warranty or accepts
            no liability that the information provided through Service
            Notifications is up-to-date, correct or complete.
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            17. Personal Information
          </h2>
          <p>
            17.1 As part of the Platform, Personal Information of the User may
            be collected, used, transferred, disclosed or otherwise processed by
            the Company in accordance with the Privacy Policy. You should read
            the Privacy Policy carefully before registering for and using the
            Site and Platform. You consent to the collection, use and disclosure
            of your Personal Information in accordance with these Terms and the
            Privacy Policy, including without limitation, disclosure to the
            Third-Party Services Provider for purposes of providing services and
            conducting transactions in regards to the Account.{" "}
          </p>
          <p>
            17.2 You agree to provide true, accurate, current and complete
            Personal Information. You further agree to maintain and promptly
            update the Personal Information to keep it true, accurate, current
            and complete at all times during the term of this Agreement.
          </p>
          <p>
            17.3 You must promptly inform us of all changes, including, but not
            limited to, changes in the Personal Information in connection with
            the Platform. If you provide any information that is untrue,
            inaccurate, not current or incomplete, or if we or any of our
            authorized agents have reasonable grounds to suspect that such
            information is untrue, inaccurate, not current or incomplete, we
            have the right to suspend or terminate the Account and refuse any
            and all current or future use of the Platform and Site by you, as
            well as subject you to civil liability or refer you to the
            appropriate law enforcement authorities for criminal prosecution. We
            shall not be liable to make any compensation, monetary or otherwise,
            following such suspension, termination or inability for you to use
            the Platform or the Site.
          </p>
          <p>
            17.4 You shall comply with any reasonable requests by us for
            information, documents and agreements related to any transaction or
            your use of the Site or Platform. You understand that we may report
            such information to such regulatory authorities as we deem necessary
            pursuant to the Privacy Policy.
          </p>
          <p>
            17.5 Please note that we may collect information using tracking
            technologies regarding your device, such as IP address, network
            provider, mobile carrier, mobile browser type, timestamp, time zone,
            information about the speed, bearing, orientation, and altitude of a
            device, or other device-identifying information. The User consents
            to such use of tracking technologies and acknowledges that the
            information obtained, including Personal Information, may be matched
            to public or private information accessible to the Company or any
            Third-Party Services Provider. The User also consents to such
            information being shared with the Company&apos;s and Third-Party
            Services Provider&apos;s service providers for the purposes of
            providing and maintaining the tracking technologies and related
            services. We may also collect precise geolocation data from or about
            your device, which may be expressed by latitude-longitude
            coordinates obtained through GPS tools, WiFi data, cell tower
            triangulation or other techniques. Our use of such information is
            described in our Privacy Policy.
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            18. Market Makers
          </h2>
          <p>
            18.1 We may engage one or more market makers, who may also be
            affiliated with us, to act as liquidity providers on the Platform.
            You understand and agree that such market makers may be entitled to
            terms or rates that are preferential to you due to the services they
            offer.{" "}
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            20. Disclaimer and Risks of Use of Platform
          </h2>
          <p>
            20.1 The Platform and Site, including all content (including
            Third-Party Content), features and any related services are provided
            on an &quot;As Is&quot; and &quot;As Available&quot; basis at the
            User&apos;s sole risk and without any representations or warranties.
            We do not guarantee that all or any part of the Platform or the App
            will be available or accessible by the User at all times.{" "}
          </p>
          <p>
            20.2 The use of the Platform, due to the download, installation or
            use of the Site and the associated reference points with third
            parties (for example, distribution platform providers, network
            providers, device manufacturers) involves risks, in particular:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) disclosure of your Personal Information or other information
              and the existence of your relationship with the Third-Party
              Services Provider to third parties;
            </p>
            <p className="w-full flex flex-wrap">
              (b) system outages, security-related restrictions and unauthorized
              removal of use restrictions on the end device, and other
              disturbances which may make use impossible; and
            </p>
            <p className="w-full flex flex-wrap">
              (c) misuse due to manipulation by malware or unauthorized use,
              including in the event the User&apos;s device used to access the
              Site or the Platform is lost or stolen.
            </p>
          </ul>
          <p>
            20.3 We are entitled to block or disable the use of the Site on end
            devices if the security features devised by the operating system or
            manufacturer of such device on which the Site is installed have been
            modified at any time (for example, a device that has been
            &quot;jailbroken&quot;). Accordingly, we do not guarantee the
            functioning and operation of the App on end devices which have been
            modified in this way or on older end devices that no longer meet the
            technical requirements for the use of the Site or access to the
            Platform.
          </p>
          <p>
            20.4 ALL WARRANTIES, CONDITIONS OR TERMS (WHETHER EXPRESS, IMPLIED,
            STATUTORY OR OTHERWISE) INCLUDING WITHOUT LIMITATION RELATING TO
            QUALITY, MERCHANTABILITY, FITNESS FOR PURPOSE, OR UNINTERRUPTED,
            ERROR-FREE ACCESS ARE EXPRESSLY EXCLUDED FOR THE SITE AND PLATFORM
            TO THE FULLEST EXTENT PERMITTED BY LAW.
          </p>
          <p>
            20.5 No representation or warranty, express or implied, can be given
            as to the accuracy or completeness of the information provided in
            the Platform.
          </p>
          <p>
            20.6 Each User acknowledges and accepts the risks that may arise
            from Internet transactions conducted via open systems accessible to
            anyone and acknowledges that despite the encryption of data, the
            connection from the User&apos;s personal computer or electronic
            mobile device to the Platform over the Internet may be observable.
            We may also use servers and other computer hardware situated in any
            jurisdiction worldwide for the provision of any portion of the
            Platform.
          </p>
          <p>
            20.7 We exclude any and all liability for loss or damage caused by
            transmission errors, technical faults, breakdowns, business
            interruptions or illegal intrusions into transmission networks, IT
            systems/computers of the User or of any third party (including
            systems in the public domain).
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">21. Release</h2>
          <p>
            21.1 To the maximum extent permitted by applicable law, you hereby
            discharge, acquit, and otherwise release us, our parent company,
            affiliates and subsidiaries and each of their respective officers,
            directors, shareholders, members, partners, attorneys, employees,
            independent contractors, telecommunication providers, and agents
            (collectively, the &quot;Indemnified Parties&quot;), from any and
            all allegations, counts, charges, debts, causes of action, claims
            and losses, relating in any way to the use of, or activities
            relating to the use of the Site, the Platform, any Account and any
            services or Third-Party Content provided through the Site, Platform
            or any Account, including, but not limited to, claims relating to
            the following: negligence, gross negligence, intentional
            interference with contract or advantageous business relationship,
            defamation, privacy, publicity, misrepresentation, false identities,
            fraudulent acts by others, invasion of privacy, release of Personal
            Information, failed transactions, purchases or functionality of the
            Platform, unavailability of the Site, the Platform, Third-Party
            Content or any Account, their functions and any other technical
            failure that may result in inaccessibility to the Site, the
            Platform, Third-Party Content or any Account, or any claim based on
            vicarious liability for torts committed by you encountered or
            transacted with through the Site, Platform, Third-Party Content and
            any Account, including, but not limited to, fraud, computer hacking,
            theft or misuse of Personal Information, assault, battery, stalking,
            rape, cheating, perjury, manslaughter, or murder. The above list is
            intended to be illustrative only, and not exhaustive of the types or
            categories of claims released by us. This release is intended by the
            parties to be interpreted broadly in favor of us, and thus any
            ambiguity shall be interpreted in a manner providing release of the
            broadest claims. This release is intended to be a full release of
            claims, and the parties acknowledge the legally binding nature of
            this provision, and the nature of the rights given up in connection
            therewith.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            22. Indemnification and Limitation of Liability{" "}
          </h2>
          <p>
            22.1 To the maximum extent permitted by applicable law, you agree to
            defend, indemnify, and hold harmless the Indemnified Parties, from
            and against any and all claims (including third-party claims),
            actions, loss, liabilities, expenses, costs, or demands, including,
            without limitation, legal and accounting fees, directly or
            indirectly, resulting from or by reason of (i) your (or if you are
            under another person&apos;s authority, including, without
            limitation, Governmental Authorities, such other person&apos;s) use,
            misuse, or inability to use the Site, the Platform, any Account on
            the Platform, or any of the content, including Third-Party Content
            contained therein or any content or information that you provided to
            the Platform; or (ii) your breach of this these Terms or the
            Third-Party Services Provider Terms, including those documents that
            are expressly incorporated into these Terms or the Third-Party
            Services Provider Terms by reference and form a part of these Terms
            or the Third-Party Services Provider Terms.
          </p>
          <p>
            22.2 We shall notify you by email, mail, or other appropriate means,
            of any such claim or suit, and reasonably cooperate (at your
            expense) in the defense of such claim or suit. We reserve the right
            to participate in the defense of such claim or choose our own legal
            counsel, but are not obligated to do so.
          </p>
          <p>
            22.3 UNDER NO CIRCUMSTANCES AND UNDER NO THEORY OF LAW (TORT,
            CONTRACT, STRICT LIABILITY OR OTHERWISE), SHALL WE OR ANY OF THE
            INDEMNITEES BE LIABLE TO YOU OR ANY OTHER PERSON FOR ANY DAMAGES
            ARISING FROM THE USE OR MISUSE OF, OR INABILITY TO USE, THE
            PLATFORM, THE SITE, THIRD-PARTY CONTENT OR ANY ACCOUNT, REGARDLESS
            OF WHETHER SUCH DAMAGES ARE DIRECT, INDIRECT, SPECIAL, INCIDENTAL OR
            CONSEQUENTIAL DAMAGES OF ANY CHARACTER, INCLUDING DAMAGES FOR
            TRADING LOSSES, LOSS OF INFORMATION, BUSINESS INTERRUPTION OR LOST
            PROFITS, LOST SAVINGS, OR LOSS OF DATA, OR LIABILITIES UNDER ANY
            CONTRACT, NEGLIGENCE, STRICT LIABILITY, OR OTHER THEORY ARISING OUT
            OF OR RELATING IN ANY MANNER TO THE SITE, THE PLATFORM, THIRD-PARTY
            CONTENT OR ANY ACCOUNT OR FOR ANY CLAIM OR DEMAND BY ANY THIRD
            PARTY, EVEN IF WE KNEW OR HAD REASON TO KNOW OF THE POSSIBILITY OF
            SUCH DAMAGES, CLAIM OR DEMAND IF THE FOREGOING DISCLAIMER AND WAIVER
            OF LIABILITY SHOULD BE DEEMED INVALID OR INEFFECTIVE. SOME
            JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN
            WARRANTIES AND/OR LIABILITIES, SO CERTAIN OF THE ABOVE LIMITATIONS
            OR EXCLUSIONS MAY NOT APPLY TO YOU.
          </p>
          <p>
            22.4 IN NO EVENT SHALL OUR LIABILITY, REGARDLESS OF THE FORM OF
            ACTION AND DAMAGES SUFFERED BY YOU, EXCEED THE HIGHEST AGGREGATE
            FEES PAID BY YOU TO US IN CONNECTION WITH THE PLATFORM, OR THE SITE.
          </p>
          <p>
            22.5 We will not be liable for our failure to perform any
            obligations under these Terms due to events beyond our control, and
            the time provided for performing such obligations shall be extended
            by a period of time equal to the duration of such events. Events
            beyond our control include, without limitation, acts of God, war,
            riot, arson, embargoes, civil commotion, strikes, labor disputes,
            equipment failures, bank failures, virtual currency market collapse
            or fluctuations, credit or debit card transaction processing
            failures, strikes, fire, flood, earthquake, hurricanes, tropical
            storms or other natural disaster or casualty, shortages of labor or
            material, shortage of transportation, facilities, fuel, energy,
            government regulation or restriction, acts of civil or military
            authority or terrorism, fiber cuts, weather conditions, breaches or
            failures to perform by third parties, technical problems, including
            hardware and software crashes and other malfunctions, failure of the
            telecommunications or information services infrastructure, hacking,
            SPAM or failure of any computer, server or software disruptions on
            account of or caused by vandalism, theft, phone service outages,
            power outage, Internet disruptions, viruses, and mechanical, power
            or communications failures.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            23. Suspicion or Termination in Whole or in Part
          </h2>
          <p>
            23.1 Access to the Platform may be suspended or terminated in whole
            or in part at any time either by the User or by us in accordance
            with the Terms. In addition, we reserve the right at our sole
            discretion to suspend or terminate immediately and without notice
            any User&apos;s access to or use of the Site and the Platform if
            they violate any provision of these Terms or otherwise according to
            Section 23.2. Your access to the Platform will be automatically
            terminated upon termination of your Account. Sections 1, 2, 3, 6,
            10-17, and 20-26 and any claims for breach of these Terms shall
            survive such termination.
          </p>
          <p>
            23.2 We may, at any time and at our sole discretion, limit, suspend
            or terminate, or issue a warning to you regarding, the Platform or
            the Account, including terminating the Account (or certain
            functionalities thereof such as uploading, receiving, sending and/or
            withdrawing Digital Assets), inter alia, if:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              (a) we believe it is necessary or desirable to protect the
              security of the Account;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (b) if any transactions are made which we in our sole discretion
              deems to be (a) made in breach of this Agreement or in breach of
              the security requirements of the Account; or (b) suspicious,
              unauthorized or fraudulent, including without limitation in
              relation to money laundering, terrorism financing, fraud or other
              illegal activities;
            </p>
            <p className="w-full flex flex-wrap">
              (c) if we become aware or suspect that any Digital Assets or funds
              held in your Account may be associated with criminal proceeds or
              otherwise are not lawfully possessed by you;
            </p>
            <p className="w-full flex flex-wrap">
              (d) upon the insolvency, liquidation, winding up, bankruptcy,
              administration, receivership or dissolution of User, or where we
              reasonably consider that there is a threat of the same in relation
              to you;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (e) we are unable to verify or authenticate any information you
              provided;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (f) we believe, in our sole and absolute discretion, that your
              actions may cause legal liability for you, the Platform or other
              Users of the Platform;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (g) we decide to cease operations or to otherwise discontinue any
              services or options provided by the Platform, or parts thereof;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (h) there is a change in your circumstances (including a
              deterioration in or change to your financial position) which we
              consider, in our sole discretion, material to the continuation of
              the Account;
            </p>
            <p className="w-full flex flex-wrap">
              (i) we are directed as such by any Governmental Authority;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (j) we are otherwise required to do so by applicable law;{" "}
            </p>
            <p className="w-full flex flex-wrap">
              (k) there is a disruptive market event that triggers a trade halt;
              or
            </p>
            <p className="w-full flex flex-wrap">
              (l) we otherwise decide in our sole discretion that termination or
              suspension of the Account, the Platform or the Terms is necessary.
            </p>
          </ul>
          <p>
            23.3 We have no obligation to inform you of the ground or basis for
            suspending, terminating or freezing your Account or any digital
            assets in your Account or other actions we take regarding the Site,
            the Account, or the Platform.
          </p>
          <p>
            23.4 Neither the Company, the Platform nor any third party acting on
            their behalf shall be liable to you for any suspension, limitation
            or termination of your Account or your access to any part of the
            Platform in accordance with this Agreement.
          </p>
          <p>
            23.5 You shall not attempt to regain access to the Platform if your
            access is terminated by us, whether using the same or different
            username, without our prior written consent.
          </p>
          <p>
            23.6 If there is any ongoing transaction on the Account that is
            subject to the termination procedures, the Company shall have the
            right to notify your counterparty of the proposed termination.{" "}
          </p>
          <p>
            23.7 The Company maintains full custody of the assets, funds and
            user data/information which may be turned over to Governmental
            Authorities in the event of your Account&apos;s suspension or
            termination arising from fraud investigations, investigations of
            violation of law or violation of these Terms. We will not be liable
            to you, your Authorized Individuals and/or any third party for loss
            or damage suffered due to delay, transmission errors, technical
            faults or defects, breakdowns and illegal intrusion or intervention
            in the information provided and services offered, or any failures or
            delays in completing any orders or transactions using any Account.
            Similarly, we will not be liable for any loss or damage suffered due
            to delays, technical faults or interruptions in the availability of
            the Site, the Platform, or any Account (including maintenance work
            required by our systems).
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            24. Records Conclusive{" "}
          </h2>
          <p>
            24.1 The calculation and records in the Company&apos;s system in
            relation to the Platform and any Account, including, but not limited
            to, the transaction history and balance on any of your Accounts,
            will be final and conclusive and be binding on each User for all
            purposes. Each User agrees that such records are admissible in
            evidence and further undertakes to waive any rights to challenge or
            dispute the admissibility, reliability, accuracy or the authenticity
            of the contents of such records merely on the basis that such
            records were produced by or were the output of a computer system or
            are set out in electronic form.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">25. General</h2>
          <p>
            25.1 These Terms, including the Privacy Policy and other policies
            incorporated herein, constitute the entire and only agreement
            between you and the Company with respect to the subject matter of
            these Terms, and supersede any and all prior or contemporaneous
            agreements, representations, warranties and understandings, written
            or oral, with respect to the subject matter of these Terms. If any
            provision of these Terms is found to be unlawful, void or for any
            reason unenforceable, then that provision shall be deemed severable
            from these Terms and shall not affect the validity and
            enforceability of any remaining provisions. These Terms may not be
            changed, waived or modified except by the Company as provided
            herein. Neither these Terms nor any right, obligation or remedy
            hereunder is assignable, transferable, delegable or sublicensable by
            you except with our prior written consent, and any attempted
            assignment, transfer, delegation or sublicense shall be null and
            void. No waiver by any party of any breach or default hereunder
            shall be deemed to be a waiver of any preceding or subsequent breach
            or default. Any heading, caption or section title contained in these
            Terms is inserted only as a matter of convenience and in no way
            defines or explains any section or provision hereof.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm font-isemibold">
            26. Governing Law and Dispute Resolution
          </h2>
          <p>26.1 These Terms shall be governed by the laws of Nigeria.</p>
          <p>
            26.2 Any dispute arising out of or in connection with these Terms or
            the Platform, including any question regarding its existence,
            validity or termination, shall be referred to and finally resolved
            by arbitration in Nigeria in accordance with the Arbitration Rules
            of the Nigeria Arbitration Centre for the time being in force, which
            rules are deemed to be incorporated by reference in this clause. The
            Tribunal shall consist of one (1) arbitrator. The language of the
            arbitration shall be English. The seat of the arbitration shall be
            Nigeria. Any award is final and may be enforced in any court of
            competent jurisdiction. The parties shall duly and punctually
            perform their obligations hereunder
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsCondition;
