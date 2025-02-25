const productAPI = 'https://dummyjson.com/products';

const defaultSortState = {
  column: '',
  order: 'asc',
};

const defaultSearchCriteria = [
  { label: 'Title', value: '' },
  { label: 'Brand', value: '' },
];

const defaultHeaderTitle = [
  { text: 'Title', sort: true },
  { text: 'Category', sort: false },
  { text: 'Brand', sort: true },
  { text: 'Price', sort: false },
  { text: 'Stock', sort: false },
  { text: 'Rating', sort: false },
];

export { productAPI, defaultSortState, defaultSearchCriteria, defaultHeaderTitle };
