import { useState } from "react";
import FuelLogTable from "../components/fuelExpense/FuelLogTable";
import ExpenseTable from "../components/fuelExpense/ExpenseTable";
import LogFormModal from "../components/fuelExpense/LogFormModal";
import { useFuelExpense } from "../hooks/useFuelExpense";

const TABS = [
  { key: "fuel", label: "Fuel Logs" },
  { key: "expenses", label: "Expenses" },
];

export default function FuelExpensePage() {
  const { fuelLogs, expenses, isLoading, addFuelLog, addExpense, removeExpense } = useFuelExpense();
  const [activeTab, setActiveTab] = useState("fuel");
  const [modalOpen, setModalOpen] = useState(false);

  function handleDeleteExpense(id) {
    if (window.confirm("Delete this expense entry?")) {
      removeExpense.mutate(id);
    }
  }

  function handleSubmit(payload) {
    if (activeTab === "fuel") {
      addFuelLog.mutate(payload, { onSuccess: () => setModalOpen(false) });
    } else {
      addExpense.mutate(payload, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Fuel &amp; Expenses</h2>
          <p className="muted-text">Track fuel fill-ups and other trip related expenses</p>
        </div>
        <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
          + Add {activeTab === "fuel" ? "Fuel Log" : "Expense"}
        </button>
      </div>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "tab--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "fuel" ? (
        <FuelLogTable logs={fuelLogs} isLoading={isLoading} />
      ) : (
        <ExpenseTable expenses={expenses} isLoading={isLoading} onDelete={handleDeleteExpense} />
      )}

      <LogFormModal
        mode={activeTab}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isSaving={addFuelLog.isPending || addExpense.isPending}
      />
    </div>
  );
}
