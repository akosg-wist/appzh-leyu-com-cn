// assets/content-map.js

const contentMap = (() => {
  const SITE_URL = "https://appzh-leyu.com.cn";
  const KEYWORD = "乐鱼体育";

  const partitions = [
    {
      id: "1",
      name: "赛事中心",
      tags: ["足球", "篮球", "网球", "电竞"],
      items: [
        { title: "今日赛程", url: `${SITE_URL}/matches/today`, kw: KEYWORD },
        { title: "热门联赛", url: `${SITE_URL}/matches/leagues`, kw: KEYWORD },
      ],
    },
    {
      id: "2",
      name: "体育资讯",
      tags: ["新闻", "转会", "伤病", "深度"],
      items: [
        { title: "最新报道", url: `${SITE_URL}/news/latest`, kw: KEYWORD },
        { title: "专题文章", url: `${SITE_URL}/news/features`, kw: KEYWORD },
      ],
    },
    {
      id: "3",
      name: "数据统计",
      tags: ["积分榜", "射手榜", "助攻榜", "赔率"],
      items: [
        { title: "球队排名", url: `${SITE_URL}/stats/standings`, kw: KEYWORD },
        { title: "球员数据", url: `${SITE_URL}/stats/players`, kw: KEYWORD },
      ],
    },
    {
      id: "4",
      name: "互动社区",
      tags: ["论坛", "讨论", "预测", "竞猜"],
      items: [
        { title: "热门话题", url: `${SITE_URL}/community/hot`, kw: KEYWORD },
        { title: "有奖竞猜", url: `${SITE_URL}/community/quiz`, kw: KEYWORD },
      ],
    },
  ];

  function searchPartitions(query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];

    const results = [];
    for (const partition of partitions) {
      const matchTag = partition.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchItem = partition.items.some(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.kw.toLowerCase().includes(q)
      );
      if (matchTag || matchItem) {
        results.push(partition);
      }
    }
    return results;
  }

  function getPartitionById(id) {
    return partitions.find((p) => p.id === id) || null;
  }

  function getAllTags() {
    const tagSet = new Set();
    for (const partition of partitions) {
      for (const tag of partition.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet);
  }

  function getItemsByTag(tag) {
    if (!tag || typeof tag !== "string") return [];
    const t = tag.trim().toLowerCase();
    const items = [];
    for (const partition of partitions) {
      if (partition.tags.some((pt) => pt.toLowerCase() === t)) {
        items.push(...partition.items);
      }
    }
    return items;
  }

  function getKeywordUsageCount() {
    let count = 0;
    for (const partition of partitions) {
      for (const item of partition.items) {
        if (item.kw === KEYWORD) count++;
      }
    }
    return count;
  }

  return {
    partitions,
    searchPartitions,
    getPartitionById,
    getAllTags,
    getItemsByTag,
    getKeywordUsageCount,
    SITE_URL,
    KEYWORD,
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = contentMap;
}