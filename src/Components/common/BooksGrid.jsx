import PropTypes from "prop-types";

const BooksGrid = ({ books }) => {
  console.log("<BooksGrid />", books);
  return <div>Books will be rendered by this component</div>;
};

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BooksGrid;
