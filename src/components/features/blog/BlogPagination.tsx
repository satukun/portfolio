import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  postsPerPage: number;
  baseUrl?: string; // カテゴリ・タグページ用のベースURL
}

export default function BlogPagination({ 
  currentPage, 
  totalPages, 
  totalCount, 
  postsPerPage,
  baseUrl = '/blog'
}: BlogPaginationProps) {
  // ページネーション表示の範囲を計算
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalCount);

  if (totalPages <= 1) return null;

  return (
    <div className="blog-pagination">
      {/* 記事数表示 */}
      <div className="pagination-info">
        <span className="pagination-count">
          {totalCount}件中 {startPost}-{endPost}件を表示
        </span>
      </div>

      {/* ページネーション */}
      <nav className="pagination-nav" aria-label="ページネーション">
        <div className="pagination-controls">
          {/* 前ページボタン */}
          {currentPage > 1 ? (
            <Link 
              href={`${baseUrl}?page=${currentPage - 1}`}
              className="pagination-btn pagination-prev"
              aria-label="前のページ"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              前へ
            </Link>
          ) : (
            <span className="pagination-btn pagination-prev disabled">
              <span className="material-symbols-outlined">chevron_left</span>
              前へ
            </span>
          )}

          {/* ページ番号 */}
          <div className="pagination-numbers">
            {/* 最初のページ */}
            {pageNumbers[0] > 1 && (
              <>
                <Link href={`${baseUrl}?page=1`} className="pagination-number">
                  1
                </Link>
                {pageNumbers[0] > 2 && (
                  <span className="pagination-ellipsis">...</span>
                )}
              </>
            )}

            {/* 表示範囲のページ番号 */}
            {pageNumbers.map((pageNum) => (
              <Link
                key={pageNum}
                href={`${baseUrl}?page=${pageNum}`}
                className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            ))}

            {/* 最後のページ */}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="pagination-ellipsis">...</span>
                )}
                <Link 
                  href={`${baseUrl}?page=${totalPages}`} 
                  className="pagination-number"
                >
                  {totalPages}
                </Link>
              </>
            )}
          </div>

          {/* 次ページボタン */}
          {currentPage < totalPages ? (
            <Link 
              href={`${baseUrl}?page=${currentPage + 1}`}
              className="pagination-btn pagination-next"
              aria-label="次のページ"
            >
              次へ
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          ) : (
            <span className="pagination-btn pagination-next disabled">
              次へ
              <span className="material-symbols-outlined">chevron_right</span>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
