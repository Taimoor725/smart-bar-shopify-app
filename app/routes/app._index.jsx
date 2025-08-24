import {
  Page,
  Card,
  Layout,
  Text,
  Modal,
  BlockStack,
  Button,
  Box,
  Icon,
  InlineStack,
  TextField,
  Select,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  NotificationIcon,
  QuestionCircleIcon,
  BookOpenIcon,
  StatusActiveIcon,
  InfoIcon,
} from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { CreateNewBar, GetAllBars, UpdateData } from "./helpers/BarHandler";
import { json } from "@remix-run/node";
import CreateBar from "./components/ModalForm";
import { getDesignStyle } from "./components/preview/getDesign";
import { DeleteBar, ToggleActiveBar } from "./helpers/BarHandler";
import { MdClose } from "react-icons/md";

// Loader
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  const bars = await GetAllBars({ shop });
  return json({ bars });
}

// Action
export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  const { session } = await authenticate.admin(request);
  const { shop } = session;

  if (intent === "create") {
    const data = Object.fromEntries(formData);
    delete data.intent;
    await CreateNewBar({ shop, data });
    return json({ success: true, message: "Bar Created successfully" });
  }

  if (intent === "delete") {
    const id = Number(formData.get("id"));
    await DeleteBar(id);
    return json({ success: true, message: "Bar Deleted successfully" });
  }

  if (intent === "update") {
    const data = Object.fromEntries(formData);
    delete data.intent;
    await UpdateData(data);
    return json({ success: true, message: "Bar Updated successfully" });
  }

  if (intent === "toggleActive") {
    const id = Number(formData.get("id"));
    const active = formData.get("active") === "true";
    await ToggleActiveBar(id, active);
    return json({ success: true, message: "Bar status updated successfully" });
  }

  return json({ success: false });
}

