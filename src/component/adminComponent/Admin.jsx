import { useQuery } from "@tanstack/react-query";

import PropTypes from "prop-types";
import { getAdminInfo } from "../../api/Admin.js";

export function Admin({ id }) {
  const AdminInfoQuery = useQuery({
    queryKey: ["admin", id],
    queryFn: () => getAdminInfo(id),
  });

  const adminInfo = AdminInfoQuery.data ?? {};
  return <strong>{adminInfo?.username ?? id}</strong>;
}

Admin.propTypes = {
  id: PropTypes.string.isRequired,
};
