// src/components/common/Pagination.jsx
import React from 'react';
import Button from './Button'; // Sử dụng Button component

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = '',
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Số lượng nút trang hiển thị tối đa

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={i === currentPage ? 'primary' : 'secondary'}
          size="small"
          className="mx-1"
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`} aria-label="Pagination">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="secondary"
        size="small"
      >
        Trước
      </Button>

      {showPageNumbers && renderPageNumbers()}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="secondary"
        size="small"
      >
        Sau
      </Button>
    </nav>
  );
};

export default Pagination;