import css from './Feedback.module.css';

const Feedback = ({ feedback, totalFeedback, positiveFeedback }) => {
  return (
    <div className={css.feedback}>
      <p className={css.textFeedback}>Good: {feedback.good}</p>
      <p className={css.textFeedback}>Neutral: {feedback.neutral}</p>
      <p className={css.textFeedback}>Bad: {feedback.bad}</p>
      <p className={css.textFeedback}>Total: {totalFeedback}</p>
      <p className={css.textFeedback}>Positive: {positiveFeedback}%</p>
    </div>
  );
};

export default Feedback;
