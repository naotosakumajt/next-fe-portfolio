import { client } from "libs/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getWorksData(
  page = 1,
  categorySlug = "",
  tagSlug = "",
  limit = 5
) {
  const offset = (page - 1) * limit;

  let queries = { offset, limit };
  if (categorySlug) {
    queries.filters = `category[equals]${categorySlug}`;
  }

  if (tagSlug) {
    queries.filters = `tag[contains]${tagSlug}`;
  }

  const worksData = await client.get({
    endpoint: "works",
    queries,
  });

  const categoriesData = await client.get({ endpoint: "categories" });
  const tagsData = await client.get({ endpoint: "tags" });

  const categories = {};
  categoriesData.contents.forEach((category) => {
    categories[category.id] = category;
  });

  const tags = {};
  tagsData.contents.forEach((tag) => {
    tags[tag.id] = tag;
  });

  const works = worksData.contents.map((work) => {
    const category = work.category && categories[work.category[0]?.id];
    const workTags = Array.isArray(work.tag)
      ? work.tag.map((tagId) => tags[tagId]?.tag || null)
      : [];
    return { ...work, categories: category || null, tags: workTags };
  });

  return {
    works,
    category: categoriesData.contents,
    tag: tagsData.contents,
    totalCount: worksData.totalCount,
  };
}

export async function getUniqueDates(date) {
  const works = await (async () => {
    const allWorksData = [];
    let page = 1;

    while (true) {
      const { works } = await getWorksData(page);
      if (works.length === 0) {
        break;
      }
      allWorksData.push(...works);
      page++;
    }

    return allWorksData;
  })();

  let uniqueDates = {};

  if (works && works.length > 0) {
    const filteredWorks = works.filter((work) => {
      const yearMonth = dayjs
        .utc(work.publishedAt)
        .tz("Asia/Tokyo")
        .format("YYYY年M月");
      return yearMonth === date;
    });

    const allDates = [
      ...new Set(filteredWorks.map((work) => work.publishedAt)),
    ];
    const groupedDates = allDates.reduce((groups, date) => {
      const yearMonth = dayjs.utc(date).tz("Asia/Tokyo").format("YYYY年M月");
      if (!groups[yearMonth]) {
        groups[yearMonth] = [];
      }
      groups[yearMonth].push(date);
      return groups;
    }, {});
    uniqueDates = groupedDates;
  }

  return uniqueDates;
}
