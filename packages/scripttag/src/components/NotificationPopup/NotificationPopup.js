import React from 'react';
import PropTypes from 'prop-types';
import toTimeAgo from '../../helpers/utils/toTimeAgo';
import './NoticationPopup.scss';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = new Date().toISOString(),
  productImage = 'https://dotilo.com/image/catalog/coupon/aotron/den.jpg',
  truncateProductName = false,
  hideTimeAgo = false,
  position = 'bottom-left',
  displayDuration
}) => {
  const [fade, setFade] = React.useState(false);
  React.useEffect(() => {
    setFade(true);
    const timeOut = setTimeout(() => {
      setFade(false);
    }, (displayDuration - 0.5) * 1000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <div className={`Avava-SP__Wrapper animated ${fade ? 'fadeInUp' : ''} ${position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncateProductName ? 'truncate' : ''}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? null : toTimeAgo(new Date(timestamp))}
                <span className="uni-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path
                      opacity="1"
                      fill="#1E3050"
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    />
                  </svg>
                  <div>by Avada</div>
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div
        className="close"
        onClick={() => {
          document.querySelector('#Avada-SalePop').remove();
        }}
      >
        <div>x</div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  productImage: PropTypes.string,
  options: PropTypes.object,
  truncateProductName: PropTypes.bool,
  hideTimeAgo: PropTypes.bool,
  position: PropTypes.string,
  displayDuration: PropTypes.number
};
export default NotificationPopup;
