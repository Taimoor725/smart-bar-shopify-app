import { useState, useEffect } from "react";
import { Form, useNavigation } from "@remix-run/react";
import "./modal.css";
import { MdClose } from "react-icons/md";
import { getDesignStyle } from "./preview/getDesign";
import { Button } from "@shopify/polaris";

export default function CreateBar({ setModal, mode , data}) {
    const [title, setTitle] = useState(data ? data.title : "");
    const [bgColor, setBgColor] = useState(data? data.bgColor : "#000000");
    const [textColor, setTextColor] = useState(data ? data.textColor : "#ffffff");
    const [bgDesign, setBgDesign] = useState(data? data.bgDesign : "solid");
    const [fontStyle, setFontStyle] = useState(data ? data.fontStyle : "Arial");
    const [fontWeight, setFontWeight] = useState(data? data.fontWeight : "400");
    const [fontSize, setFontSize] = useState(data ? data.fontSize : "16");
    const [sticky, setSticky] = useState(data ? data.sticky : false);
    const [active, setActive] = useState(data ? data.active : true);
    const [dismissible, setDismissible] = useState(data? data.dismissible : false);
    const [page, setPage] = useState(data ? data.page : "All Pages");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [wasSubmitted, setWasSubmitted] = useState(false);


    useEffect(() => {
        if (navigation.state === "idle" && wasSubmitted) {
            setModal(false);
            setWasSubmitted(false);
        }
    }, [navigation.state, wasSubmitted, setModal]);

    useEffect(() => {
        if (isSubmitting) {
            setWasSubmitted(true);
        }
    }, [isSubmitting]);

    const predefinedColors = [
        "#FF0000",
        "#0000FF",
        "#000000",
        "#FFFFFF",
        "#008000",
        "#FFA500",
    ];

    const designList = [
        { id: "solid", label: "Solid" },
        { id: "gradient", label: "Gradient" },
        { id: "linear", label: "Linear" },
        { id: "cross", label: "Cross" },
        { id: "diamond", label: "Diamond" },
        { id: "stripes", label: "Stripes" },
        { id: "dots", label: "Dots" },
    ];

    const handleCancel = () => {
        setModal(false);
    };

    const handleTitleChange = (value) => {
        if (value.length <= 200) {
            setTitle(value);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#fff",
                // padding: "5px",
                boxSizing: "border-box",
            }}
        >
            <Form method="post">
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div
                        style={{
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "20px",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {/* Title */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Enter the title..."
                                    maxLength={200}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                                <div style={{ textAlign: "right", fontSize: "12px", marginTop: "4px" }}>
                                    <span style={{ color: title.length >= 200 ? "red" : "#666" }}>
                                        {title.length} / 200
                                    </span>
                                </div>
                            </div>

                            {/* Hidden inputs */}
                            <input type="hidden" name="title" value={title} />
                            <input type="hidden" name="bgColor" value={bgColor} />
                            <input type="hidden" name="textColor" value={textColor} />
                            <input type="hidden" name="bgDesign" value={bgDesign} />
                            <input type="hidden" name="fontStyle" value={fontStyle} />
                            <input type="hidden" name="fontWeight" value={fontWeight} />
                            <input type="hidden" name="page" value={page} />
                            <input type="hidden" name="fontSize" value={fontSize} />
                            <input type="hidden" name="sticky" value={sticky ? true : false} />
                            <input type="hidden" name="active" value={active ? true : false} />
                            <input type="hidden" name="dismissible" value={dismissible ? true : false}/>
                            <input type="hidden" name="intent" value={mode} />
                            {data && <input type="hidden" name="id" value={data?.id} />}

                            {/* Background Color */}
                            <div>
                                <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
                                    Background Color
                                </h3>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {predefinedColors.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => setBgColor(color)}
                                            style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: 6,
                                                backgroundColor: color,
                                                border:
                                                    bgColor === color ? "2px solid #000" : "1px solid #ccc",
                                                cursor: "pointer",
                                            }}
                                            title={color}
                                        />
                                    ))}
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        style={{
                                            width: 44,
                                            height: 28,
                                            border: "1px solid #ccc",
                                            borderRadius: 6,
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Text Color */}
                            <div>
                                <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Text Color</h3>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {predefinedColors.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => setTextColor(color)}
                                            style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: 6,
                                                backgroundColor: color,
                                                border:
                                                    textColor === color ? "2px solid #000" : "1px solid #ccc",
                                                cursor: "pointer",
                                            }}
                                            title={color}
                                        />
                                    ))}
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={{
                                            width: 44,
                                            height: 28,
                                            border: "1px solid #ccc",
                                            borderRadius: 6,
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Background Design */}
                            <div>
                                <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
                                    Background Design
                                </h3>
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    {designList.map((d) => (
                                        <div
                                            key={d.id}
                                            onClick={() => setBgDesign(d.id)}
                                            style={{
                                                ...getDesignStyle(d.id, bgColor),
                                                width: 56,
                                                height: 56,
                                                borderRadius: 8,
                                                border:
                                                    bgDesign === d.id ? "2px solid #000" : "1px solid #ccc",
                                                cursor: "pointer",
                                                boxShadow:
                                                    bgDesign === d.id
                                                        ? "0 0 0 2px rgba(0,0,0,0.05)"
                                                        : "none",
                                            }}
                                            title={d.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Font Settings */}
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px" }}>
                                        Font Style
                                    </label>
                                    <select
                                        value={fontStyle}
                                        onChange={(e) => setFontStyle(e.target.value)}
                                        style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px" }}>
                                        Font Weight
                                    </label>
                                    <select
                                        value={fontWeight}
                                        onChange={(e) => setFontWeight(e.target.value)}
                                        style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option value="400">Normal</option>
                                        <option value="700">Bold</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px" }}>
                                        Font Size (px)
                                    </label>
                                    <input
                                        type="number"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        style={{
                                            padding: "6px",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                            width: "100px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px" }}>
                                        Select Page
                                    </label>
                                    <select
                                        value={page}
                                        onChange={(e) => setPage(e.target.value)}
                                        style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option>All Pages</option>
                                        <option>Home Page Only</option>
                                        <option>Product Page Only</option>
                                        <option>Collection Page Only</option>
                                        <option>Cart Page Only</option>
                                    </select>
                                </div>
                            </div>

                            {/* Toggles */}
                            <LayoutToggles
                                sticky={sticky}
                                onStickyChange={setSticky}
                                active={active}
                                onActiveChange={setActive}
                                dismissible={dismissible}
                                onDismissibleChange={setDismissible}
                            />

                            {/* Preview */}
                            <div>
                                <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Preview</h3>
                                <div
                                    style={{
                                        ...getDesignStyle(bgDesign, bgColor),
                                        color: textColor,
                                        fontFamily: fontStyle,
                                        fontWeight: fontWeight,
                                        fontSize: `${fontSize}px`,
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: "1px solid #e1e3e5",
                                        position: "relative",
                                        textAlign: "center",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    <span style={{ display: "block", paddingRight: dismissible ? "28px" : "0" }}>
                                        {title || "Your Notification Bar Preview"}
                                    </span>
                                    {dismissible && (
                                        <MdClose
                                            size={20}
                                            color={textColor}
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

                            {/* Actions */}
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                                <Button
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    destructive
                                >
                                    Cancel
                                </Button>
                                <Button
                                    tone="success"
                                    variant="primary"
                                    submit
                                    loading={wasSubmitted}
                                >
                                    {mode === "create" ? "Create" : "Update"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

/* ---------- Helper Components ---------- */
function LayoutToggles({
    sticky,
    onStickyChange,
    active,
    onActiveChange,
    dismissible,
    onDismissibleChange,
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ToggleCard
                title="Sticky Bar"
                description="Keep the notification bar visible when scrolling."
                checked={sticky}
                onChange={() => onStickyChange(!sticky)}
            />
            <ToggleCard
                title="Active"
                description="Show or hide the notification bar."
                checked={active}
                onChange={() => onActiveChange(!active)}
            />
            <ToggleCard
                title="Dismissible"
                description="Allow shoppers to close the notification bar."
                checked={dismissible}
                onChange={() => onDismissibleChange(!dismissible)}
            />
        </div>
    );
}

function ToggleCard({ title, description, checked, onChange }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                background: "#fff",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>
                    <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>{description}</p>
                </div>
                <Switch checked={checked} onChange={onChange} />
            </div>
        </div>
    );
}

function Switch({ checked, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-pressed={checked}
            style={{
                width: 46,
                height: 26,
                borderRadius: 26,
                border: "1px solid #c9cccf",
                backgroundColor: checked ? "#008060" : "#e6e6e6",
                position: "relative",
                cursor: "pointer",
                outline: "none",
                padding: 0,
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: 2,
                    left: checked ? 22 : 2,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    transition: "left 150ms ease",
                }}
            />
        </button>
    );
}
