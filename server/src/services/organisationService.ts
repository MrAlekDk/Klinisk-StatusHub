import db from "../db/database.js";

type SystemRow = {
  system_id: number;
  system_name: string;
  system_link: string | null;
  system_created_at: string;

  contingency_plan: string | null;

  contact_id: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
};

type StatusRow = {
  status: string;
  message: string | null;
  checked_at: string;
};

type SystemResult = {
  id: number;
  name: string;
  link: string | null;
  created_at: string;
  contingency_plan: string | null;
  contacts: {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
  }[];
  statuses: {
    status: string;
    message: string | null;
    checked_at: string;
  }[];
};

export const getOrganisationSystems = (organisationId: number): SystemResult[] => {
  const sql = `
    SELECT
        s.id AS system_id,
        s.name AS system_name,
        s.link AS system_link,
        s.created_at AS system_created_at,

        cp.content AS contingency_plan,

        c.id AS contact_id,
        c.name AS contact_name,
        c.phone AS contact_phone,
        c.email AS contact_email

    FROM systems s
    LEFT JOIN contingency_plans cp ON cp.system_id = s.id
    LEFT JOIN contacts c ON c.system_id = s.id
    WHERE s.organisation_id = ?
    ORDER BY s.name ASC, c.name ASC;
  `;

  const stmt = db.prepare<[number], SystemRow>(sql);
  const rows = stmt.all(organisationId);

  const statusStmt = db.prepare<[number], StatusRow>(`
    SELECT status, message, checked_at
    FROM system_statuses
    WHERE system_id = ?
    ORDER BY checked_at DESC
    LIMIT 24
  `);

  const systemsMap = new Map<number, SystemResult>();

  for (const row of rows) {
    if (!systemsMap.has(row.system_id)) {
      systemsMap.set(row.system_id, {
        id: row.system_id,
        name: row.system_name,
        link: row.system_link,
        created_at: row.system_created_at,
        contingency_plan: row.contingency_plan,
        contacts: [],
        statuses: statusStmt.all(row.system_id)
      });
    }

    if (row.contact_id) {
      systemsMap.get(row.system_id)!.contacts.push({
        id: row.contact_id,
        name: row.contact_name!,
        phone: row.contact_phone,
        email: row.contact_email
      });
    }
  }

  return Array.from(systemsMap.values());
};
