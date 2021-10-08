import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className='hpmepage'>
      <div className='homepage-instructions'>
        <p>Instructions</p>
        <ol>
          <li>
            You are allowed to submit only once, make sure that you have
            correctly attempted all the questions before submission.
          </li>
          <li>
            Make sure you clicked on submit button to successfully complete the
            test.
          </li>
          <li>There are 5 questions.</li>
        </ol>
      </div>
      <Link to={'/Questions'}>
        <button className='homepage-button'>
          <p>Start Exam</p>
        </button>
      </Link>
    </div>
  );
}
