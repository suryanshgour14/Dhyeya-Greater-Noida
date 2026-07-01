"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Faq {
  q: string;
  a: string;
}

interface Category {
  title: string;
  faqs: Faq[];
}

const FAQ_DATA: Category[] = [
  {
    title: "Annual Calendar & Examination Notice",
    faqs: [
      {
        q: "What is the UPSC's Annual Programme (Calendar) of Examinations/RTs?",
        a: "The UPSC publishes an Annual Programme (Calendar) of all the Structured Examinations/RTs conducted by it at least 6 months in advance for the Examinations/RTs to be conducted during the next calendar year. The Programme is uploaded on the UPSC's website as also published in the leading newspapers of the country. The date of issue of Examination Notice for each Examination is also mentioned in this Annual Programme.",
      },
      {
        q: "When is the Examination Notice issued?",
        a: "UPSC Examination Notices encapsulate the Rules of Examinations notified by the Government. Examination Notices of all the Structured Examinations are uploaded on the Commission's website around 3 months before the date of Examination. Examination Notices (indicative) are also published in the Employment News/Rozgar Samachar.",
      },
      {
        q: "How to apply for Examinations conducted by the UPSC?",
        a: "UPSC invites online application only for all its examinations on https://upsconline.nic.in. Detailed instruction for filling up of applications is available on the webpage and in sections of the application which applicants are requested to go through carefully before filling up the form.",
      },
      {
        q: "How much time is given to the candidates for applying online?",
        a: "Time for applying online is clearly mentioned in the Examination Notice.",
      },
    ],
  },
  {
    title: "Registration Process",
    faqs: [
      {
        q: "How do I register on the UPSC portal?",
        a: "Visit the official UPSC Online Application Portal (https://upsconline.nic.in). Go on the Home page and scroll down to 'Account Creation' for new Candidates and Register and Verify your e-mail ID and Mobile number. Fill in the required personal details such as email ID, and mobile number. Create a password and submit. Candidates are required to read the Instructions on home page carefully before filling up the form.",
      },
      {
        q: "How can I log in after completing the account creation process?",
        a: "After completing the account creation process, you can log in using your registered email ID, password, and the Captcha code displayed on the login page. You can also log in using the registered mobile number and OTP and the Captcha code displayed on the login page. After Universal Registration, you can also log in using your Universal Registration Number (URN) and password and the Captcha code displayed on the login page.",
      },
      {
        q: "What should I do if I forget my password?",
        a: "To reset your password, go to the login page and select the 'Forgot Password' option. Provide your registered email address or mobile number, and complete the Captcha verification. An OTP (One-Time Password) will be sent to your registered mobile number. Enter the OTP to validate your request. Once the OTP is successfully validated, you will be prompted to create a new password.",
      },
    ],
  },
  {
    title: "Common Application Form",
    faqs: [
      {
        q: "What steps should I follow after logging in to apply for the examination?",
        a: "After logging in, you must complete the Universal Registration and Common Application Form. Only after filling out the form in its entirety will you be able to proceed to the Apply for Examination/Recruitment section.",
      },
      {
        q: "How should I fill out the Common Application Form?",
        a: "Navigate through each module of the Common Application Form one by one and complete them as per the provided 'Instructions'. Ensure all fields are filled accurately before proceeding to the next module.",
      },
      {
        q: "What information is required during profile creation?",
        a: "You may need to provide: Personal Information (Name, date of birth, gender, and Nationality), Contact Information (Email address, mobile number, and residential address), Educational Qualifications, Work Experience (if applicable), and Other Documents (Scanned copies of documents like ID proof, photographs, etc.).",
      },
      {
        q: "Can I edit my Aadhaar profile or 10th Board profile after final submission?",
        a: "No, once you have made the final submission, the Aadhaar profile, 10th Board profile, and Candidate Identity profile cannot be unlocked or edited. Please review all details carefully before submitting.",
      },
      {
        q: "Can I register multiple accounts using the same email or mobile number?",
        a: "No, each email and mobile number can be linked only to one user account. The candidate must be in possession of their account particulars always.",
      },
      {
        q: "What browsers are compatible with the UPSC portal?",
        a: "The portal is best viewed and used on the latest versions of popular browsers such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari. Ensure your browser is updated for a seamless experience.",
      },
      {
        q: "What should I do if I have changed my Name after Matriculation / 10th Class?",
        a: "In the 'Identity Profile' option during generation of URN, please select 'No' against the question 'Is the above name same as the name printed on the 10th class/Matriculation/Equivalent Board Examination Certificate issued by the Examination board?' Thereafter, enter your name as printed on the 10th class certificate and upload the gazette notification for change of name.",
      },
      {
        q: "What is URN?",
        a: "URN is the Universal Registration Number which is generated after filling the Personal Details which once created forms the permanent record of the applicant using which he/she can fill all future applications of the Commission.",
      },
      {
        q: "What details should I retain after successful submission of my form?",
        a: "The Account Creation details and CAF details including mobile number, email ID, password, URN number are permanent record and will be required every time the candidates fill any application. These may be retained and carefully preserved.",
      },
    ],
  },
  {
    title: "Fee & Payment",
    faqs: [
      {
        q: "What is the mode of payment of fee for UPSC examinations?",
        a: "All the candidates (Except Female/SC/ST/Persons with Benchmark Disability Candidates who are exempted from payment of fee) are required to pay the prescribed fee by any of the following online modes only: Net Banking facility of any bank, or Credit/Debit Card, or UPI Payment.",
      },
      {
        q: "What is TID or Reference ID against the payment?",
        a: "TID is Transaction ID (Payment Reference ID), which is given by the State Bank of India when the applicant deposits his/her fee. It is automatically generated when Internet Banking or credit/debit card mode is used for making the fee payment.",
      },
      {
        q: "What if the payment fails?",
        a: "In case your payment failed, please visit the Payment Page to verify the payment status (Double Verification). If the payment status remains unsuccessful even after this, please retry the payment or contact your bank / UPSC Helpdesk for assistance. Make sure to complete the payment before the deadline to avoid any inconvenience.",
      },
      {
        q: "Which categories of candidates are exempted from payment of examination fee?",
        a: "Women candidates, Persons with Benchmark Disabilities (PwBD) candidates and candidates belonging to Scheduled Caste/Scheduled Tribe categories are exempted from payment of examination Fee for any of the examinations conducted by the Commission. Additionally for NDA, wards of NCO/JCO and Sainik School Candidates are exempted from payment of fee.",
      },
    ],
  },
  {
    title: "Reservation & Relaxation Benefits",
    faqs: [
      {
        q: "What precautions must be taken by candidates for claiming community reservation?",
        a: "Candidates seeking reservation/relaxation benefits available for Scheduled Caste/Scheduled Tribes/Other Backward Classes/Economically Weaker Sections/Persons with Benchmark Disabilities/Ex-servicemen must ensure that they are entitled to such reservation/relaxation in accordance with the eligibility prescribed in the Examination Rules/Notice. They should also be in possession of all the requisite certificates in the prescribed format before applying for the examination, and in any case, not later than the closing date for receipt of applications.",
      },
      {
        q: "Can a candidate request to change his/her category from non-PwBD to PwBD?",
        a: "In case of a candidate unfortunately becoming physically disabled during the course of the examination process, the candidate should produce valid document showing him/her acquiring a disability to the extent of 40% or more as mentioned in the relevant rules to enable him/her to get the benefits of PwBD reservation.",
      },
      {
        q: "What action is taken if a candidate submits false information or uses unfair means?",
        a: "A candidate found to be furnishing false information to the Commission or suppressing information, adopting various unfair means in the Examination like impersonation, cheating, etc., is liable to be disqualified and/or debarred from the examinations/selections of the UPSC, for a specified period.",
      },
    ],
  },
  {
    title: "Admit Card & Exam Centre",
    faqs: [
      {
        q: "Are the exam centres the same for Prelims and Mains?",
        a: "No, separate columns are to be filled for opting centres for Prelims and Mains exam.",
      },
      {
        q: "What is the procedure for allotment of Roll Numbers, Centre and Venues?",
        a: "Allotment of Roll Numbers and Venues to the eligible candidates is carried out through computer in a random manner without manual intervention. The Commission makes all efforts to allot the candidate the Centre of his/her choice, which is done on the 'first-apply-first allot' basis. Once the capacity of a particular Centre is exhausted, the same shall not be available to the applicants. It is thus advised to apply early for getting the choice Centre.",
      },
      {
        q: "When are the e-Admit Cards issued?",
        a: "The eligible candidates are issued e-Admit Cards on the last working day of the previous week before the date of the examination. The eAdmit Cards are made available on the UPSC website (https://upsconline.nic.in) for downloading by the candidates. The Admit Card is not sent by post. If a candidate is not able to download his/her e-Admit Card around three (03) days before the commencement of the examination, he/she should immediately contact the Commission's helpline at 011-24041001.",
      },
      {
        q: "Are requests for change of Centre/Venue accepted?",
        a: "No request for change of Centre/Venue is accepted from any candidate by the Commission.",
      },
      {
        q: "Can a candidate appear at a Centre/Venue other than what is mentioned in the e-Admit Card?",
        a: "No candidate is allowed to appear at a Centre/Venue other than the Centre/Venue mentioned by the Commission in his/her e-Admit Card. If a candidate appears at such a Centre/Venue (except by a Court/CAT order), the papers of that candidate shall not be evaluated and his/her candidature will be liable for cancellation.",
      },
      {
        q: "Is a copy of e-Admit Card in my mobile phone valid for entry?",
        a: "As mobile phones are not allowed inside the Venue, the candidates are required to carry print-out of the e-Admit Cards with a submitted photo ID, without which no candidate will be allowed to enter inside the Examination Venue.",
      },
      {
        q: "What are the timing for reporting at the Examination Venue?",
        a: "The entry into the Examination Venue is closed 30 minutes before commencement of the Examination Session. For example, if the Forenoon Session starts at 09:30 A.M., the entry inside the Examination Venue shall be closed sharp at 09:00 A.M. Candidates are advised to reach the Venue well in time.",
      },
      {
        q: "What items are banned at the Examination Venues?",
        a: "Candidate should not be in possession of or using any mobile phone (even in switched off mode), pager or any electronic equipment or programmable device or storage media like pen drive, smart watches, cameras, Bluetooth devices, or any other communication device. Candidates are not allowed to enter the examination premises with any bag, baggage, luggage, valuables/costly items, books, etc. Use of normal or simple wrist watches is allowed, but smart watches are strictly prohibited.",
      },
    ],
  },
  {
    title: "Civil Services (Preliminary) Examination",
    faqs: [
      {
        q: "What is the structure of the Civil Services Examination?",
        a: "The Civil Services Examination (CSE) comprises of two successive stages: the Civil Services (Preliminary) Examination (CSP) and the Civil Services (Main) Examination (Written and Interview).",
      },
      {
        q: "What is the Civil Services (Preliminary) Examination?",
        a: "UPSC conducts Preliminary Examination of the Civil Services Examination for recruitment to the Indian Administrative Service (IAS), Indian Foreign Service (IFS), Indian Police Service (IPS) and other Central Services and posts. This Examination is meant to serve as a screening test only; the marks obtained in the Preliminary Examination are not counted for determining the final order of merit.",
      },
      {
        q: "What are the number of attempts available for the Civil Services Examination?",
        a: "General/EWS: 6 attempts. SC/ST: Unlimited. OBC: 9 attempts. PwBD: 9 attempts for General/EWS/OBC; Unlimited for SC/ST.",
      },
      {
        q: "How is an 'attempt' counted in the Civil Services Examination?",
        a: "An attempt at the Preliminary Examination is considered an attempt at the Civil Services Examination if a candidate actually appears in any one paper in the Preliminary Examination. Notwithstanding the disqualification/cancellation of candidature, the fact of appearance of the candidate at the Preliminary Examination is counted as an attempt.",
      },
      {
        q: "If a candidate applied but did not appear at any paper in Prelims, will it be counted as an attempt?",
        a: "No, an attempt is counted only if a candidate has appeared in at least one paper of the Civil Services (Preliminary) Examination.",
      },
      {
        q: "What is the scheme of the Civil Services (Preliminary) Examination?",
        a: "The Examination is comprised of two compulsory papers of 200 marks each. Both the question papers are of objective type (multiple choice questions). The question papers are set in Hindi and English. Each paper is of two hours duration. Details of the syllabi are provided in the Examination Notice and Rules notified by the Government.",
      },
      {
        q: "Is the General Studies Paper-II of qualifying nature? What are the minimum qualifying marks?",
        a: "Yes, the General Studies Paper-II (CSAT) is of qualifying nature. The minimum qualifying standard in this Paper is at present 33%.",
      },
      {
        q: "Is there any negative marking at the Civil Services (Preliminary) Examination?",
        a: "Yes, there is penalty (negative marking) for wrong answers. For each question for which a wrong answer has been given by the candidate, one-third (1/3rd) of the marks assigned to that question is deducted as penalty. If a candidate gives more than one answer, it is treated as a wrong answer. If the answer bubble is left blank, there will be no penalty for that question.",
      },
      {
        q: "What is the prescribed minimum educational qualification for Civil Services Examination?",
        a: "The candidate must hold a degree of any of Universities incorporated by an Act of the Central or State Legislature in India or any other educational institution established by an Act of Parliament or declared to be deemed as a University under Section-3 of the University Grants Commission Act, 1956, or possess an equivalent qualification.",
      },
      {
        q: "Whether a candidate already allocated to any service through CSE 2025 is eligible for CSE 2026?",
        a: "If a candidate is already allotted to IAS or IFS they are not eligible. Candidates allotted IPS or any of the group A services through CSE 2025 or earlier CSEs, can appear (if otherwise eligible) in any of the two CSEs i.e. CSE 2026 or CSE 2027. However, there is no such bar on those allocated to any of the Group B services on the basis of earlier CSEs.",
      },
    ],
  },
  {
    title: "Civil Services (Main) Examination",
    faqs: [
      {
        q: "Can a candidate choose an optional subject not studied at graduate/post graduate level?",
        a: "Yes.",
      },
      {
        q: "Which is the language/medium of question papers in CS Mains?",
        a: "The question papers (other than the literature of language papers) are set in Hindi and English.",
      },
      {
        q: "Can a candidate write different papers of CS Mains in different languages?",
        a: "No, the Candidates have the option to write their answers either in English or in any one of the Eighth Schedule languages (except the Qualifying Language papers Paper-A and Paper-B), which they have indicated at the time of filling up their online application form for the Civil Services (Preliminary) Examination.",
      },
      {
        q: "What is the duration of each paper in CS Mains?",
        a: "The question papers for the examination are of conventional (essay) type. Each paper is of three hours duration.",
      },
      {
        q: "Can a candidate write CS Mains in English and take the interview in Hindi?",
        a: "The candidates, opting for Indian Language medium for the written part of the Civil Services (Main) Examination may choose either the same Indian Language or English or Hindi as the medium for the interview. The candidates, opting to write in English, may choose either English or Hindi or any other Indian Language opted by them for the compulsory Indian Language Paper, as the medium for interview.",
      },
      {
        q: "What are the minimum qualifying marks for the compulsory language Papers?",
        a: "The minimum qualifying standards in each of the two Qualifying Papers (English and Indian Languages) is at present 25%.",
      },
      {
        q: "Is the Indian Language Paper compulsory for candidates from North-Eastern states?",
        a: "The Paper A on Indian Language is not compulsory for candidates hailing from the States of Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland and Sikkim. In the Online Application, if a candidate hails from these North-Eastern States, the option for Indian Language will automatically be disabled.",
      },
      {
        q: "What marks are reckoned for merit ranking in CS Mains?",
        a: "Marks obtained by the candidates in Papers I-VII only will be counted for merit ranking (of those candidates who obtain the specified minimum marks in the qualifying papers). However, the Commission has the discretion to fix qualifying marks in any or all of these papers.",
      },
    ],
  },
  {
    title: "Evaluation & Other Important Issues",
    faqs: [
      {
        q: "What is the Question Paper Representation Portal (QPRep)?",
        a: "For each examination, a time frame of 7 days (from the next day of the Examination Date to 6:00 p.m. of the 7th day) is fixed for the candidates to make representations to the Commission on the questions asked. No representation shall be accepted after this window of 7 days is over. Such representation must be submitted through the 'Online Question Paper Representation Portal (QPRep)' only by accessing http://upsconline.nic.in/miscellaneous/QPRep/.",
      },
      {
        q: "How are the answer books sent for evaluation — by Roll Number or Examination Centre?",
        a: "Mixing of the answer books received from different Venues of all the Centres is done before sending them for evaluation. Computer-based randomized fictitious code number is given to each answer book before evaluation.",
      },
      {
        q: "Is it likely that my evaluation suffers because of a 'strict' examiner?",
        a: "To achieve uniformity in evaluation, the Commission arranges a meeting of the Head Examiner with the Additional Examiners after the Examination. They discuss thoroughly the question paper and decide the standard of evaluation. The Head Examiner also conducts a sample survey of answer books of each Additional Examiner and may carry out upward/downward moderation to ensure maximum possible degree of uniformity in the evaluation process.",
      },
      {
        q: "Can I know the 'question-wise' marks awarded to me for a paper?",
        a: "No. The evaluation process does not end after initial evaluation. Moderation, wherever applied, is on the total award and not on question-wise basis. Therefore, neither 'raw marks' nor 'question-wise marks' subsist after the evaluation process is complete. What subsists is the candidate's total score in a paper, which is normally made available to the candidate on the Commission's website through a query-based application software.",
      },
      {
        q: "If the overall marks of two or more candidates are equal, how is relative merit decided?",
        a: "All tie cases shall be resolved in accordance with the tie breaking principles approved by the Commission from time to time.",
      },
      {
        q: "Is it possible that evaluation could be affected by knowledge of a candidate's identity?",
        a: "No. Before evaluation, the Roll No. written on every answer book is detached and computer-based randomized fictitious code number is given. At no stage of the evaluation process is the actual Roll Number/identity of the candidate made known to any of the Examiners/officials associated in the process.",
      },
      {
        q: "What should I do if my name in Government documents is different from the given name?",
        a: "The Commission does not restrict the candidate from filling the application form for the said reason. If there is any mismatch in the given name and name mentioned in matriculation certificate, supporting document may be sought from the candidate at appropriate stage. If the candidate has changed his/her name, he/she may submit necessary Gazette notification along with the application form.",
      },
      {
        q: "What is the Disclosure Scheme?",
        a: "This Scheme discloses the scores and other details of the non-recommended candidates. It covers non-recommended willing candidates who appeared at the Interview/SSB Stage. Details of such candidates are disclosed at the Commission's Website on a secure portal which can be accessed by companies, PSUs and autonomous organisations registered on the portal. This information remains available for one year from the date of disclosure and only covers candidates who give their consent in the online application form.",
      },
    ],
  },
];

