import React from 'react';
import SolutionsHero from '../components/solutions/SolutionsHero';
import CrossBorderPayments from '../components/solutions/CrossBorderPayments';
import SmartDriverCard from '../components/solutions/SmartDriverCard';
import PaymentGateway from '../components/solutions/PaymentGateway';
import MobileMoneyCards from '../components/solutions/MobileMoneyCards';

export function SolutionsPage() {
  return (
    <div>
      <SolutionsHero />
      <CrossBorderPayments />
      <SmartDriverCard />
      <MobileMoneyCards />
      <PaymentGateway />
    </div>
  )
}
