import { gql } from "@apollo/client";

export const LOAD_DATA = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        prices {
          amount
          currency
        }
        gallery
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = (input) => gql`
query {
  category(input: {title: "${input}"}) {
    name
    products {
      id
      name
      inStock
      attributes{
        name
        items{
          id
          value
        }
      }
      prices {
        amount
        currency
      }
      category
      gallery
    }
  }
}
`;

export const GET_PRODUCT_BY_ID = (input) => gql`
query {
  product(id:"${input}") {
    id
    name
    prices{
      amount
      currency
    }
    attributes{
      name
      items{
        id
        value
      }
    }
    category
    gallery
    description
  }
}
`;
