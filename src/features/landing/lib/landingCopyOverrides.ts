import type { GetLandingWorkspaceData } from "@/shared/lib/generated-fdc";
import landingCopyOverridesJson from "./landingCopyOverrides.json";

type LandingHeroContent = GetLandingWorkspaceData["landingHeroContents"][number];
type LandingFeature = GetLandingWorkspaceData["landingFeatures"][number];
type LandingArticle = GetLandingWorkspaceData["landingArticles"][number];
type SupportContactInfo = GetLandingWorkspaceData["supportContactInfos"][number];

type LandingCopyOverrides = {
  landingHeroContents: Record<string, Partial<LandingHeroContent>>;
  landingFeatures: Record<string, Partial<LandingFeature>>;
  landingArticles: Record<string, Partial<LandingArticle>>;
  supportContactInfos: Record<string, Partial<SupportContactInfo>>;
};

const landingCopyOverrides = landingCopyOverridesJson as LandingCopyOverrides;

function applyItemOverrides<T extends { id: string }>(items: readonly T[], overrides: Record<string, Partial<T>>): T[] {
  return items.map((item) => {
    const itemOverride = overrides[item.id];

    if (!itemOverride) {
      return item;
    }

    return {
      ...item,
      ...itemOverride,
    };
  });
}

export function applyLandingCopyOverrides(data: GetLandingWorkspaceData): GetLandingWorkspaceData {
  return {
    ...data,
    landingHeroContents: applyItemOverrides(data.landingHeroContents, landingCopyOverrides.landingHeroContents),
    landingFeatures: applyItemOverrides(data.landingFeatures, landingCopyOverrides.landingFeatures),
    landingArticles: applyItemOverrides(data.landingArticles, landingCopyOverrides.landingArticles),
    supportContactInfos: applyItemOverrides(data.supportContactInfos, landingCopyOverrides.supportContactInfos),
  };
}
