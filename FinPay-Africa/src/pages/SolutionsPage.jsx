import React from 'react';
import HeadTitle from '../components/HeadTitle';
import SolutionsHero from '../components/solutions/SolutionsHero';
import CrossBorderPayments from '../components/solutions/CrossBorderPayments';
import SmartDriverCard from '../components/solutions/SmartDriverCard';
import PaymentGateway from '../components/solutions/PaymentGateway';
import MobileMoneyCards from '../components/solutions/MobileMoneyCards';

export function SolutionsPage() {
  const title = 'Solutions — FinPay Africa';

  return (
    <div>
      <HeadTitle title={title} />
      <SolutionsHero />
      <CrossBorderPayments />
      <SmartDriverCard />
      <MobileMoneyCards />
      <PaymentGateway />
    </div>
  )
}
