
const tagAbbreviation = tag =>
  tag === 'tag_business_development_activity'
    ? 'Bus Dev'
    : tag === 'tag_intern_placement_activity'
      ? 'Placement'
      : tag === 'tag_interview_activity_and_feedback'
        ? 'Interview'
        : tag === 'tag_internship_progress_activity'
          ? 'Internship'
          : tag === 'tag_post_internship_follow_up'
            ? 'Post Internship'
            : 'N/A'

export default tagAbbreviation
