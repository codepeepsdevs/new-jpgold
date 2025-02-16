"use client";
import { motion } from "framer-motion";

const Disclaimer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 sm:py-20 w-full mx-auto overflow-hidden text-black dark:text-white">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, type: "tween" }}
        className="container flex flex-col items-start justify-start flex-wrap gap-8"
      >
        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Disclaimer
          </h2>
          <p>Last updated: August 06, 2022</p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Interpretation and Definitions
          </h2>
          <h3 className="text-2xl font-medium">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="text-2xl font-medium">Definitions</h3>
          <p>For the purposes of this Disclaimer:</p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              <b className="pr-1">Company</b> (referred to as either &ldquo;the
              Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or
              &ldquo;Our&rdquo; in this Disclaimer) refers to JaPaul Group,
              https://jpgoldcoin.app/.
            </p>
            <p className="w-full flex flex-wrap">
              <b className="pr-1">Service </b> refers to the Website.
            </p>
            <p className="w-full flex flex-wrap">
              <b className="pr-1">You</b> means the individual accessing the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </p>
            <p className="w-full flex flex-wrap">
              <b className="pr-1">Website</b> refers to JP Gold NFT, accessible
              from{" "}
              <a
                href="https://jpgoldcoin.app"
                target="_blank"
                className="pl-1 no-underline text-[#E9981F] font-medium"
              >
                https://jpgoldcoin.app
              </a>
            </p>
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Disclaimer
          </h2>
          <p>
            The information contained on the Service is for general information
            purposes only.
          </p>
          <p>
            The Company assumes no responsibility for errors or omissions in the
            contents of the Service.
          </p>
          <p>
            In no event shall the Company be liable for any special, direct,
            indirect, consequential, or incidental damages or any damages
            whatsoever, whether in an action of contract, negligence or other
            tort, arising out of or in connection with the use of the Service or
            the contents of the Service. The Company reserves the right to make
            additions, deletions, or modifications to the contents on the
            Service at any time without prior notice. This Disclaimer has been
            created with the help of the{" "}
            <a
              href="https://www.privacypolicies.com/disclaimer-generator/"
              target="_blank"
              className="no-underline text-[#E9981F] font-medium"
            >
              Disclaimer Generator
            </a>
            .
          </p>
          <p>
            The Company does not warrant that the Service is free of viruses or
            other harmful components.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            External Links Disclaimer
          </h2>
          <p>
            The Service may contain links to external websites that are not
            provided or maintained by or in any way affiliated with the Company.
          </p>
          <p>
            Please note that the Company does not guarantee the accuracy,
            relevance, timeliness, or completeness of any information on these
            external websites.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Errors and Omissions Disclaimer
          </h2>
          <p>
            The information given by the Service is for general guidance on
            matters of interest only. Even if the Company takes every precaution
            to insure that the content of the Service is both current and
            accurate, errors can occur. Plus, given the changing nature of laws,
            rules and regulations, there may be delays, omissions or
            inaccuracies in the information contained on the Service.
          </p>
          <p>
            The Company is not responsible for any errors or omissions, or for
            the results obtained from the use of this information.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Fair Use Disclaimer
          </h2>
          <p>
            The Company may use copyrighted material which has not always been
            specifically authorized by the copyright owner. The Company is
            making such material available for criticism, comment, news
            reporting, teaching, scholarship, or research.
          </p>
          <p>
            The Company believes this constitutes a &ldquo;fair use&rdquo; of
            any such copyrighted material as provided for in section 107 of the
            United States Copyright law.
          </p>
          <p>
            If You wish to use copyrighted material from the Service for your
            own purposes that go beyond fair use, You must obtain permission
            from the copyright owner.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Views Expressed Disclaimer
          </h2>
          <p>
            The Service may contain views and opinions which are those of the
            authors and do not necessarily reflect the official policy or
            position of any other author, agency, organization, employer or
            company, including the Company.
          </p>
          <p>
            Comments published by users are their sole responsibility and the
            users will take full responsibility, liability and blame for any
            libel or litigation that results from something written in or as a
            direct result of something written in a comment. The Company is not
            liable for any comment published by users and reserves the right to
            delete any comment for any reason whatsoever.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            No Responsibility Disclaimer
          </h2>
          <p>
            The information on the Service is provided with the understanding
            that the Company is not herein engaged in rendering legal,
            accounting, tax, or other professional advice and services. As such,
            it should not be used as a substitute for consultation with
            professional accounting, tax, legal or other competent advisers.
          </p>
          <p>
            In no event shall the Company or its suppliers be liable for any
            special, incidental, indirect, or consequential damages whatsoever
            arising out of or in connection with your access or use or inability
            to access or use the Service.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            &ldquo;Use at Your Own Risk&rdquo; Disclaimer
          </h2>
          <p>
            All information in the Service is provided &ldquo;as is&rdquo;, with
            no guarantee of completeness, accuracy, timeliness or of the results
            obtained from the use of this information, and without warranty of
            any kind, express or implied, including, but not limited to
            warranties of performance, merchantability and fitness for a
            particular purpose.
          </p>
          <p>
            The Company will not be liable to You or anyone else for any
            decision made or action taken in reliance on the information given
            by the Service or for any consequential, special or similar damages,
            even if advised of the possibility of such damages.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-4 text-left">
          <h2 className="text-left text-2xl sm:text-3xl font-isemibold">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Disclaimer, You can contact Us:
          </p>
          <ul className="pl-2 flex flex-col gap-2 w-full">
            <p className="w-full flex flex-wrap">
              By visiting this page on our website:{" "}
              <a
                href="https://jpgoldcoin.app/contact-us"
                target="_blank"
                className="no-underline text-[#E9981F] font-medium"
              >
                {" "}
                https://jpgoldcoin.app/contact-us
              </a>
            </p>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
