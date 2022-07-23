import './AlgoIcon.scss';
import algoLogo from '../../../assets/images/algo-logo.png';

function AlgoIcon(): JSX.Element {

  return (
      <img src={algoLogo} className="algo-icon" alt="algo-icon"/>
  );
}

export default AlgoIcon;
