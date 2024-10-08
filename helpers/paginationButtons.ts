export const generatePageButtons = (
  pageCount: number,
  currentPage: number,
  maxPagesToShow: number // Set a default of 5 if not provided
) => {
  const pageNumbers = [];

  if (pageCount <= maxPagesToShow) {
    // Show all pages if total pages are less than or equal to max pages to show
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show the first page
    pageNumbers.push(0);

    // Determine the number of side pages to show around the current page
    const maxSidePages = Math.floor((maxPagesToShow - 3) / 2); // Exclude 1 for first page, 1 for last page, and 1 for possible ellipsis

    if (currentPage > maxSidePages + 1) {
      pageNumbers.push("...");
    }

    // Show pages around the current page
    const startPage = Math.max(1, currentPage - maxSidePages);
    const endPage = Math.min(pageCount - 2, currentPage + maxSidePages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < pageCount - maxSidePages - 2) {
      pageNumbers.push("...");
    }

    // Always show the last page
    pageNumbers.push(pageCount - 1);
  }

  // Ensure that exactly 5 buttons are shown
  if (pageNumbers.length > maxPagesToShow) {
    if (currentPage <= 2) {
      // If the current page is near the beginning, show the first few pages
      return [0, 1, 2, "...", pageCount - 1];
    } else if (currentPage >= pageCount - 3) {
      // If the current page is near the end, show the last few pages
      return [0, "...", pageCount - 3, pageCount - 2, pageCount - 1];
    } else {
      // Otherwise, show the current page in the middle with ellipses
      return [0, "...", currentPage, "...", pageCount - 1];
    }
  }

  return pageNumbers;
};
