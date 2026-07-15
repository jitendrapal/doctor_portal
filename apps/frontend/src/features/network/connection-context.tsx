"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getUserById, networkUsers } from "@/lib/mock-network";

type ConnectionStatus = "PENDING" | "ACCEPTED";

type ConnectionRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: ConnectionStatus;
  createdAt: string;
};

type ConnectionContextValue = {
  activeUserId: string;
  setActiveUserId: (userId: string) => void;
  requests: ConnectionRequest[];
  loadDemoRequests: () => void;
  sendRequest: (toUserId: string) => void;
  acceptRequest: (requestId: string) => void;
  cancelRequest: (requestId: string) => void;
  getPendingIncomingRequestIdFrom: (fromUserId: string) => string | null;
  getConnectionStatusWith: (
    otherUserId: string,
  ) => "SELF" | "NONE" | "PENDING_SENT" | "PENDING_RECEIVED" | "CONNECTED";
  incomingRequests: ConnectionRequest[];
  acceptedConnectionsCount: number;
};

const REQUESTS_KEY = "medconnect-requests";
const ACTIVE_USER_KEY = "medconnect-active-user";

const createDemoRequests = (): ConnectionRequest[] => [
  {
    id: "seed-request-nisha-to-me",
    fromUserId: "u-nisha",
    toUserId: "u-me",
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
  },
  {
    id: "seed-request-michael-to-nisha",
    fromUserId: "u-michael",
    toUserId: "u-nisha",
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "seed-request-me-to-michael",
    fromUserId: "u-me",
    toUserId: "u-michael",
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
];

const ConnectionContext = createContext<ConnectionContextValue | null>(null);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserIdState] = useState("u-me");
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);

  useEffect(() => {
    const savedRequests = localStorage.getItem(REQUESTS_KEY);
    const savedActiveUser = localStorage.getItem(ACTIVE_USER_KEY);

    if (savedRequests) {
      try {
        const parsed = JSON.parse(savedRequests) as ConnectionRequest[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRequests(parsed);
        } else {
          setRequests(createDemoRequests());
        }
      } catch {
        setRequests(createDemoRequests());
      }
    } else {
      setRequests(createDemoRequests());
    }

    if (savedActiveUser && getUserById(savedActiveUser)) {
      setActiveUserIdState(savedActiveUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }, [requests]);

  const setActiveUserId = (userId: string) => {
    if (!getUserById(userId)) {
      return;
    }

    setActiveUserIdState(userId);
    localStorage.setItem(ACTIVE_USER_KEY, userId);
  };

  const loadDemoRequests = () => {
    setRequests(createDemoRequests());
  };

  const sendRequest = (toUserId: string) => {
    if (toUserId === activeUserId) {
      return;
    }

    const alreadyExists = requests.some(
      (item) =>
        (item.fromUserId === activeUserId && item.toUserId === toUserId) ||
        (item.fromUserId === toUserId && item.toUserId === activeUserId),
    );

    if (alreadyExists) {
      return;
    }

    setRequests((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        fromUserId: activeUserId,
        toUserId,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const acceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === requestId && item.toUserId === activeUserId
          ? { ...item, status: "ACCEPTED" }
          : item,
      ),
    );
  };

  const cancelRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === requestId &&
            item.status === "PENDING" &&
            (item.toUserId === activeUserId || item.fromUserId === activeUserId)
          ),
      ),
    );
  };

  const incomingRequests = useMemo(
    () =>
      requests.filter(
        (item) => item.toUserId === activeUserId && item.status === "PENDING",
      ),
    [activeUserId, requests],
  );

  const acceptedConnectionsCount = useMemo(
    () =>
      requests.filter(
        (item) =>
          item.status === "ACCEPTED" &&
          (item.fromUserId === activeUserId || item.toUserId === activeUserId),
      ).length,
    [activeUserId, requests],
  );

  const getConnectionStatusWith: ConnectionContextValue["getConnectionStatusWith"] =
    (otherUserId) => {
      if (otherUserId === activeUserId) {
        return "SELF";
      }

      const relation = requests.find(
        (item) =>
          (item.fromUserId === activeUserId && item.toUserId === otherUserId) ||
          (item.fromUserId === otherUserId && item.toUserId === activeUserId),
      );

      if (!relation) {
        return "NONE";
      }

      if (relation.status === "ACCEPTED") {
        return "CONNECTED";
      }

      if (relation.toUserId === activeUserId) {
        return "PENDING_RECEIVED";
      }

      return "PENDING_SENT";
    };

  const getPendingIncomingRequestIdFrom: ConnectionContextValue["getPendingIncomingRequestIdFrom"] =
    (fromUserId) => {
      const match = requests.find(
        (item) =>
          item.fromUserId === fromUserId &&
          item.toUserId === activeUserId &&
          item.status === "PENDING",
      );

      return match?.id ?? null;
    };

  return (
    <ConnectionContext.Provider
      value={{
        activeUserId,
        setActiveUserId,
        requests,
        loadDemoRequests,
        sendRequest,
        acceptRequest,
        cancelRequest,
        getPendingIncomingRequestIdFrom,
        getConnectionStatusWith,
        incomingRequests,
        acceptedConnectionsCount,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnections() {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error("useConnections must be used inside ConnectionProvider");
  }

  return context;
}

export { networkUsers };
