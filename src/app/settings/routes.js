import commitment from './Commitment/routes';
import feedefault from './Feedefault/routes';
import escrow from './Escrow/routes';
//implement lazy loading for strapiV3
export default {
  escrow,
  feedefault,
  commitment
};
