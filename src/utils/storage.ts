import { openDB, type IDBPDatabase } from 'idb';
import type { Supplement, DoseLog } from '../types';

const DB_NAME = 'pill-reminder-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('supplements')) {
          db.createObjectStore('supplements', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('doseLogs')) {
          const logStore = db.createObjectStore('doseLogs', { keyPath: 'id' });
          logStore.createIndex('by-supplement-period', ['supplementId', 'periodKey']);
          logStore.createIndex('by-supplement', 'supplementId');
          logStore.createIndex('by-timestamp', 'timestamp');
        }
      },
    });
  }
  return dbPromise;
}

// Supplements

export async function getAllSupplements(): Promise<Supplement[]> {
  const db = await getDB();
  return db.getAll('supplements');
}

export async function addSupplement(supplement: Supplement): Promise<void> {
  const db = await getDB();
  await db.put('supplements', supplement);
}

export async function updateSupplement(supplement: Supplement): Promise<void> {
  const db = await getDB();
  await db.put('supplements', supplement);
}

export async function deleteSupplement(id: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['supplements', 'doseLogs'], 'readwrite');
  await tx.objectStore('supplements').delete(id);

  // Delete all dose logs for this supplement
  const logStore = tx.objectStore('doseLogs');
  const index = logStore.index('by-supplement');
  let cursor = await index.openCursor(IDBKeyRange.only(id));
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  await tx.done;
}

// Dose Logs

export async function addDoseLog(log: DoseLog): Promise<void> {
  const db = await getDB();
  await db.put('doseLogs', log);
}

export async function getDoseLogsForSupplement(supplementId: string): Promise<DoseLog[]> {
  const db = await getDB();
  return db.getAllFromIndex('doseLogs', 'by-supplement', supplementId);
}

export async function getRecentDoseLogs(since: number): Promise<DoseLog[]> {
  const db = await getDB();
  const range = IDBKeyRange.lowerBound(since);
  return db.getAllFromIndex('doseLogs', 'by-timestamp', range);
}

export async function getAllDoseLogs(): Promise<DoseLog[]> {
  const db = await getDB();
  return db.getAll('doseLogs');
}

export async function deleteDoseLog(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('doseLogs', id);
}
