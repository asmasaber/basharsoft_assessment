import PropTypes from 'prop-types';

const If = ({ condition, children }) => condition ? children : null;

If.propTypes = {
  condition: PropTypes.any,
};

If.defaultProps = {
  condition: false,
};

export default If;