function FaqItem({ faq, searchQuery }: { faq: Faq; searchQuery: string }) {
  const [open, setOpen] = useState(false);

  const highlight = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-blue-50/40"
      >
        <span className="text-sm font-semibold leading-snug text-slate-800">
          {highlight(faq.q)}
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-180 text-brand-blue"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
              {highlight(faq.a)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqsClient() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_DATA;
    return FAQ_DATA.map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.faqs.length > 0);
  }, [query]);

  const totalResults = filtered.reduce((n, c) => n + c.faqs.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
            UPSC · Examination Branch
          </span>
          <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/65">
            Official UPSC FAQs covering registration, application, exam process, evaluation, and reservation policies.
          </p>

          {/* Search bar */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any FAQ…"
                className="w-full rounded-2xl border border-white/10 bg-white/95 py-3.5 pl-11 pr-11 text-sm text-slate-800 shadow-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {query && (
              <p className="mt-2 text-xs text-white/60">
                {totalResults === 0
                  ? "No results found"
                  : `${totalResults} result${totalResults !== 1 ? "s" : ""} across ${filtered.length} categor${filtered.length !== 1 ? "ies" : "y"}`}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="container mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Search className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            <p className="text-lg font-semibold">No FAQs match your search.</p>
            <p className="mt-1 text-sm">Try different keywords or clear the search.</p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {filtered.map((cat) => (
              <div
                key={cat.title}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="border-b border-brand-blue/10 bg-brand-blue/5 px-5 py-3.5">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                    {cat.title}
                  </h2>
                </div>
                <div>
                  {cat.faqs.map((faq, i) => (
                    <FaqItem key={i} faq={faq} searchQuery={query.trim()} />
                  ))}
                </div>
              </div>
            ))}

            <p className="pt-4 text-center text-xs text-slate-400">
              Source: UPSC Examination Branch — Official FAQs &nbsp;|&nbsp; For queries contact upscsoap@nic.in
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
