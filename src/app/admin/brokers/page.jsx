"use client";
/** admin/brokers/page.jsx - Manage brokers and company agents: add, enable/disable, reset password. */
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { setBrokerStatus } from "@/store/thunks";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { TableSkeleton } from "@/components/ui/Skeleton";

const BrokersTable = dynamic(() => import("@/components/admin/brokers/BrokersTable"), { loading: () => <TableSkeleton rows={4} /> });
const BrokerForm = dynamic(() => import("@/components/admin/brokers/BrokerForm"));
const ResetPasswordModal = dynamic(() => import("@/components/admin/brokers/ResetPasswordModal"));

export default function AdminBrokersPage() {
  const dispatch = useDispatch();
  const allUsers = useSelector((s) => s.users.items);
  const users = useMemo(() => allUsers.filter((u) => u.role !== "admin"), [allUsers]);
  const [adding, setAdding] = useState(false);
  const [resetting, setResetting] = useState(null);
  const [toggling, setToggling] = useState(null);

  const disabling = toggling?.status === "active";
  const confirmToggle = async () => {
    await dispatch(setBrokerStatus({ userId: toggling.id, status: disabling ? "disabled" : "active" })).unwrap();
    toast.success(`${toggling.name} ${disabling ? "disabled" : "enabled"}.`);
  };

  return (
    <div>
      <PageHeader title="Brokers" subtitle="Disabled users can't sign in; their records stay.">
        <Button icon={UserPlus} onClick={() => setAdding(true)}>Add broker</Button>
      </PageHeader>
      <BrokersTable users={users} onToggle={setToggling} onReset={setResetting} />

      {adding && <BrokerForm onClose={() => setAdding(false)} />}
      {resetting && <ResetPasswordModal user={resetting} onClose={() => setResetting(null)} />}
      {toggling && (
        <ConfirmDialog open onClose={() => setToggling(null)} onConfirm={confirmToggle}
          title={`${disabling ? "Disable" : "Enable"} ${toggling.name}?`} tone={disabling ? "danger" : "primary"} confirmLabel={disabling ? "Disable" : "Enable"}
          message={disabling ? "They won't be able to sign in. Their registrations stay as they are." : "They will be able to sign in again."} />
      )}
    </div>
  );
}