export default function Dashboard() {
  const { bars } = useLoaderData();
  const fetcher = useFetcher();

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // "all" | "active" | "inactive"

  // for delete button
  const [deleteId, setDeleteId] = useState(null);

  // for edit button
  const [editModal, setEditModal] = useState(false);

  // for update button
  const [updatingData, setUpdatingData] = useState(null);

  // for toggle button
  const [toggalId, setTogalId] = useState(null);
  const [optimisticActive, setOptimisticActive] = useState({});

  const deleteIntent = (fetcher.formData?.get("intent") ?? fetcher.submission?.formData?.get("intent")) ?? null;

  const isDeleting = fetcher.state !== "idle" && deleteIntent === "delete";

  // Reset toggle UI when fetcher returns idle
  useEffect(() => {
    if (fetcher.state === "idle") {
      setTogalId(null);
      setOptimisticActive({});
    }
  }, [fetcher.state]);

  // Close delete modal after successful delete
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success && deleteId) {
      setDeleteId(null);
      fetcher.data = null
    }
  }, [fetcher.state, fetcher.data, deleteId]);

  const formHandler = () => setModal(true);

  const editModalHandler = (bar) => {
    setUpdatingData(bar);
    setEditModal(true);
  };

  const searchHandler = (value) => setSearch(value);

  const statusHandler = (value) => setStatus(value);

  // Derive filtered list
  const filteredBars = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bars.filter((bar) => {
      const title = (bar.title ?? "").toLowerCase();
      const matchesSearch = q === "" || title.includes(q);
      const matchesStatus =
        status === "all" ||
        (status === "active" && bar.active) ||
        (status === "inactive" && !bar.active);
      return matchesSearch && matchesStatus;
    });
  }, [bars, search, status]);

  const stats = [
    {
      label: "Total Bars",
      value: bars.length,
      icon: NotificationIcon,
      color: "rgba(0, 123, 255, 0.15)",
    },
    {
      label: "Active Bars",
      value: bars.filter((bar) => bar.active).length,
      icon: StatusActiveIcon,
      color: "rgba(0, 128, 0, 0.15)",
    },
    {
      label: "Inactive Bars",
      value: bars.filter((bar) => !bar.active).length,
      icon: InfoIcon,
      color: "rgba(255, 0, 0, 0.15)",
    },
  ];

  return (
    <Page>
      <TitleBar title="Dashboard" />

      {editModal && (
        <Modal
          open={editModal}
          onClose={() => setEditModal(false)}
          title="Create Notification Bar"
          large
        >
          <Modal.Section>
            <CreateBar setModal={setEditModal} mode="update" data={updatingData} />
          </Modal.Section>
        </Modal>
      )}

      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Create Notification Bar"
          large
        >
          <Modal.Section>
            <CreateBar setModal={setModal} mode="create" />
          </Modal.Section>
        </Modal>
      )}

      <Box paddingBlockStart="400">
        <Layout>
          <Layout.Section>
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="100">
                <Text variant="headingLg" as="h1">
                  Smart Notification Bar
                </Text>
                <Text variant="bodyMd" tone="subdued" as="p">
                  Boost your sales and conversions with beautiful notification bars.
                </Text>
              </BlockStack>
              <InlineStack gap="200" justifyContent="end">
                <Button icon={BookOpenIcon}>Install Guide</Button>
                <Button icon={QuestionCircleIcon}>FAQ</Button>
                <Button
                  tone="success"
                  icon={NotificationIcon}
                  variant="primary"
                  onClick={formHandler}
                >
                  Create Notification Bar
                </Button>
              </InlineStack>
            </InlineStack>
          </Layout.Section>
        </Layout>
      </Box>

      {/* --- ssssssssssssssss --- */}
      <Box paddingBlockStart="400">
        <Layout>
          <Layout.Section>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "var(--p-space-400)",
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid var(--p-color-border)",
                    borderRadius: "var(--p-border-radius-200)",
                    background: "var(--p-color-bg-surface, #fff)",
                    padding: "var(--p-space-400)",
                    minHeight: "110px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <Text variant="bodyMd" tone="subdued">
                        {stat.label}
                      </Text>
                      <Text variant="headingXl">{stat.value}</Text>
                    </div>
                    <div
                      style={{
                        background: stat.color,
                        borderRadius: "9999px",
                        width: 52,
                        height: 52,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon source={stat.icon} tone="base" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Layout.Section>
        </Layout>
      </Box>

      {/* --- search and filter --- */}
      <Box paddingBlockStart="400">
        <Layout>
          <Layout.Section>
            <InlineStack align="space-between" blockAlign="end">
              <Box>
                <BlockStack gap="100">
                  <Text variant="headingSm" as="h3">
                    Search
                  </Text>
                  <TextField
                    value={search}
                    onChange={searchHandler}
                    placeholder="Search notification bars..."
                    labelHidden
                    label="Search notification bars"
                    autoComplete="off"
                  />
                </BlockStack>
              </Box>
              <Box>
                <BlockStack gap="100">
                  <InlineStack align="center" blockAlign="center" gap="100">
                    <Text variant="headingSm" as="h3">
                      Status Filter
                    </Text>
                    <Text variant="bodySm" tone="subdued">
                      {bars.length} of {bars.length} bars
                    </Text>
                  </InlineStack>
                  <Select
                    label="Status"
                    labelHidden
                    options={[
                      { label: "All", value: "all" },
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "inactive" },
                    ]}
                    value={status}
                    onChange={statusHandler}
                  />
                </BlockStack>
              </Box>
            </InlineStack>
          </Layout.Section>
        </Layout>
      </Box>

      {/* --- preview --- */}
      <Box paddingBlockStart="400">
        <Layout>
          <Layout.Section>
            <Card>
              <Text variant="headingMd" as="h2">
                Preview
              </Text>

              <div
                style={{
                  marginTop: "16px",
                  padding: "20px",
                  border: "1px dashed #ccc",
                  borderRadius: "8px",
                  minHeight: "360px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {filteredBars.length === 0 ? (
                  <Text tone="subdued">Your created bars will appear here.</Text>
                ) : (
                  filteredBars.map((bar) => (
                    <div
                      key={bar.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        border: "1px solid var(--p-color-border)",
                        borderRadius: "6px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "4px",
                            background: bar.bgColor,
                            border: "1px solid #ddd",
                          }}
                        ></div>

                        <div
                          style={{
                            minWidth: 0,
                            padding: "10px",
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "start",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            as="span"
                            variant="bodyMd"
                            style={{
                              wordBreak: "break-word",
                              overflowWrap: "anywhere",
                              whiteSpace: "normal",
                            }}
                          >
                            {bar.title.length > 30 ? bar.title.slice(0, 30) + "..." : bar.title}
                          </Text>
                          <Text as="span" tone="subdued" variant="bodySm">
                            Status : {bar.page}
                          </Text>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Button
                            size="slim"
                            pressed={bar.id === toggalId ? optimisticActive[bar.id] : bar.active}
                            loading={bar.id === toggalId && fetcher.state === "submitting"}
                            onClick={() => {
                              const next = !bar.active;
                              setTogalId(bar.id);
                              setOptimisticActive((prev) => ({ ...prev, [bar.id]: next }));
                              fetcher.submit(
                                { intent: "toggleActive", id: bar.id, active: String(next) },
                                { method: "post" }
                              );
                            }}
                          >
                            {bar.id === toggalId
                              ? optimisticActive[bar.id]
                                ? "Active"
                                : "Inactive"
                              : bar.active
                                ? "Active"
                                : "Inactive"}
                          </Button>

                          <Button size="slim" onClick={() => editModalHandler(bar)}>
                            Edit
                          </Button>

                          <Button size="slim" tone="critical" onClick={() => setDeleteId(bar.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            ...getDesignStyle(bar.bgDesign, bar.bgColor),
                            color: bar.textColor,
                            fontWeight: bar.fontWeight,
                            fontSize: bar.fontSize,
                            flex: 1,
                            padding: "12px",
                            borderRadius: "6px",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                            whiteSpace: "normal",
                          }}
                        >
                          <span
                            style={{
                              display: "block",
                              paddingRight: bar.dismissible ? "28px" : "0",
                              wordBreak: "break-word",
                            }}
                          >
                            {bar.title}
                          </span>

                          {bar.dismissible && (
                            <MdClose
                              size={20}
                              color={bar.textColor}
                              style={{
                                cursor: "pointer",
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {deleteId && (
                <Modal
                  open={!!deleteId}
                  key={deleteId}
                  onClose={() => setDeleteId(null)}
                  title="Delete Bar"
                  primaryAction={{
                    content: "Confirm",
                    loading: isDeleting,
                    destructive: true,
                    onAction: () => {
                      fetcher.submit({ intent: "delete", id: deleteId }, { method: "post" });
                    },
                  }}
                  secondaryActions={[{ content: "Cancel", onAction: () => setDeleteId(null) }]}
                >
                  <Modal.Section>
                    <div
                      style={{
                        maxWidth: "100%",        // 👈 restrict width to modal
                        overflow: "hidden",      // hide anything outside
                        wordBreak: "break-word", // break long words
                        overflowWrap: "break-word",
                        whiteSpace: "normal",    // allow line breaks
                      }}
                    >
                      <Text>
                        Are you sure you want to delete{" "}
                        <strong>
                          {bars.find((bar) => bar.id === deleteId)?.title}
                        </strong>
                        ?
                      </Text>
                    </div>
                  </Modal.Section>


                </Modal>
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Box>
    </Page>
  );
}
