import { Table } from "@mantine/core";
import { Props } from "./types";
import { Status } from "../Status/Status";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "./Report.modul.scss";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { RoutesEnum } from "../../AppRoutes";
import { IconTrash } from "@tabler/icons-react";

export const Report: React.FC<Props> = ({
  id,
  owner,
  sentTime,
  status,
  title,
  isDraft,
  createdAt,
  onClick,
  onRemove,
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(RoutesEnum.Report + id);
  }, [navigate, id]);

  return (
    <Table.Tr className="report-wrapper" onClick={onClick ?? handleClick}>
      <Table.Td className="report-owner">
        <h4>{owner}</h4>
      </Table.Td>
      <Table.Td className="report-payload">
        <h5>{title}</h5>
      </Table.Td>
      {sentTime && (
        <Table.Td className="report-timestamp">
          {format(sentTime, "d LLL p:ss", { locale: ru })}
        </Table.Td>
      )}
      {isDraft && !!createdAt && (
        <Table.Td className="report-timestamp">
          {format(createdAt, "d LLL p:ss", { locale: ru })}
        </Table.Td>
      )}
      {status && (
        <Table.Td className="report-status">
          <Status status={status} />
        </Table.Td>
      )}
      {isDraft && (
        <Table.Td>
          <IconTrash
            stroke={1.5}
            // style={{ width: "70%", height: "70%" }}
            color="var(--mantine-color-red-filled)"
            onClick={(event) => {
              event.stopPropagation();
              onRemove && onRemove();
            }}
          />
        </Table.Td>
      )}
    </Table.Tr>
  );
};
