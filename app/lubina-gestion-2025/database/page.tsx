"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDatabase, FiUpload, FiDownload, FiRefreshCw, FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export default function DatabasePage() {
    const [status, setStatus] = useState<{ status: string; itemCount?: number; categoryCount?: number; error?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [migrating, setMigrating] = useState(false);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/database");
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            setStatus({ status: "error", error: "Failed to check database status" });
        } finally {
            setLoading(false);
        }
    };

    const migrateData = async () => {
        setMigrating(true);
        try {
            const response = await fetch("/api/database", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "migrate" }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Data migrated successfully!");
                checkStatus();
            } else {
                toast.error(data.error || "Migration failed");
            }
        } catch (error) {
            toast.error("Migration failed");
        } finally {
            setMigrating(false);
        }
    };

    const exportData = async () => {
        setExporting(true);
        try {
            const response = await fetch("/api/database", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "export" }),
            });
            const data = await response.json();

            // Download as JSON file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `lubina-menu-backup-${new Date().toISOString().split("T")[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success("Backup downloaded!");
        } catch (error) {
            toast.error("Export failed");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
                <p className="text-gray-500 mb-8">Manage your database connection and data</p>

                {/* Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FiDatabase className="text-[#5eb3ce]" />
                            Database Status
                        </h2>
                        <button
                            onClick={checkStatus}
                            disabled={loading}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiRefreshCw className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                            <FiRefreshCw className="animate-spin" />
                            Checking status...
                        </div>
                    ) : status ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Connection:</span>
                                {status.status === "connected" ? (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <FiCheck /> Connected
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-500">
                                        <FiX /> Not Connected
                                    </span>
                                )}
                            </div>
                            {status.itemCount !== undefined && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Menu Items:</span>
                                    <span className="text-gray-600">{status.itemCount}</span>
                                </div>
                            )}
                            {status.categoryCount !== undefined && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Categories:</span>
                                    <span className="text-gray-600">{status.categoryCount}</span>
                                </div>
                            )}
                            {status.error && (
                                <div className="text-red-500 text-sm mt-2">{status.error}</div>
                            )}
                        </div>
                    ) : null}
                </motion.div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Migrate Data */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <FiUpload className="text-blue-500" />
                            Migrate Data
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Copy all menu items and categories from the local file to the database.
                            This will replace any existing data in the database.
                        </p>
                        <button
                            onClick={migrateData}
                            disabled={migrating || status?.status !== "connected"}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${status?.status === "connected"
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {migrating ? "Migrating..." : "Migrate to Database"}
                        </button>
                    </motion.div>

                    {/* Export Backup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <FiDownload className="text-green-500" />
                            Export Backup
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Download a JSON backup of all menu items and categories from the database.
                        </p>
                        <button
                            onClick={exportData}
                            disabled={exporting || status?.status !== "connected"}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${status?.status === "connected"
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {exporting ? "Exporting..." : "Download Backup"}
                        </button>
                    </motion.div>
                </div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6"
                >
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Setup Instructions</h3>
                    <ol className="list-decimal list-inside text-blue-700 space-y-2 text-sm">
                        <li>Go to your Vercel Dashboard → Your Project → Storage tab</li>
                        <li>Click "Create Database" → Select "Postgres"</li>
                        <li>Name your database (e.g., "lubina-db") and create it</li>
                        <li>Vercel will automatically add the POSTGRES_URL environment variable</li>
                        <li>Redeploy your project to apply the changes</li>
                        <li>Return here and click "Migrate to Database" to copy your menu data</li>
                    </ol>
                </motion.div>
            </div>
        </div>
    );
}
