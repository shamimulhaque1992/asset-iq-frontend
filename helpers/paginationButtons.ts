export const generatePageButtons = (
  pageCount: number,
  currentPage: number,
  maxPagesToShow: number = 7
) => {
  const pageNumbers = [];

  if (pageCount <= maxPagesToShow) {
    // Show all pages if total pages are less than or equal to max pages to show
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show the first 3 pages
    pageNumbers.push(0, 1, 2);

    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Show the current page if it's beyond the first 3 but before the last 3
    if (currentPage > 2 && currentPage < pageCount - 3) {
      pageNumbers.push(currentPage);
    }

    if (currentPage < pageCount - 4) {
      pageNumbers.push("...");
    }

    // Always show the last 3 pages
    pageNumbers.push(pageCount - 3, pageCount - 2, pageCount - 1);
  }

  return pageNumbers;
};
