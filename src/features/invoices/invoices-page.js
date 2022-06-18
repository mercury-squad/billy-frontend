import { useEffect } from 'react';
import { useOutletContext } from 'react-router';

const PAGE_TITLE = 'Invoices';
const Invoices = () => {
  const [setHeaderTitle] = useOutletContext();

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);
  return (
    <div>
      <p>Invoices page</p>
    </div>
  );
};

export default Invoices;
