import React from 'react';
import Parties from './components/parties/Parties';
import UnderwriterCard from './components/underwriter/UnderwriterCard';
import UtilityCard from './components/utilityinfo/UtilityCard';
import HoaCard from './components/hoa/HoaCard';
import Mortgage from './components/mortgage/Mortgage';
import TransactionSales from './components/transactionsales/TransactionSales';

const PropertyOverview = ({
  dataOverview,
  dataUnderwriter,
  // dataCommitment,
  dataUtility,
  dataHoa,
  dataMortgage,
  dataTransaction
}) => {
  return (
    <div>
      <UnderwriterCard dataUnderwriter={dataUnderwriter} />
      <Parties dataOverview={dataOverview} />
      <UtilityCard dataUtility={dataUtility} />
      <HoaCard dataHoa={dataHoa} />
      <Mortgage dataMortgage={dataMortgage} />
      <TransactionSales dataTransaction={dataTransaction} />
    </div>
  );
};

export default PropertyOverview;
