import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
import {Page,Card,Button,BlockStack,Text,InlineStack,Box,Link, InlineGrid,} from "@shopify/polaris";
import {ArrowLeftIcon,ExternalIcon,CodeIcon,ChartHistogramLastIcon,ShieldNoneIcon,} from "@shopify/polaris-icons";

// ✅ Import image from public
import pic1 from "/pic1.png";

export default function InstallGuide({ setGuidePage }) {

  const handleBackClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setGuidePage(false);
  };

  return (
    <Page fullWidth title="Install Guide">
      <BlockStack gap="300">


        <InlineStack align="start">
            <Button
              size="large"
              onClick={handleBackClick}
              tone="success"
              icon={ArrowLeftIcon}
              variant="primary"
            >
              Back to Dashboard
            </Button>
        </InlineStack>

        {/* Features */}
        <Box>
          <InlineGrid gap="400" wrap={true} columns={3}>
            <Card>
              <BlockStack gap="200" align="center">
                <Box>
                  <ChartHistogramLastIcon width={32} height={32} />
                </Box>
                <Text as="h3" variant="headingMd">
                  Lightning Fast
                </Text>
                <Text as="p" tone="subdued">
                  Lightweight script loads asynchronously without affecting page
                  speed.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200" align="center">
                <Box>
                  <ShieldNoneIcon width={32} height={32} />
                </Box>
                <Text as="h3" variant="headingMd">
                  Secure & Reliable
                </Text>
                <Text as="p" tone="subdued">
                  No impact on your store&apos;s security or performance.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200" align="center">
                <Box>
                  <CodeIcon width={32} height={32} />
                </Box>
                <Text as="h3" variant="headingMd">
                  Theme Integration
                </Text>
                <Text as="p" tone="subdued">
                  Uses Shopify app embeds for seamless theme integration.
                </Text>
              </BlockStack>
            </Card>
          </InlineGrid>
        </Box>

        {/* Installation Steps */}
        <Card>
          <BlockStack gap="500">
            <InlineStack gap="200" align="start">
              <Box
                background="success"
                // borderRadius="200"
                // padding="200"
                // minWidth="40px"
                // minHeight="40px"
              >
                <CodeIcon width={24} height={24} color="white" />
              </Box>
              <Text as="h2" variant="headingLg">
                Installation Instructions
              </Text>
            </InlineStack>

            {/* Step 1 */}
            <BlockStack gap="200">
              <InlineStack gap="200" align="start">
                <Box
                  background="success"
                  borderRadius="200"
                  minWidth="32px"
                  minHeight="32px"
                  align="center"
                >
                  <Text as="span" color="white" alignment="center">
                    1
                  </Text>
                </Box>
                <Text as="h3" variant="headingMd">
                  Access Theme Customizer
                </Text>
              </InlineStack>

              <Box paddingInline="400">
                <BlockStack gap="200">
                <Text as="p" tone="subdued">
                  In your Shopify admin, navigate to:
                </Text>
                <Card>
                  <Text as="p" tone="success">
                    Online Store → Themes → Customize
                  </Text>
                </Card>
                <Box>
                <Button
                  variant="primary"
                  icon={ExternalIcon}
                  onClick={() =>
                    window.open(
                      "https://admin.shopify.com/admin/themes/current/editor",
                      "_blank"
                    )
                  }
                >
                  Open Theme Customizer
                </Button>
                </Box>
                </BlockStack>
              </Box>
            </BlockStack>

            {/* Step 2 */}
            <BlockStack gap="200">
              <InlineStack gap="200" align="start">
                <Box
                  background="success"
                  borderRadius="200"
                  minWidth="32px"
                  minHeight="32px"
                  align="center"
                >
                  <Text as="span" color="white">
                    2
                  </Text>
                </Box>
                <Text as="h3" variant="headingMd">
                  Enable App Embed
                </Text>
              </InlineStack>

              <Box paddingInline="400">
                <BlockStack gap="200">
                <Text as="p" tone="subdued">
                  Enable the notification bar app embed in your theme:
                </Text>
                <Card>
                  <Text as="p" tone="success">
                    Click &quot;App Embeds&quot; → &quot;Smart Notification
                    Bar&quot; → Enable the toggle
                  </Text>
                </Card>
                <Box padding="400">
                  <img
                    src={pic1}
                    alt="App Embeds section"
                    style={{
                      width: "100%",
                    //   maxWidth: "600px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </Box>
                </BlockStack>
              </Box>
            </BlockStack>

            {/* Step 3 */}
            <BlockStack gap="200">
              <InlineStack gap="200" align="start">
                <Box
                  background="success"
                  borderRadius="200"
                  minWidth="32px"
                  minHeight="32px"
                  align="center"
                >
                  <Text as="span" color="white">
                    3
                  </Text>
                </Box>
                <Text as="h3" variant="headingMd">
                  Configure & Activate
                </Text>
              </InlineStack>

              <Box paddingInline="400">
                <BlockStack gap="200">
                <Text as="p" tone="subdued">
                  Return to this dashboard to create and manage your
                  notification bars.
                </Text>
                <Link href={`/${window.location.search}`}>
                  <Button
                    tone="success"
                    variant="primary"
                    icon={ArrowLeftIcon}
                    onClick={handleBackClick}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
                </BlockStack>
              </Box>
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Help Section */}
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
