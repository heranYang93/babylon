import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query Items($input: ItemsInput) {
    items(input: $input) {
      _id
      title
      description
      image
      price
      discountedPrice
      stock
      brand
    }
  }
`;

export const GET_BRAND_ITEMS = gql`
  query Query {
    brandItems {
      _id
      title
      description
      price
      discountedPrice
      stock
    }
  }
`;
