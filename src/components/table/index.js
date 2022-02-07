import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Icon } from "@blueprintjs/core";
import { CONFIG } from "@/config";

const Table = ({ data, onClick, color }) => {
  const [sortConfig, setConfig] = useState({ key: "", direction: "" });
  const [sortedData, setSorted] = useState(null);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(data.map(() => React.createRef()));

  useEffect(() => {
    data.find((item, index) => {
      if (
        !loading &&
        sortedData &&
        item.collection_address === CONFIG.TEMPLATE.collection_address
      ) {
        tableRef.current[index].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setLoading(true);
        return item;
      }
      return null;
    });
  }, [loading, sortedData, data]);

  useEffect(() => {
    const sortData = () => {
      let sorted = [...data];
      sorted.sort((a, b) => {
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    };
    setSorted(sortData());
  }, [sortConfig, data]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setConfig({ key, direction });
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const SortIcon = ({ sortKey }) => {
    return (
      <Icon
        icon={
          sortConfig.key === sortKey && sortConfig.direction === "descending"
            ? "chevron-down"
            : sortConfig.key === sortKey && sortConfig.direction === "ascending"
            ? "chevron-up"
            : "expand-all"
        }
        size={16}
        intent="primary"
        color="#FF4C8B"
        className="icon cursor-pointer"
        onClick={() => {
          requestSort(sortKey);
        }}
      />
    );
  };

  const activeClass = (address) => {
    if (address === CONFIG.TEMPLATE.collection_address) {
      return "table-data-active active";
    }
    return "data-row";
  };

  const activeStyle = (address) => {
    if (address === CONFIG.TEMPLATE.collection_address)
      return { backgroundColor: color };
    else return {};
  };

  return (
    <table className="table">
      <tbody>
        <tr className="title-row">
          <th className="collection-name">
            <div className="tableHeader-collection">
              Collection
              <SortIcon sortKey={"collection_name"} />
            </div>
          </th>
          <th className="align-right">
            <div className="tableHeader">
              Market Cap
              <SortIcon sortKey={"market_cap_quote"} />
            </div>
          </th>
          <th className="align-right">
            <div className="tableHeader">
              24hr Volume
              <SortIcon sortKey={"volume_quote_24h"} />
            </div>
          </th>
          <th className="align-right">
            <div className="tableHeader">
              Avg Price
              <SortIcon sortKey={"avg_volume_quote_24h"} />
            </div>
          </th>
          <th className="align-right">
            <div className="tableHeader">
              # Transaction
              <SortIcon sortKey={"transaction_count_alltime"} />
            </div>
          </th>
          <th className="align-right">
            <div className="tableHeader">
              # Wallets
              <SortIcon sortKey={"unique_wallet_purchase_count_alltime"} />
            </div>
          </th>
        </tr>
        {sortedData &&
          sortedData.map((o, i) => {
            if (o.collection_name === "") {
              console.log();
            }
            return (
              <tr
                key={i}
                ref={tableRef.current[i]}
                className={activeClass(o.collection_address)}
                style={activeStyle(o.collection_address)}
                onClick={() => {
                  onClick(o.collection_address);
                }}
              >
                <td className="collection-name" style={{ fontWeight: "600" }}>
                  {o.collection_name !== ""
                    ? o.collection_name
                    : o.collection_address}
                </td>
                <td>
                  {o.market_cap_quote
                    ? formatter.format(o.market_cap_quote).split(".")[0]
                    : 0}
                </td>
                <td>
                  {o.volume_quote_24h
                    ? formatter.format(o.volume_quote_24h).split(".")[0]
                    : 0}
                </td>
                <td>
                  {o.avg_volume_quote_24h
                    ? formatter.format(o.avg_volume_quote_24h).split(".")[0]
                    : 0}
                </td>
                <td>
                  {o.transaction_count_alltime
                    ? o.transaction_count_alltime.toLocaleString()
                    : 0}
                </td>
                <td>
                  {o.unique_wallet_purchase_count_alltime
                    ? o.unique_wallet_purchase_count_alltime.toLocaleString()
                    : 0}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
