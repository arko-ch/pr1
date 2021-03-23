import { crud } from '../../../services/crud';

const PropertyService = crud('properties');

export function Property() {
  return {
    $properties: PropertyService
  };
}

export const TransactionTypes = {
  purchase: 'Purchase',
  refinance: 'Refinance',
  modification: 'Modification',
  construction: 'Construction',
  searches_only: 'Searches Only'
};

export const ClosingTypes = {
  immediately: 'Immediately',
  one_week: 'One Week',
  two_weeks: 'Two Weeks',
  one_month: 'One Month',
  specific_date: 'Specific Date'
};

export const PolicyIssuingToTypes = {
  lender: 'Lender',
  owner: 'Owner',
  both: 'Both'
};

export const InsuranceTypes = {
  lender: 'Lender',
  buyer: 'Buyer',
  both: 'Both'
};

export const InterestTypes = {
  'co-op': 'Co-Op',
  'fee-simple': 'Fee Simple',
  easement: 'Easement',
  Leasehold: 'Leasehold'
};

export const SearchBackTypes = {
  'prior-owner': 'Prior Owner',
  '10-years': '10 Years',
  '15-years': '15 Years',
  '20-years': '20 Years',
  '30-years': '30 Years',
  '40-years': '40 Years',
  '50-years': '50 Years',
  '60-years': '60 Years',
  'full-search': 'Full Search'
};

export const FileTypes = {
  xls: 'Excel',
  doc: 'Document',
  pdf: 'PDF',
  img: 'Image',
  zip: 'Archive'
};

export const FileCategories = {
  unsorted: 'Unsorted',
  searches: 'Searches',
  commitment: 'Commitment and Clear',
  payoffinvoices: 'Payoffs & Invoices',
  policy: 'Policy',
  others: 'Others',
  template: 'Template'
};

export const ColorTypes = {
  light: 'Normal',
  primary: 'Important',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  gray: 'Gray',
  dark: 'Dark',
  info: 'Info'
};

export const PropertyNumNames = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine'
];

export default PropertyService;

/**
              react-dropdown-list theme css
              this file controls the appearance of the dropdown - please edit to suit your needs
            */

/* dropdown container */
