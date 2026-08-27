"""
Shared lab order store (JSON file). Orders flow: doctor → lab → patient & doctor (digital reports).
"""
from __future__ import annotations

import json
import threading
from datetime import datetime
from pathlib import Path
from uuid import uuid4

DATA_DIR = Path(__file__).resolve().parents[3] / "data"
DATA_FILE = DATA_DIR / "lab_orders.json"
_lock = threading.Lock()
_counter = 2400

STATUS_FLOW = [
    "Ordered",
    "Pending collection",
    "Sample collected",
    "Processing",
    "Completed",
]

SEED_ORDERS = [
    {
        "id": "seed-1",
        "orderId": "LAB-2401",
        "patientId": "38917",
        "patientName": "Rajesh M",
        "testName": "Complete Blood Count",
        "orderedBy": "Dr Sathya",
        "priority": "Urgent",
        "status": "Sample collected",
        "requestedAt": "2026-05-24 07:30",
        "resultSummary": None,
        "resultDetails": None,
        "completedAt": None,
        "completedBy": None,
    },
    {
        "id": "seed-2",
        "orderId": "LAB-2398",
        "patientId": "44785",
        "patientName": "Jeevanth Ram",
        "testName": "Blood glucose",
        "orderedBy": "Dr Keerthana",
        "priority": "Routine",
        "status": "Completed",
        "requestedAt": "2026-05-23 09:00",
        "resultSummary": "100 mg/dL — Normal",
        "resultDetails": {
            "fastingGlucose": "100 mg/dL",
            "reference": "70–100 mg/dL",
            "interpretation": "Normal",
        },
        "completedAt": "2026-05-24 09:00",
        "completedBy": "Lab Tech Priya",
    },
]


def _ensure_data_dir() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def _load() -> list[dict]:
    _ensure_data_dir()
    if not DATA_FILE.exists():
        return []
    with DATA_FILE.open(encoding="utf-8") as f:
        data = json.load(f)
    return data if isinstance(data, list) else []


def _save(orders: list[dict]) -> None:
    _ensure_data_dir()
    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(orders, f, indent=2)


def _seed_if_empty() -> list[dict]:
    orders = _load()
    if not orders:
        _save(SEED_ORDERS.copy())
        return SEED_ORDERS.copy()
    return orders


def _next_order_id() -> str:
    global _counter
    _counter += 1
    return f"LAB-{_counter}"


def _now_str() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M")


def list_orders(
    *,
    patient_id: str | None = None,
    ordered_by: str | None = None,
    status: str | None = None,
    exclude_completed: bool = False,
) -> list[dict]:
    with _lock:
        orders = _seed_if_empty()
    results = orders
    if patient_id:
        results = [o for o in results if o.get("patientId") == patient_id]
    if ordered_by:
        key = ordered_by.lower()
        results = [
            o
            for o in results
            if key in (o.get("orderedBy") or "").lower()
        ]
    if status:
        results = [o for o in results if o.get("status") == status]
    if exclude_completed:
        results = [o for o in results if o.get("status") != "Completed"]
    return sorted(results, key=lambda o: o.get("requestedAt", ""), reverse=True)


def get_order(order_id: str) -> dict | None:
    with _lock:
        orders = _seed_if_empty()
    for o in orders:
        if o.get("id") == order_id or o.get("orderId") == order_id:
            return o
    return None


def create_order(payload: dict) -> dict:
    global _counter
    with _lock:
        orders = _seed_if_empty()
        oid = _next_order_id()
        entry = {
            "id": str(uuid4()),
            "orderId": oid,
            "patientId": payload["patientId"],
            "patientName": payload["patientName"],
            "testName": payload["testName"],
            "orderedBy": payload["orderedBy"],
            "priority": payload.get("priority", "Routine"),
            "status": "Ordered",
            "requestedAt": _now_str(),
            "resultSummary": None,
            "resultDetails": None,
            "completedAt": None,
            "completedBy": None,
        }
        orders.insert(0, entry)
        _save(orders)
        return entry


def update_order(order_id: str, payload: dict) -> dict | None:
    with _lock:
        orders = _seed_if_empty()
        for i, o in enumerate(orders):
            if o.get("id") != order_id and o.get("orderId") != order_id:
                continue
            updated = {**o, **{k: v for k, v in payload.items() if v is not None}}
            if payload.get("status") == "Completed":
                updated["completedAt"] = payload.get("completedAt") or _now_str()
            orders[i] = updated
            _save(orders)
            return updated
    return None


def compute_stats(orders: list[dict] | None = None) -> dict:
    if orders is None:
        orders = list_orders()
    today = datetime.now().strftime("%Y-%m-%d")
    pending = [o for o in orders if o.get("status") != "Completed"]
    in_progress = [o for o in orders if o.get("status") in ("Processing", "Sample collected")]
    completed_today = [
        o
        for o in orders
        if o.get("status") == "Completed"
        and (o.get("completedAt") or "").startswith(today)
    ]
    urgent = [o for o in pending if o.get("priority") == "Urgent"]
    return {
        "pendingTests": len(pending),
        "inProgress": len(in_progress),
        "completedToday": len(completed_today),
        "urgentSamples": len(urgent),
    }


def completed_reports(orders: list[dict] | None = None) -> list[dict]:
    if orders is None:
        orders = list_orders()
    done = [o for o in orders if o.get("status") == "Completed"]
    return [
        {
            "id": o["id"],
            "orderId": o["orderId"],
            "patientName": o["patientName"],
            "patientId": o.get("patientId"),
            "testName": o["testName"],
            "resultSummary": o.get("resultSummary") or "—",
            "resultDetails": o.get("resultDetails"),
            "completedAt": o.get("completedAt") or "",
            "orderedBy": o.get("orderedBy"),
        }
        for o in done
    ]
