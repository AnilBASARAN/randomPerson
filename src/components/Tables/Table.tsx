import clsx from 'clsx'
import ReactLoading from 'react-loading'
import React from 'react'

interface Table1Props {
  title?: string
  subtitle?: string
  hasToolbar?: boolean
  headers: {
   title: React.ReactNode; // Allow JSX for interactive headers
    width?: string
  }[]
  data: any[]
  singleRow: any // {key: value}
  tableId: string
  tableLoading?: boolean
}

const Table1 = ({
  title,
  subtitle,
  hasToolbar = false,
  headers,
  data,
  singleRow,
  tableId,
  tableLoading,
}: Table1Props) => {
  return (
    <div className='card mb-5 mb-xl-8'>
      {/*begin::Header*/}
      {title || hasToolbar ? (
        <div className={'card-header border-0'}>
          <h3 className='card-title align-items-start flex-column'>
            {title && <span className='card-label fw-bold fs-3 mb-1'>{title}</span>}
            {subtitle && <span className='text-muted mt-1 fw-semibold fs-7'>{subtitle}</span>}
          </h3>
          {hasToolbar && (
            <div className='card-toolbar'>
              {/*begin::Menu*/}
              <button
                type='button'
                className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
              >
                <i className='ki-duotone ki-category fs-6'>
                  <span className='path1' />
                  <span className='path2' />
                  <span className='path3' />
                  <span className='path4' />
                </i>{' '}
              </button>
              {/*begin::Menu 2*/}
              <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px'
                data-kt-menu='true'
              >
                {/* Menu items go here */}
              </div>
              {/*end::Menu 2*/}
            </div>
          )}
        </div>
      ) : (
        <div className='pt-3'></div>
      )}
      {/*end::Header*/}

      {/*begin::Body*/}
      <div className='card-body py-3'>
        {/*begin::Table container*/}
        <div className='table-responsive'>
          {/*begin::Table*/}
          <table className='table align-middle gs-0 gy-4 table-row-bordered' id={tableId}>
            {/*begin::Table head*/}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={clsx(
                      index === 0 && 'rounded-start ps-4',
                      index === headers.length - 1 && 'rounded-end',
                      header.width ? `min-w-${header.width}` : 'min-w-125px'
                    )}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {!tableLoading && data.length > 0 && data.map((row, index) => singleRow(row, index))}
            </tbody>
          </table>

          {/* If no data available show this  */}
          {!tableLoading && data.length === 0 && (
            <div className='d-flex justify-content-center p-5 text-muted'>No data available</div>
          )}

          {/* If table is loading show this  */}
          {tableLoading && (
            <div className='d-flex justify-content-center p-5 text-muted'>
              <ReactLoading type='spin' color='#009ef7' height={35} width={35} />
            </div>
          )}
          {/*end::Table*/}
        </div>
        {/*end::Table container*/}
      </div>
      {/*begin::Body*/}
    </div>
  )
}

export default Table1
