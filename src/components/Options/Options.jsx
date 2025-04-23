import css from './Options.module.css';

const Options = ({ updateFeedback, totalFeedback }) => {
  return (
    <div className={css.options}>
      <button className={css.btn} onClick={() => updateFeedback('good')}>
        Good
      </button>
      <button className={css.btn} onClick={() => updateFeedback('neutral')}>
        Neutral
      </button>
      <button className={css.btn} onClick={() => updateFeedback('bad')}>
        Bad
      </button>
      {totalFeedback > 0 && (
        <button className={css.btn} onClick={() => updateFeedback('reset')}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
