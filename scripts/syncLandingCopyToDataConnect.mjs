import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
  connectorConfig,
  getLandingWorkspace,
  upsertLandingHeroContent,
  upsertLandingFeature,
  upsertLandingArticle,
  upsertSupportContactInfo,
} from "../src/shared/lib/generated-fdc/esm/index.esm.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function loadEnvFile(envPath) {
  const content = readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function loadLandingCopyOverrides() {
  const overridesPath = path.join(projectRoot, "src", "features", "landing", "lib", "landingCopyOverrides.json");
  return JSON.parse(readFileSync(overridesPath, "utf8"));
}

function applyItemOverrides(items, overrides) {
  return items.map((item) => ({
    ...item,
    ...(overrides[item.id] ?? {}),
  }));
}

function applyLandingCopyOverrides(data, overrides) {
  return {
    ...data,
    landingHeroContents: applyItemOverrides(data.landingHeroContents, overrides.landingHeroContents),
    landingFeatures: applyItemOverrides(data.landingFeatures, overrides.landingFeatures),
    landingArticles: applyItemOverrides(data.landingArticles, overrides.landingArticles),
    supportContactInfos: applyItemOverrides(data.supportContactInfos, overrides.supportContactInfos),
  };
}

async function main() {
  loadEnvFile(path.join(projectRoot, ".env.local"));

  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });

  const dataConnect = getDataConnect(app, connectorConfig);
  const overrides = loadLandingCopyOverrides();
  const current = await getLandingWorkspace(dataConnect);
  const nextData = applyLandingCopyOverrides(current.data, overrides);

  await Promise.all(
    nextData.landingHeroContents.map((item) =>
      upsertLandingHeroContent(dataConnect, {
        id: item.id,
        badgeText: item.badgeText,
        titlePrefix: item.titlePrefix,
        titleAccent: item.titleAccent,
        titleSuffix: item.titleSuffix,
        body: item.body,
        primaryButtonLabel: item.primaryButtonLabel,
        primaryButtonTarget: item.primaryButtonTarget,
        secondaryButtonLabel: item.secondaryButtonLabel,
        secondaryButtonTarget: item.secondaryButtonTarget,
        patientCodeLabel: item.patientCodeLabel,
        accuracyLabel: item.accuracyLabel,
        imagePath: item.imagePath,
      })
    )
  );

  await Promise.all(
    nextData.landingFeatures.map((item) =>
      upsertLandingFeature(dataConnect, {
        id: item.id,
        section: item.section,
        iconKey: item.iconKey,
        title: item.title,
        description: item.description,
        displayOrder: item.displayOrder,
      })
    )
  );

  await Promise.all(
    nextData.landingArticles.map((item) =>
      upsertLandingArticle(dataConnect, {
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        link: item.link ?? null,
        imagePath: item.imagePath,
        iconKey: item.iconKey,
        displayOrder: item.displayOrder,
      })
    )
  );

  await Promise.all(
    nextData.supportContactInfos.map((item) =>
      upsertSupportContactInfo(dataConnect, {
        id: item.id,
        centerBadge: item.centerBadge,
        headlinePrefix: item.headlinePrefix,
        headlineAccent: item.headlineAccent,
        headlineBrand: item.headlineBrand,
        description: item.description,
        email: item.email,
        phone: item.phone,
        location: item.location,
      })
    )
  );

  console.log("Synced landing copy to Data Connect.");
  console.log(JSON.stringify(nextData, null, 2));
}

main().catch((error) => {
  console.error("Failed to sync landing copy to Data Connect:", error);
  process.exitCode = 1;
});
