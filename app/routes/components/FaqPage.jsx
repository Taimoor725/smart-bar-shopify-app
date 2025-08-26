import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Page, Card, Button, Text, Divider, BlockStack } from "@shopify/polaris";

export default function FaqPage({ setFaqPage }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const handleBackClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setFaqPage(false);
    };

    const faqs = [
        { id: 1, question: "How do I install the app?", answer: "Click 'Install' from the Shopify App Store and follow the setup instructions." },
        { id: 2, question: "Can I customize the notification bars?", answer: "Yes, you can change colors, fonts, text, links, and display options from the dashboard." },
        { id: 3, question: "Does the app slow down my store?", answer: "No, our app loads asynchronously and has no negative effect on store performance." },
        { id: 4, question: "Can I target bars to specific pages?", answer: "Yes, you can show bars across the whole store or target specific pages individually." },
        { id: 5, question: "Is support available if I need help?", answer: "Yes, our support team is available 24/7 via email and live chat from the app." },
        { id: 6, question: "Can I use the app on multiple stores?", answer: "Each store requires its own installation, but you can manage them all from your account." },
    ];

    return (
        <Page title="FAQ">
            <BlockStack gap={"300"}>
            <Card>
                <div style={{ padding: "20px" }}>
                    <Text as="h2" variant="headingLg" fontWeight="bold">
                        Frequently Asked Questions
                    </Text>

                    <BlockStack gap="400">
                        {faqs.map((faq, index) => (
                            <div key={faq.id}>
                                {/* Question row */}
                                <div
                                    onClick={() => toggle(faq.id)}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "15px 10px",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                    }}
                                >
                                    <span>{faq.question}</span>
                                    {openId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                {/* Answer */}
                                {openId === faq.id && (
                                    <div style={{ padding: "0 10px 15px 10px", fontSize: "12px", color: "#333" }}>
                                        {faq.answer}
                                    </div>
                                )}

                                {/* Divider except after last item */}
                                {index !== faqs.length - 1 && <Divider />}
                            </div>
                        ))}
                    </BlockStack>
                    <Button variant="primary" tone="success" onClick={handleBackClick}>
                        Back to Dashboard
                    </Button>
                </div>
            </Card>
            <Card>
                <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                        Need Help?
                    </Text>
                    <Text as="p" tone="subdued">
                        If your notification bar isn’t appearing, ensure you have at least
                        one active bar and the embed is enabled.
                    </Text>
                    <Text as="p" tone="subdued">
                        Support:
                    </Text>
                    <ul>
                        <li className="flex gap-">
                            Email:{" "}
                            kommercely@gmail.com
                        </li>
                        <li>
                            Website:{" "}
                            <a
                                href="https://kommercely.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                            >
                                kommercely.com
                            </a>
                        </li>
                    </ul>
                </BlockStack>
            </Card>
            </BlockStack>
        </Page>
    );
}
