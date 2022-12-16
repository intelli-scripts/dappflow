import './AlgoIcon.scss';
import algoLogo from '../../../../assets/images/algo-logo.png';

function AlgoIcon(props): JSX.Element {

  let {width} = props;
  if (!width) {
    width = 15;
  }
  return (
      <img src={algoLogo} className="algo-icon" alt="algo-icon" style={{width: width + 'px'}}/>
  );
}

export default AlgoIcon;
