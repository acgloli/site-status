<template>
  <footer id="footer">
    <n-flex class="link" align="center">
      <n-button
        v-for="(item, key, index) in linkData"
        :key="index"
        :focusable="false"
        quaternary
        circle
        @click="jumpLink(item)"
      >
        <template #icon>
          <Icon :name="`icon:${key}`" />
        </template>
      </n-button>
    </n-flex>
    <n-flex :size="4" class="text" align="center" vertical>
      <n-p depth="3">
        <n-text depth="3" @click="jumpLink(linkData.github)">
          SiteStatus
        </n-text>
        Version {{ version }}
      </n-p>
      <n-p depth="3">
        {{ $t("footer.basedOn") }}
        <n-text depth="3" @click="jumpLink('https://uptimerobot.com/')">
          {{ $t("uptimeRobot") }}
        </n-text>
        {{ $t("footer.interface") }} |
        {{ $t("footer.checkFrequency") }}
        {{ $t("footer.fiveMinutes") }}
      </n-p>
      <n-p depth="3">
        Copyright &copy; 2020 - {{ new Date().getFullYear() }}
        <n-text depth="3" @click="jumpLink(ownerLink)">
          {{ ownerName }}
        </n-text>
      </n-p>
      <n-p v-if="icpFiling || moeIcpFiling" depth="3">
        <n-text v-if="icpFiling" depth="3" @click="jumpLink(icpLink)">
          {{ icpFiling }}
        </n-text>
        <template v-if="icpFiling && moeIcpFiling"> | </template>
        <n-text v-if="moeIcpFiling" depth="3" @click="jumpLink(moeIcpLink)">
          {{ moeIcpFiling }}
        </n-text>
      </n-p>
      <n-p v-if="mpsFiling" depth="3">
        <n-text depth="3" class="filing-item" @click="jumpLink(mpsFilingLink)">
          <img
            class="mps-icon"
            src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
            alt="公安备案图标"
          />
          {{ mpsFiling }}
        </n-text>
      </n-p>
    </n-flex>
  </footer>
</template>

<script setup lang="ts">
const { public: configPublic } = useRuntimeConfig();
const {
  siteGithubLink,
  siteHomeLink,
  siteEmailLink,
  siteIcp,
  siteMoeIcp,
  siteMoeIcpLink,
  siteMpsIcp,
  siteMpsIcpLink,
  siteOwnerName,
  siteOwnerLink,
  version,
} = configPublic;
const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";
const githubLink =
  normalizeText(siteGithubLink) || "https://github.com/imsyy/site-status";
const homeLink = normalizeText(siteHomeLink) || "https://www.imsyy.top/";
const emailLink = normalizeText(siteEmailLink) || "mailto:one@imsyy.top";
const ownerName = normalizeText(siteOwnerName) || "IMSYY";
const ownerLink = normalizeText(siteOwnerLink) || "https://www.imsyy.top/";
const icpFiling = normalizeText(siteIcp);
const rawMoeIcpFiling = normalizeText(siteMoeIcp);
const moeIcpFiling =
  rawMoeIcpFiling && rawMoeIcpFiling !== icpFiling ? rawMoeIcpFiling : "";
const mpsFiling = normalizeText(siteMpsIcp);
const icpLink = "https://beian.miit.gov.cn/";
const moeIcpLink = normalizeText(siteMoeIcpLink) || icpLink;
const mpsFilingLink = normalizeText(siteMpsIcpLink) || "https://beian.mps.gov.cn/";

const linkData = {
  github: githubLink,
  home: homeLink,
  email: emailLink,
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 90px;
  margin-top: auto;
  z-index: 100;
  .text {
    margin-top: 12px;
    .n-p,
    .n-text {
      margin: 0;
      font-size: 13px;
      line-height: 26px;
    }
    .n-text {
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: var(--normal-color);
      }
    }
    .filing-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .mps-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }
  }
}
</style>
