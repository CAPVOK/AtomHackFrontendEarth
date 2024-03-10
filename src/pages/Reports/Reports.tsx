import { Group, Pagination, Table, TextInput } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Report } from "../../entities/Report/Report";
import { ReportModel } from "../../entities/Report/types";

import "./Reports.modul.scss";
import { getAll } from "../../entities/Report/api";
import { IReportsProps } from "./types";
import { useAuth } from "../../utils/hooks/useAuth";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 10;

export const Reports = (props: IReportsProps) => {
  const { isUserReports } = props;
  const [reports, setReports] = useState<ReportModel[]>([]);
  // TODO: use auth
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(searchParams.get("ownerOrTitle") || "");

  const handleFetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      page: currentPage,
      pageSize: PAGE_SIZE,
      type: "formed",
    };

    const deliveryStatus = searchParams.get("deliveryStatus");
    if (deliveryStatus) {
      options.deliveryStatus = deliveryStatus;
    }

    const ownerOrTitle = searchParams.get("ownerOrTitle");
    if (ownerOrTitle) {
      options.ownerOrTitle = ownerOrTitle;
    }

    getAll(options).then((res) => {
      setReports(
        isUserReports
          ? res.data.items.filter((report) => report.owner === user.name)
          : res.data.items
      );
      setTotal(res.data.total);
    });
  }, [currentPage, searchParams, isUserReports, user.name]);

  useEffect(() => {
    handleFetch();

    const intervalId = setInterval(() => {
      handleFetch();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleFetch]);

  useEffect(() => {
    searchParams.set("page", currentPage.toString());
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="reports-table">
      <div className="reports-table-filters">
        <TextInput
          placeholder="Искать"
          label="Поиск"
          value={search}
          className="reports-table-filters__search"
          onChange={(event) => setSearch(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              search
                ? searchParams.set("ownerOrTitle", search)
                : searchParams.delete("ownerOrTitle");
              setSearchParams(searchParams);
            }
          }}
        ></TextInput>
      </div>
      <Table highlightOnHover>
        <Table.Tbody>
          {!!reports &&
            !!reports.length &&
            !!reports &&
            !!reports.length &&
            reports
                .filter((report) => {
                  const statuses = JSON.parse(
                  
                  searchParams.get("statuses") || "[]"
                
                );

                  return (
                    !statuses.length || statuses.includes(report.deliveryStatus)
                  );
                })
                .filter((report) => {
                  const search = searchParams.get("search") || "";

                  return (
                    report.owner.toLowerCase().includes(search.toLowerCase()) ||
                    report.payload?.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((report) => (
                  <Report
                    key={report.id}
                    owner={report.owner}
                    sentTime={new Date(report.sentTime)}
                    receivedTime={new Date(report.receivedTime || "")}
                    status={report.deliveryStatus}
                    file={report.file}
                    id={report.id}
                    title={report.title}
                  />
                ))}
        </Table.Tbody>
      </Table>

      {!!reports && !!reports.length && total > PAGE_SIZE && (
        <Pagination.Root
          value={currentPage}
          onChange={setCurrentPage}
          total={total / PAGE_SIZE}
          style={{ marginTop: "16px" }}
        >
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      )}
    </div>
  );
};
