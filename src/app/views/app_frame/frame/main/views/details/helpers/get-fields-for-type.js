import { includes, keys, map } from 'ramda'

const printIntern = [
  { label: 'Mobile', code: 'mobile' },
  { label: 'Education Provider', code: 'assoc_ep' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Student Id', code: 'student_id' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Rating', code: 'rating', type: 'rating' },
  { label: 'Transport Options', code: 'transport_options' },
  { label: 'Region', code: 'region' },
  { label: 'Next Scheduled Interview', code: 'next_interview' },
  { label: 'Map View', code: 'address_full', type: 'street_view' },
]

const printBeg = [
  { label: 'Host Company', code: 'assoc_hc' },
  { label: 'Host Company Rep', code: 'assoc_hcr' },
  { label: 'Intern Supervisor', code: 'assoc_supervisor' },
  { label: 'Internship Address', code: 'address_full' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Start Date', code: 'start_date' },
  { label: 'Days Per Week', code: 'days_per_week' },
  { label: 'Duration', code: 'internship_duration_stripped' },
  { label: 'Number of Interns', code: 'assoc_num_interns' },
  { label: 'Video Presentation of Internship Opportunity', code: 'loom_url', type: 'video' },
  { label: 'Map View', code: 'address_full', type: 'street_view' },
]

const printCpy = [
  { label: 'ABN', code: 'abn' },
  { label: 'Legal Name', code: 'legal_name' },
  { label: 'Company Phone', code: 'mobile' },
  { label: 'Decription', code: 'company_description' },
  { label: 'Website', code: 'company_website_url', type: 'url' },
  { label: 'Map View', code: 'address_full', type: 'street_view' },
]

const printHcr = [
  { label: 'Company', code: 'assoc_hc' },
  { label: 'Job Title', code: 'job_title' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Linkedin', code: 'linkedin_url', type: 'url' },
]

const printEp = [
  { label: 'ABN', code: 'abn' },
  { label: 'Legal Name', code: 'legal_name' },
  { label: 'Provider ID', code: 'provider_id' },
  { label: 'Phone', code: 'mobile' },
  { label: 'Address', code: 'address_full' },
  { label: 'Description', code: 'company_description' },
  { label: 'Website', code: 'company_website_url', type: 'url' },
]

const printEpr = [
  { label: 'Education Provider', code: 'education_provider' },
  { label: 'Job Title', code: 'job_title' },
  { label: 'Department', code: 'department' },
  { label: 'Email', code: 'email' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Linkedin', code: 'linkedin_url' },
]

const printApp = [
  { label: 'Student Id', code: 'student_id' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Education Provider', code: 'education_provider' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Email', code: 'email' },
]

const printAgreement = [
  { label: 'Agreement', code: 'agreement_html', type: 'html' },
  { label: 'Intern Signature', code: 'intern_agreement_signature', type: 'signature' },
]

const getFieldsForType = (detailView, print) =>
  map(({ label, code, type }) => ({ type, valueString: print(code), attributeName: label }))(
    includes('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView))
      ? printAgreement
      : includes('PRI_IS_INTERN', keys(detailView))
        ? printIntern
        : includes('PRI_IS_INTERNSHIP', keys(detailView))
          ? printBeg
          : includes('PRI_IS_HOST_CPY_REP', keys(detailView)) ||
            includes('PRI_IS_RP_REP', keys(detailView))
            ? printHcr
            : includes('PRI_IS_HOST_CPY', keys(detailView)) ||
              includes('PRI_IS_RP', keys(detailView))
              ? printCpy
              : includes('PRI_IS_EDU_PROVIDER', keys(detailView))
                ? printEp
                : includes('PRI_IS_EDU_PRO_REP', keys(detailView))
                  ? printEpr
                  : includes('PRI_COMPASS', keys(detailView))
                    ? printApp
                    : [],
  )

export default getFieldsForType
