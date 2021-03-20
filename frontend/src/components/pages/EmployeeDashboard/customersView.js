import React, { Component, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import i18n from '../../../core/i18n';
import APP_CONSTANTS, {config} from "../../../core/app_constants";
import { Multiselect } from 'multiselect-react-dropdown';

import '../../../assets/styles/employeeDashboard/customerView.css'

export default function CustomersView(content) {
    const defaultSelectedValues = [
        { key: i18n.t('EmployeeDashboard.table_column_id'), accessor: "id", Header: i18n.t('EmployeeDashboard.table_column_id'), minWidth: 170, fixed: "left" }, // 
        { key: i18n.t('EmployeeDashboard.table_column_customerName'), accessor: "customerName", Header: i18n.t('EmployeeDashboard.table_column_customerName'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_nationalID'), accessor: "nationalID", Header: i18n.t('EmployeeDashboard.table_column_nationalID'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_costAfterDiscount'), accessor: "costAfterDiscount", Header: i18n.t('EmployeeDashboard.table_column_costAfterDiscount'), minWidth: 100 },
        { key: i18n.t('EmployeeDashboard.table_column_lastBillDate'), accessor: "lastBillDate", Header: i18n.t('EmployeeDashboard.table_column_lastBillDate'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_phone1'), accessor: "phone1", Header: i18n.t('EmployeeDashboard.table_column_phone1'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_attributionDate'), accessor: "attributionDate", Header: i18n.t('EmployeeDashboard.table_column_attributionDate'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_status'), accessor: "status", Header: i18n.t('EmployeeDashboard.table_column_status'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_notes'), accessor: "notes", Header: i18n.t('EmployeeDashboard.table_column_notes'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_paymentDate'), accessor: "paymentDate", Header: i18n.t('EmployeeDashboard.table_column_paymentDate'), minWidth: 100 }, //
        { key: i18n.t('EmployeeDashboard.table_column_newStatus'), accessor: "newStatus", Header: i18n.t('EmployeeDashboard.table_column_newStatus'), minWidth: 100 },
    ];
    const [cols, setCols] = useState(defaultSelectedValues);
    const [modified, setModified] = useState(false);
    let data = useMemo(
      () => [
        ...content.data
      ],
      []
    )
  
    let columns = useMemo(
      () => [
        ...cols
      ],
      [modified]
    )
  
    let {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });

    
    const onSelect = (selectedList, selectedItem) => {
        setCols(selectedList);
        modified?
        setModified(()=>false):setModified(()=>true);
    }
    
    const onRemove = (selectedList, removedItem)=> {
        setCols(selectedList);
        modified?
        setModified(()=>false):setModified(()=>true);
    }

   //id, customerName, nationalID, cost, discount, costAfterDiscount, lastBillDate, firstBillDate, phone1, phone2, phone3, phone4, phone5, phone6, phone7, phone8, collecterUsername, attributionDate, status, notes, paymentDate, newStatus, newNotes, newPaymentDate, customerStatus, timestamp
    return (
        <div className="container">
            <hr />
            <div>
                <div>
                    <Multiselect
                        options={content.cols}
                        displayValue="key"
                        disablePreSelectedValues={true}
                        selectedValues={defaultSelectedValues}
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                    />
                </div>
            </div>
                <table {...getTableProps()}  style={{ border: 'solid 1px black' }}>
                    <thead >
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        width:"fit-content",
                                        borderLeft:'solid 1px',
                                        borderBottom: 'solid 3px black',
                                        background: 'silver',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                {column.render('Header')}
                                </th>
                            ))}
                                <th style={{
                                        width:"fit-content",
                                        borderLeft:'solid 1px',
                                        borderBottom: 'solid 3px black',
                                        background: 'silver',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}>{i18n.t('EmployeeDashboard.table_column_edit')}</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                return (
                                    <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'white',
                                    }}
                                    >
                                    {cell.render('Cell')}
                                    </td>
                                )
                                })}
                                <td style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'white',
                                    }}>{i18n.t('EmployeeDashboard.table_column_edit')}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
      </div>
    )
  }
